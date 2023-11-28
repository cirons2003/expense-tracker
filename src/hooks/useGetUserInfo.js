export const useGetUserInfo = () => {
    

    const authInfo = JSON.parse(
        localStorage.getItem("auth")
    ) || {isAuth: false}
    const {name, profilePhoto, userID, isAuth} = authInfo
    return {name, profilePhoto, userID, isAuth}
}