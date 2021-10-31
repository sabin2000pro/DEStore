import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");

    const forgotPasswordHandler = async (e) => {
        try {
            e.preventDefault();
        } 
        
        catch(error) {
            if(error) {
                console.log(error);
            }
        }
    }

   return (
    <div>
        <h1>Forgot Password</h1>
        <p>If you have forgotten your password, please enter your e-mail address below to send a reset link </p>

        <form onSubmit = {forgotPasswordHandler}>
            <label for = "email">E-mail Address: </label>
            <input type = "email" required id = "email" placeholder = "Enter E-mail Address" onChange = {(e) => {setEmail(e.target.value)}} />
        </form>

    </div>
   )
   
};

export default ForgotPasswordPage;