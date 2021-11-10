import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// Pages Imports
import Homepage from './presentation/Homepage';
import RegisterPage from './presentation/RegisterPage';
import LoginPage from './presentation/LoginPage';
import PrivateRoute from './components/routing/PrivateRoute';
import PrivateScreen from './presentation/PrivateScreen';
import ProductsList from './presentation/ProductsList';
import ForgotPasswordPage from './presentation/ForgotPasswordPage';
import ResetPasswordPage from './presentation/ResetPasswordPage';
import PaymentPage from './presentation/PaymentPage';
import AccountingPage from './presentation/AccountingPage';
import ProductPage from './presentation/ProductPage'

const App = () => { // Main App Component
  return (
    
    <Router>
      <div className = "app">

    //* Navigation Links
    <nav>
      <ul>
        <li><a href = "/home">Homepage</a></li>
        <li> <a href = "/productslist">View Products</a>  </li>
        <li> <a href = "/register">Store Manager Register</a>  </li>
        <li> <a href = "/adminlogin">Store Manager Login</a>  </li>
        <li><a href = "/accounting">Performance Analysis</a></li>
      </ul>
    </nav>
       
       //* Switching Between Links
       <Switch>
         <PrivateRoute exact path = "/" component = {PrivateScreen} />
          <Route exact path = "/home" component = {Homepage} />
          <Route exact path = "/productslist" component = {ProductsList} />
          <Route exact path = "/adminlogin" component = {LoginPage} />
          <Route exact path = "/register" component = {RegisterPage} />
          <Route exact path = "/forgotpassword" component = {ForgotPasswordPage} />
          <Route exact path = "/passwordreset/:resetToken" component = {ResetPasswordPage} />
          <Route exact path = "/payment/:id" component = {PaymentPage} />
          <Route exact path = "/product/:id" component = {ProductPage} />
          <Route exact path = "/accounting" component = {AccountingPage} />
       </Switch>

    </div>
 </Router>
 
  )
}

export default App;