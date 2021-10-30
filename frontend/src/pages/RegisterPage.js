import React, {useState, useEffect} from 'react'
import '../App.css';
import axios from 'axios';

const RegisterPage = () => { // Register Account Page Component
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError ] = useState("");

    const registerHandler = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                setError("");
            }, 5000);
        }

        // Check if passwords match or not
    }

    return (
        <div>
            <h1 className = "register__txt">Admin Registration</h1>
            <form onSubmit = {registerHandler}>

                <div>
                    <label for = "username">Username:</label>
                    <input required id = "username" type = "text" placeholder = "Enter Username" value = {username} onChange = {(e) => {setUsername(e.target.value)}} />
                </div>

                <div>
                    <label for = "email">E-mail Address</label>
                    <input required id = "email" type = "email" placeholder = "Enter E-mail Address" value = {email} onChange = {(e) => {setEmail(e.target.value)}} />
                </div>

                <div>
                    <label for = "password">Password</label>
                    <input type = "password" required id = "password" placeholder = "Enter Password" value = {password} onChange = {(e) => {setPassword(e.target.value)}} />
                </div>



                

            </form>
        </div>
    )
}

export default RegisterPage