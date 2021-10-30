import React from 'react'
import {Route, BrowserRouter, Link, Switch} from 'react-router-dom';
import Homepage from '../pages/Homepage';
import ProductsList from '../pages/ProductsList';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';

const Navigation = () => { // Navigation Bar
    return (

    <BrowserRouter>
      <div className = "nav__container">

        <nav className = "main__navigation">
          <ul className = "navigation__items">
              
            <li className = "navigation__item">
              <Link className = "nav_item" to="/home">Home</Link>
            </li>

            <li>
              <Link to="/productslist">View Products</Link>
            </li>

            <li>
              <Link to="/adminregister">Store Manager Register</Link>
            </li>

            <li>
                <Link to = '/adminlogin'>Store Manager Login</Link>
            </li>

          </ul>

        </nav>

        <Switch>

            <Route path = "/home">
                <Homepage />
            </Route>

          <Route path="/productslist">
            <ProductsList />
          </Route>

          <Route path="/adminregister">
             <RegisterPage />
          </Route>

          <Route path="/adminlogin">
            <LoginPage />
          </Route>

        </Switch>
      </div>

    </BrowserRouter>
    )
}

export default Navigation
