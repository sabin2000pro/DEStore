import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import ReactDom from 'react-dom';
import LoginPage from '../pages/RegisterPage';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

it("Login Page Renders correctly" , () => {
    render(<Router><LoginPage /></Router>);
});