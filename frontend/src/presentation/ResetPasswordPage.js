import React, {useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';

const ResetPasswordPage = ({match}) => { // Reset Password Page Component
    let history = useHistory();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const resetPasswordHandler = async (e) => { // Reset Password Function
        try {
            
            e.preventDefault();

            if(password !== confirmPassword) {  // If passwords don't match
                setPassword("");
                setConfirmPassword("");

                setTimeout(() => {
                    setError("");
                }, 5000);

                return setError("Passwords don't match");
            }

            const {data} = await axios.put(`http://localhost:5950/api/v1/auth/resetpassword/${match.params.resetToken}`, {password}); // Send put request to the back-end with the reset token and new password
            console.log(data.data);

            setSuccess(data.data);
            return history.push("/"); // Redirect after reseting password
        } 
        
        catch(error) {

            if(error) {
                return console.log(error);
            }

        }
    }

    return (

        <div className = "register__form-container">
            <p>Reset Your Password Below</p>

            <form onSubmit = {resetPasswordHandler}>
            <h3 style = {{fontFamily: "Arial"}}>Reset Password</h3>

            {error && <span>{error} </span>}

        {success && (
            <span> {success} <Link to="/login">Login</Link></span>
            )}

                <div>
                    <label for = "password">Password </label>
                    <input type = "password" required id = "password" placeholder = "Enter New Password" onChange = {(e) => {setPassword(e.target.value)}} />
                </div>

                <div>
                    <label for = "confirmpassword">Confirm Password </label>
                    <input type = "password" required if = "confirmpassword" placeholder = "Confirm New Password" onChange = {(e) => {setConfirmPassword(e.target.value)}} />
                </div>

                <button type="submit">Reset Password</button>

            </form>
         </div>
    )
};

export default ResetPasswordPage; // Export the page component to reset password