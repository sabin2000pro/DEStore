// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A
// File Purpose: Homepage React Component - Displays information about DE-Store and allows navigation between pages

import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Homepage = () => { // Homepage React Component
    const [payments, setPayments] = useState([]);
    const [email, setEmail] = useState("");
    let port = 5950;

    useEffect(() => { // Used for loyalty card
        return getAllPayments();
      }, [])

    const getAllPayments = async () => { // retrieves all the payments from the database

        return await axios.get(`http://localhost:${port}/api/v1/payment/getAllPayments`).then(response => {
                const payments = response.data.payments;
                const length = response.data.payments.length;
                setPayments(payments);

                if(length > 5) { // If there are more than 5 payments
                    alert(`You are have received a Loyalty Card. Enter your e-mail below`);
              }
        })
    }
   
    return (
      <div>
         
      </div>
    )
}

export default Homepage // Export Homepage component