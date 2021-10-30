import React, {useState, useEffect} from 'react';
import axios from 'axios';


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {

    }

    return (
        <div>
            <h1>Admin Login </h1>
            <form onSubmit = {loginHandler}>

                <div>
                    <label for = "email">E-mail Address</label>
                </div>

            </form>
        </div>
    )
}

export default LoginPage
