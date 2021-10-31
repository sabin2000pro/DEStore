import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
    const [cardholderName, setcardholderName] = useState("");
    const [cardType, setCardType] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [code, setCode] = useState(0);


    const createPayment = () => { // Function called to create a payment for the product
        return axios.post();
    }

    return (

        <div>
            <h1>Enabling - Finance</h1>

            <form onSubmit = {createPayment}>

                <div>
                    <label for = "cardholderName">Cardholder Name</label>
                    <input type = "text" placeholder = "Enter Cardholder Name" required id = "cardholderName" onChange = {(e) => {setcardholderName(e.target.value)}} />
                </div>

                <div>
                    <label for = "cardType">Card Type</label>
                    <input type = "text" placeholder = "Enter Card Type" required id = "cardType" onChange = {(e) => {setCardType(e.target.value)}} />
                </div>

                <div>
                    <label for = "cardNumber">Card Number</label>
                    <input type = "text" placeholder = "Enter Card Number" required id = "cardNumber" onChange = {(e) => {setCardNumber(e.target.value)}} />
                </div>


            </form>
        </div>
    )
};

export default PaymentPage; // Export the Payment Page Component