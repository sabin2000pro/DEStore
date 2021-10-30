import React, {useState, useEffect} from 'react'
import '../App.css';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

const RegisterPage = () => { // Register Account Page Component
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError ] = useState("");
    let port = 5950;

    useEffect(() => {
        if(localStorage.getItem("authToken")) {
            return history.push("/adminlogin");
        }

    }, [history])

    const registerHandler = async (e) => { // Function to Register User
        try {
            e.preventDefault();

            if(password !== confirmPassword) {
                setPassword("");
                setConfirmPassword("");
    
                setTimeout(() => {
                    setError("");
                }, 5000);
            }

            const {data} = await axios.post(`http://localhost:${port}/api/v1/auth/register`, {username, email, password});
            localStorage.setItem("authToken", data.token); // Store the Auth Token in local storage
            return history.push("/adminlogin");
        } 
        
        catch(error) {
            if(error) {

            }
        }

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

                <div>
                    <label for = "confirmpassword">Confirm Password </label>
                    <input type = "password" required id = "confirmpassword" placeholder = "Re-Enter Password" value = {confirmPassword} onChange = {(e) => {setConfirmPassword(e.target.value)}} />
                 </div>

                <button type = "submit">Submit</button>
                <span>Already have an account ? <Link to = "/adminlogin">Login</Link></span>

            </form>
        </div>
    )
}

export default RegisterPage