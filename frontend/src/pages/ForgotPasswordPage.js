import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");

    const forgotPasswordHandler = async (e) => {
        try {
            e.preventDefault();

            const {data} = await axios.post(`http://localhost:5950/api/v1/auth/forgotpassword`, {email});
            setSuccess(data.data);
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

            <button type="submit">Send Email</button>
        </form>

    </div>
   )
   
};

export default ForgotPasswordPage;