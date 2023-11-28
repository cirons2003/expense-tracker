import {db} from '../config/firebase-config'
import {deleteDoc, collection,doc} from 'firebase/firestore'

export const useDeleteTransactions = (transactionID) => {
    const transactionCollectionRef = collection(db, 'transactions')

    const deleteTransaction = async (transactionID) => {
        const transactionDocRef = doc(transactionCollectionRef, transactionID)

        try {
            await deleteDoc(transactionDocRef)
        }catch(err) {
            console.log(err) 
        }
    }

    return {deleteTransaction}

}