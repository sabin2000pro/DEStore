import React, {useState, useEffect} from 'react'
import axios from 'axios';

const AccountingPage = () => {

    const [orders, setOrders] = useState([]);
    const [displayed, setDisplay] = useState(false);

        const getCustomerOrders = async () => {
            try {
                // Send GET request to get all of the "fake orders"
                const orders = await axios.get(``);
            }
            
            catch(error) {
                if(error) {
                    throw new Error(error);
                }
            }
        };

    return (
        <div>
            <h1>Accounting Analysis</h1>

            <button onClick = {getCustomerOrders}>View Placed Orders</button>
        </div>
    )
}

export default AccountingPage
