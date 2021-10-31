import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/routing/PrivateRoute';
import PrivateScreen from './pages/PrivateScreen';
import ProductsList from './pages/ProductsList';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const App = () => {
  return (
    <Router>
    <div className = "app">

    <nav>
      <ul>
        <li> <a href = "/productslist">View Products</a>  </li>
        <li> <a href = "/register">Store Manager Register</a>  </li>
        <li> <a href = "/adminlogin">Store Manager Login</a>  </li>
      </ul>
    </nav>
       
       <Switch>
         <PrivateRoute exact path = "/" component = {PrivateScreen} />
          <Route exact path = "/productslist" component = {ProductsList} />
          <Route exact path = "/adminlogin" component = {LoginPage} />
          <Route exact path = "/register" component = {RegisterPage} />
          <Route exact path = "/forgotpassword" component = {ForgotPasswordPage} />
       </Switch>



    </div>
 </Router>
  )
}

export default App;