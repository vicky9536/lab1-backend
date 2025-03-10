const { Order } = require('../models');

// view order
exports.viewOrder = async (req, res) => {
    if (!req.session.restaurantId) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        const order = await Order.findAll({
            where: {restaurantId: req.session.restaurantId}
        });
        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({error: error.message});
    }
}


// create a new order
exports.createOrder = async (req, res) => {
    if (!req.session.consumerId) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        const { restaurantId, price } = req.body;
        const order = await Order.create({
            restaurantId,
            consumerId: req.session.consumerId,
            status: 'New',
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
    if (!req.session.restaurantId) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        const { status } = req.body;
        const [updated] = await Order.update({ status }, {
            where: { id: req.params.id, restaurantId: req.session.restaurantId }
        });
        if (updated) {
            const updatedOrder = await Order.findOne({ 
                where: { id: req.params.id, restaurantId: req.session.restaurantId } 
            });
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({error: "Order not found"});
        }
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({error: error.message});
    }
};