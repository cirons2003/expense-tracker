import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import ExpenseTracker from './pages/ExpenseTracker/ExpenseTracker.js'

function App() {

  return (
    <div>
      <Router>
        <Routes>  
          <Route path = "/" exact element = {<Auth/>}/>
          <Route path = "/expense-tracker" element = {<ExpenseTracker/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
