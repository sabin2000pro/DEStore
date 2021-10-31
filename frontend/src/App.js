import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/routing/PrivateRoute';
import PrivateScreen from './pages/PrivateScreen';
import ProductsList from './pages/ProductsList';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PaymentPage from './pages/PaymentPage';

const App = () => {
  return (
    <Router>
    <div className = "app">

    <nav>
      <ul>
        <li><a href = "/home">Homepage</a></li>
        <li> <a href = "/productslist">View Products</a>  </li>
        <li> <a href = "/register">Store Manager Register</a>  </li>
        <li> <a href = "/adminlogin">Store Manager Login</a>  </li>
      </ul>
    </nav>
       
       <Switch>
         <PrivateRoute exact path = "/" component = {PrivateScreen} />
          <Route exact path = "/home" component = {Homepage} />
          <Route exact path = "/productslist" component = {ProductsList} />
          <Route exact path = "/adminlogin" component = {LoginPage} />
          <Route exact path = "/register" component = {RegisterPage} />
          <Route exact path = "/forgotpassword" component = {ForgotPasswordPage} />
          <Route exact path = "/passwordreset/:resetToken" component = {ResetPasswordPage} />
          <Route exact path = "/payment" component = {PaymentPage} />
       </Switch>



    </div>
 </Router>
  )
}

export default App;