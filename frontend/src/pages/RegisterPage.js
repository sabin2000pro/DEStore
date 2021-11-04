import React, {useState, useEffect} from 'react'
import '../App.css';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

const RegisterPage = () => { // Register Account Page Component
    let history = useHistory();
    const [username, setUsername] = useState(""); // The Username of Store Manager
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError ] = useState("");
    let port = 5950;

    useEffect(() => {
        
        return verifyAuthToken();

    }, [history]);

    const verifyAuthToken = () => {
        if(localStorage.getItem("authToken")) { // If there is a token in local storage
            return history.push("/adminlogin"); // Redirect user to login
        }
    }
 

    const registerHandler = async (e) => { // Function to Register User

        try {

            e.preventDefault();

            if(password !== confirmPassword) {
                setPassword("");
                setConfirmPassword("");
    
                return setTimeout(() => {
                    setError("");
                }, 5000);

            }

            const {data} = await axios.post(`http://localhost:${port}/api/v1/auth/register`, {username, email, password}); // Send post request to the back-end API
            console.log(data.token); // Log that token

            localStorage.setItem("authToken", data.token);
            return history.push("/adminlogin");
        } 
        
        catch(error) {
            if(error) {
               return console.log(error);
            }

        }

    }

    return (
        <div>
            <h1 className = "register__txt">Store Manager Registration</h1>
            <form onSubmit = {registerHandler}>

                <div>
                    <label htmlFor = "username">Username:</label>
                    <input required id = "username" type = "text" placeholder = "Enter Username" value = {username} onChange = {(e) => {setUsername(e.target.value)}} />
                </div>

                <div>
                    <label htmlFor = "email">E-mail Address</label>
                    <input required id = "email" type = "email" placeholder = "Enter E-mail Address" value = {email} onChange = {(e) => {setEmail(e.target.value)}} />
                </div>

                <div>
                    <label htmlFor = "password">Password</label>
                    <input type = "password" required id = "password" placeholder = "Enter Password" value = {password} onChange = {(e) => {setPassword(e.target.value)}} />
                </div>

                <div>
                    <label htmlFor = "confirmpassword">Confirm Password </label>
                    <input type = "password" required id = "confirmpassword" placeholder = "Re-Enter Password" value = {confirmPassword} onChange = {(e) => {setConfirmPassword(e.target.value)}} />
                 </div>

                <button type = "submit">Submit</button>
                <span>Already have an account ? <Link to = "/adminlogin">Login</Link></span>

            </form>
        </div>
    )
}

export default RegisterPage