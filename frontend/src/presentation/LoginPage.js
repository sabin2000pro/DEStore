import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

const LoginPage = () => {
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => { 

        if(localStorage.getItem("authToken")) { // If there is a token in local storage
            return history.push("/"); // Redirect home
        }

    }, [history]);

    const loginHandler = async (e) => { // Login Function
       try {

           e.preventDefault();
           const {data} = await axios.post(`http://localhost:5950/api/v1/auth/login`, {email, password});
           
           localStorage.setItem("authToken", data.token); // Store the token in local storage
           return history.push("/");
       } 
       
       catch(err) {

        if(err) {
            return console.error(err);
        } 
        }
    }

    return (
        <div>
            <h1>Store Manager Login </h1>
            <form onSubmit = {loginHandler}>

                <div>
                    <label for = "email">E-mail Address</label>
                    <input type = "email" required id = "email" placeholder = "Enter E-mail" value = {email} onChange = {(e) => {setEmail(e.target.value)}} tabIndex = {1} />
                </div>

                <div>
                    <label for = "password">Password </label>
                    <input type = "password" required id = "password" placeholder = "Enter Password" value = {password} onChange = {(e) => {setPassword(e.target.value)}} />
                </div>

                <a href = "/forgotpassword"> Forgot Password ? Reset Here </a>

                <button type = "submit">Login</button>
                <span>Need an account ? <Link to = "/register">Register Account</Link></span>

            </form>
        </div>
    )
}

export default LoginPage // Export the Login Component