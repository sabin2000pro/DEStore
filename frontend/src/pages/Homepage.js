// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A
// File Purpose: Homepage React Component - Displays information about DE-Store and allows navigation between pages

import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Homepage = () => { // Homepage React Component

    useEffect(() => { // Used for loyalty card
        const getPayments = async () => {
            await axios.get(`http://localhost:5950/api/v1/payment/getAllPayments`).then((response) => {
                const thePayments = response.data;

                thePayments.forEach(payment => {console.log(payment)});
            })
        }

      getPayments();
    }, [])
   
    return (
       <div className = "text__container">
           <main>
               <h1>DE-Store Homepage</h1>
               
               
           </main>

       </div>
    )
}

export default Homepage // Export Homepage component