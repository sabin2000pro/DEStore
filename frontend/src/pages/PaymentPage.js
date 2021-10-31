import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
    let history = useHistory();
    const [cardholderName, setcardholderName] = useState("");
    const [cardType, setCardType] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [code, setCode] = useState(0);
    const [paymentComplete, setPaymentComplete] = useState(false);

    const createPayment = () => { // Function called to create a payment for the product
        try {
            axios.post(`http://localhost:5950/api/v1/payment/createPayment`, {cardholderName: cardholderName, cardType: cardType, cardNumber: cardNumber, expiryDate: expiryDate, code: code});
            alert('Payment Completed');
            setPaymentComplete(true);
            return history.push("/productslist");
        } 
        
        catch(error) {
            
            if(error) {
                console.log(error);
            }
        }
        
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

                <div>
                    <label for = "expiryDate">Expiry Date</label>
                    <input type = "text" placeholder = "Enter Expiry Date" required id = "expiryDate" onChange = {(e) => {setExpiryDate(e.target.value)}} />
                </div>

                <div>
                    <label for = "code">CCV Code</label>
                    <input type = "number" placeholder = "Enter CCV Code" required id = "code" onChange = {(e) => {setCode(e.target.value)}} />
                </div>

                <button>Make Payment</button>

            </form>
        </div>
    )
};

export default PaymentPage; // Export the Payment Page Component