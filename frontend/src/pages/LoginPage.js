import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
       
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
                </div>

            </form>
        </div>
    )
}

export default LoginPage
