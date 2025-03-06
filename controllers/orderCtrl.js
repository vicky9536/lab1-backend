const { Order } = require('../models');

// create a new order
exports.createOrder = async (req, res) => {
    try {
        const { restaurantId, consumerId, status, price } = req.body;
        const order = await Order.create({
            restaurantId,
            consumerId,
            status,
            price
        });
        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({error: error.message});
    }
};

// update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const [updated] = await Order.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedOrder = await Order.findOne({ where: { id: req.params.id } });
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({error: "Order not found"});
        }
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({error: error.message});
    }
};