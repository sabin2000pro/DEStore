import React, {useState, useEffect} from 'react'
import axios from 'axios';
import '../App.css';

const AccountingPage = () => {

    const [orders, setOrders] = useState([]);
    const [displayed, setDisplay] = useState(false);

    useEffect(() => {
        return getCustomerOrders()
    }, [])

        const getCustomerOrders = async () => {
            try {
                return await axios.get(`http://localhost:5950/api/v1/orders`).then(response => {
                    const data = response.data.orders;
                    setOrders(data);

                }).catch(err => {
                    if(err) {
                        console.log(err);
                    }
                })
        
            }
            
            catch(error) {
                if(error) {
                    throw new Error(error);
                }
            }
        };

        // "product_ordered": "PS5",
        // "saleOffer": "Free Delivery",
        // "customer_name": "John Doe",
        // "order_address": "123 Fake Address",
        // "amountPaid": "£480.00",
        // "datePurchased": "05/11/2021",
        // "quantity": 1,
        // "color": "white",
        // "description": "A nice PS5"

    return (
        <div>
            <h1>Accounting Analysis</h1>
            <h2>DE-Store Orders</h2>
            <button onClick = {() => setDisplay(true)}>View Placed Orders</button>

           {displayed ? orders.map((order, key) => {
               return <div className = "orders" key = {key}>
                   <h3>Product: {order.product_ordered}</h3>
                   <h3>{order.customer_name}</h3>
                   <h3>Sale Offer: {order.saleOffer}</h3>
                   <h3>Order Address: {order.order_address}</h3>
                   <h3>Amount Paid: {order.amountPaid}</h3>
                   <h3>Date Purchased: {order.datePurchased}</h3>
                   <h3>Quantity Purchased: {order.quantity}</h3>
                   <h3>Order ID: {order._id}</h3>
                   <h3>Color: {order.color}</h3>
                   <h3>Product Description: {order.description}</h3>
               </div>
           }) : null}


        </div>
    )
}

export default AccountingPage
