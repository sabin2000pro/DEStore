const asyncHandler = require('../middleware/asyncHandler');
const Order = require('../models/orderModel');

module.exports.getOrders = asyncHandler(async(request, response, next) => {
    const orders = await Order.find({});
    return response.status(200).json({orders});
});

module.exports.getOrderByID = asyncHandler(async(request, response, next) => {
    const id = request.params.id;
    const order = await Order.findById(id);

    return response.status(200).json(order);
});

module.exports.editOrder = asyncHandler(async(request, response, next) => {
    
})

module.exports.deleteOrder = asyncHandler(async(request, response, next) => {

});