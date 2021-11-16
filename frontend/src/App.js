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
import AccountingPage from './presentation/AccountingPage';
import ProductPage from './presentation/ProductPage';
import PerformanceAnalysisPage from './presentation/PerformancePage';
import FinancePage from './presentation/FinancePage';

const App = () => { // Main App Component
  return (
    
    <Router>
      <div className = "app">

    <nav>
      <ul>
        <li><a href = "/home">Homepage</a></li>
        <li> <a href = "/productslist">View Products</a>  </li>
        <li> <a href = "/register">Store Manager Register</a>  </li>
        <li> <a href = "/adminlogin">Store Manager Login</a>  </li>
        <li><a href = "/accounting">Accounting</a></li>
        <li><a href = "/performanceanalysis">Performance Analysis</a></li>

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
          <Route exact path = "/product/:id" component = {ProductPage} />
          <Route exact path = "/accounting" component = {AccountingPage} />
          <Route exact path = "/performanceanalysis" component = {PerformanceAnalysisPage} />
          <Route exact path = "/enablingfinance/:id" component = {FinancePage} />
       </Switch>

    </div>
 </Router>
 
  )
}

export default App;