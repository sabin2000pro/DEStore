import React from 'react'
import {Route, BrowserRouter, Link, Switch} from 'react-router-dom';

const Navigation = () => { // Navigation Bar
    return (
    <BrowserRouter>
      <div className = "nav__container">
        <nav className = "main__navigation">

          <ul className = "navigation__items">
            <li className = "navigation__item">
              <Link to="/">Home</Link>
            </li>


            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            
          </Route>

          <Route path="/">
            
          </Route>
          <Route path="/">
           
          </Route>

        </Switch>
      </div>

    </BrowserRouter>
    )
}

export default Navigation
