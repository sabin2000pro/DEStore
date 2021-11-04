import React from 'react';
import {render} from '@testing-library/react';
import ProductsList from '../pages/ProductsList';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

it("Products List Page Renders correctly" , () => {
    render(<Router><ProductsList /></Router>);
});