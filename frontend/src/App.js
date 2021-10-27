import './App.css';
import Homepage from './pages/Homepage';
import ProductsList from './pages/ProductsList';
import {Route, Router, Link, Switch} from 'react-router-dom';

const App = () => {
  return (
      <div>
          <ProductsList />
      </div>
  )
}

export default App;