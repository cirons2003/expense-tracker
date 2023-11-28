import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useAddTransaction} from "../../hooks/useAddTransactions"
import { useGetTransactions } from "../../hooks/useGetTransactions";
import {useState} from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { useDeleteTransactions } from "../../hooks/useDeleteTransactions";


    export default function ExpenseTracker() {

        const {addTransaction} = useAddTransaction()
        const {transactions, transactionTotals} = useGetTransactions()
        const {balance, income, expenses} = transactionTotals
        const {deleteTransaction} = useDeleteTransactions()


        const [description, setDescription] = useState("")
        const [transactionAmount, setTransactionAmount] = useState(0)
        const [transactionType, setTransactionType] = useState("expense")

        const {name, profilePhoto} = useGetUserInfo()
        const navigate = useNavigate()


        const onSubmit = (e) => {
            e.preventDefault()
            addTransaction({
                description,
                transactionAmount,
                transactionType,
            })
        }
        

        const signUserOut = async() => {
            try {
                await signOut(auth)
                localStorage.clear()
                navigate("/")
            }catch(err) {
                console.error(err)
            }
        }

        const deleteExistingTransaction = (transactionID) => {
            deleteTransaction(transactionID)
        }
        

        return (
            <div >
                <div className = 'expense-tracker'> 
                    <div className = "container"> 
                        <h1>{name}'s Expense Tracker</h1>
                        {profilePhoto && <img src = {profilePhoto} alt = "profile"></img>}
                        <button onClick = {signUserOut}> Sign Out </button>
                        <div className = 'balance'>
                            <h3> Your Balance</h3>
                            {balance >= 0
                                ?<h2> ${balance}</h2>
                                :<h2>-${-1*balance}</h2>
                            }
                        </div>
                        <div className = 'summary'>
                            <div className = 'income'>
                                <h4> Income</h4>
                                <p> ${income}</p>
                            </div>
                            <div className = 'expenses'>
                                <h4> Expenses</h4>
                                <p> ${expenses}</p>
                            </div>
                        </div>
                        <form className = 'add-transaction' onSubmit = {onSubmit}>
                            <input type = 'text' placeholder = 'Description' required onChange={(e) => setDescription(e.target.value)} />
                            <input type = 'number' placeholder = 'Amount' required onChange = {(e) => setTransactionAmount(e.target.value)}/>
                            <input type = 'radio' id = 'expense' value = 'expense' 
                                onChange = {(e) => setTransactionType(e.target.value)}
                                checked = {transactionType === 'expense'}
                                />
                            <label htmlFor = 'expenses'> Expense </label>
                            <input type = 'radio' id = 'income' value = 'income' 
                                onChange = {(e) => setTransactionType(e.target.value)}
                                checked = {transactionType === "income"}/>
                            <label htmlFor = 'expenses'> Income</label>
                            <button type = 'submit'> Add Transaction</button>
                        </form>
                    </div>
                </div>
                            
                <div className = 'transactions'>
                    <h3> Transactions </h3>
                    <ul> 
                        {transactions.map((tran)=>{
                            const {description, transactionAmount, transactionType, id} = tran
                            return (
                                <li key = {id}>
                                    <h4> {description} </h4>
                                    <p> 

                                    ${transactionAmount} <label  style = {{color: transactionType === 'income' ? 'green' : 'red'}}> • {transactionType}</label> 
                                    </p>
                                    <button onClick = {() => deleteExistingTransaction(id)}> delete </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }