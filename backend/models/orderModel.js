const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   product_ordered: {
       type: String,
       required: [true, 'You must specify the product ordered']
   },

   saleOffer: {
       type: String,
       required: [true, 'You must specify the type of sale offer'],
       enum: ['Free Delivery', 'Buy 1 get 1 free', "No charge"]
   },

   customer_name: {
       type: String,
       required: [true, 'You must specify the customer who bought the product']
   },

   order_address: {
       type: String,
       required: [true, 'Please provide the delivery address of the product']
   },

   amountPaid: {
       type: String,
       required: [true, 'Specify the amount paid for the product']
   },

   datePurchased: {
       type: String,
       required: [true, "Specify the date the product has been bought"]
   },

   quantity: {
       type: Number,
       required: [true, "Enter the minimum number of products bought"],
       min: 1,
       default: 1
   },

   color: {
       type: String,
       required: [true, 'Specify the colour of the product please']
   },

   description: {
       type: String,
       required: [true, 'please specify the description of the product']
   },

   product: {
       type: mongoose.Schema.ObjectId,
       ref: "Product"
   }

});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;