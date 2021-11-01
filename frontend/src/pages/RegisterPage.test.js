import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import ReactDom from 'react-dom';
import RegisterPage from '../pages/RegisterPage';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

it("Register Page Renders correctly" , () => {
    render(<Router><RegisterPage /></Router>);
});