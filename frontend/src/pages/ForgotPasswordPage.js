import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState(""); // E-mail Variable
    const [error, setError] = useState("");

    const forgotPasswordHandler = async (e) => {
        try {
            e.preventDefault();
        } 
        
        catch(error) {

        }
    }


    return (
        <div>
            <h1>Forgot Password Page </h1>
        </div>
    )
};

export default ForgotPasswordPage;