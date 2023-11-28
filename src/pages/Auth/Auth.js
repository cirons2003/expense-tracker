import {auth, googleProvider} from '../../config/firebase-config'
import {signInWithPopup} from 'firebase/auth'
import {useNavigate, Navigate} from 'react-router-dom'
import {useGetUserInfo} from '../../hooks/useGetUserInfo'

export default function Auth() {

    const navigate = useNavigate()
    const {isAuth} = useGetUserInfo()
    

    const signInWithGoogle = async() => {
        try{
            const results = await signInWithPopup(auth, googleProvider)
            console.log(results)
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                profilePhoto: results.user.photoURL,
                isAuth: true,
            }
        
            localStorage.setItem("auth", JSON.stringify(authInfo))
            navigate('/expense-tracker')
        }catch(err) {
            console.log(err)
        }
    }

    if (isAuth) {
        return <div><Navigate to = "/expense-tracker" /></div>
    }
    
    return(
        <div className = 'login-page'>
            <p>Sign In With Google to Continue</p>
            <button className= 'login-with-google-btn' onClick = {signInWithGoogle}>Sign In With Google</button>
        </div>
    )

}