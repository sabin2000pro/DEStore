import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import AdminProductsPage from './AdminProductsPage'

const PrivateScreen = () => { // Private Screen Component
    let history = useHistory();
    const [error, setError] = useState("");

    useEffect(() => {
        if(!localStorage.getItem("authToken")) {
            return history.push('/login');
        }
    }, [history])

    const logoutHandler = async (e) => { // Function to log out the Store Manager
        try {
            localStorage.removeItem("authToken"); // Remove auth token from local storage
           return history.push('/adminlogin');
        } 
        
        catch(error) {
            if(error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <AdminProductsPage />
            <button onClick = {logoutHandler}>Logout</button>
        </div>
    )


};

export default PrivateScreen;