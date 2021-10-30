import React, {useState, useEffect} from 'react'
import axios from 'axios';

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError ] = useState("");

    return (
        <div>
            <form>

                <div>
                    <label for = "username">Username:</label>
                    <input required id = "username" type = "text" placeholder = "Enter Username" value = {username} />
                </div>
                

            </form>
        </div>
    )
}

export default RegisterPage