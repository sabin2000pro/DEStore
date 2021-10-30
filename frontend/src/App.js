import './App.css';
import ProductsList from './pages/ProductsList';
import {Route, Router, Link, Switch} from 'react-router-dom';
import Homepage from '../src/pages/Homepage'
import RegisterPage from '../src/pages/RegisterPage'
import Navigation from '../src/components/Navigation';


const App = () => {
  return (
      <div>
        <Navigation />
          <Homepage/>
      </div>
  )
}

export default App;