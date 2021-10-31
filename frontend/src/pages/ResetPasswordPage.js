import React, {useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const ResetPasswordPage = ({match}) => { // Reset Password Page Component
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const resetPasswordHandler = async (e) => {
        try {
            e.preventDefault();

            // Check if Passsword matches password confirm

            if(password !== confirmPassword) {
                setPassword("");
                setConfirmPassword("");
            }
        } 
        
        catch(error) {

        }
    }


    return (
        <div>
            <h1>Reset Password Page </h1>

            <p>Reset Your Password Below</p>

            <form onSubmit = {resetPasswordHandler}>

                <div>
                    <label for = "password">Password </label>
                </div>
            </form>


         </div>
    )
};

export default ResetPasswordPage;