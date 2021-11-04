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

    useEffect(() => { // Used for loyalty card
        return getAllPayments();
      }, [])

      const renderPayments = payments.map((payment, key) => {
          return <div key = {key}>
              <h3>{payment._id}</h3>
              <h3>Card type: {payment.cardType}</h3>
          </div>
      })

    const getAllPayments = async () => {
        return await axios.get(`http://localhost:5950/api/v1/payment/getAllPayments`).then(response => {
                const payments = response.data.payments;
                const length = response.data.payments.length;
                setPayments(payments);
            })
    }
   
    return (
      <div>
    {renderPayments}

      </div>
    )
}

export default Homepage // Export Homepage component