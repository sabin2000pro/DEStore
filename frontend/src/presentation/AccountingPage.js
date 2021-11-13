import React, {useState, useEffect} from 'react'
import axios from 'axios';

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

    return (
        <div>
            <h1>Accounting Analysis</h1>
            <button onClick = {() => setDisplay(true)}>View Placed Orders</button>

           {displayed ? orders.map((order, key) => {
               return <div key = {key}>
                   <h3>{order.customer_name}</h3>
               </div>
           }) : null}


        </div>
    )
}

export default AccountingPage
