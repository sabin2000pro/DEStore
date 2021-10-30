import React, {useState, useEffect} from 'react'
import axios from 'axios';

const RegisterPage = () => { // Register Account Page Component
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError ] = useState("");

    const registerHandler = async (e) => {
        e.preventDefault();

        // Check if passwords match or not
    }

    return (
        <div>
            <form onSubmit = {registerHandler}>

                <div>
                    <label for = "username">Username:</label>
                    <input required id = "username" type = "text" placeholder = "Enter Username" value = {username} onChange = {(e) => {setUsername(e.target.value)}} />
                </div>

                <div>
                    
                </div>


                

            </form>
        </div>
    )
}

export default RegisterPage