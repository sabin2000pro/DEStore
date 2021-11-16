// {
//     "product_ordered": "PS5",
//     "saleOffer": "Free Delivery",
//     "customer_name": "John Doe",
//     "order_address": "123 Fake Address",
//     "amountPaid": "£480.00",
//     "datePurchased": "05/11/2021",
//     "quantity": 1,
//     "color": "white",
//     "description": "A nice PS5"
// },


module.exports = () => {
    const now = Date.now();

    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>DE-Store Performance Report</title>
     </head>


     <body>
        <td>
        Datum: ${`${now.getDate()}. ${now.getMonth() + 1}. ${now.getFullYear()}.`}
        The store is doing very well. There are orders

        </td>
     
     </body>
    `
}