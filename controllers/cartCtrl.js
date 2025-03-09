const { Cart } = require('../models');
const { Consumer } = require('../models');
const { Dish } = require('../models');
const { Order } = require('../models');

// review cart
exports.getCart = async (req, res) => {
    if (!req.session.consumerId) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        const consumerId = req.session.consumerId;
        const cartItems = await Cart.findAll({
            where: { consumerId },
            include: [{ model: Dish }]
        });
        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({error: error.message});
    }
};

// add dish to cart
exports.addCart = async (req, res) => {
    if (!req.session.consumerId) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        const { dishId, quantity, restaurantId } = req.body;
        const consumerId = req.session.consumerId;
        const cartItem = await Cart.create({
            dishId,
            quantity,
            restaurantId,
            consumerId
        });
        res.status(201).json(cartItem);
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({error: error.message});
    }
};

// delete dish from cart
// test
exports.deleteCart = async (req, res) => {
    if (!req.session.consumerId) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        const deleted = await Cart.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(200).json({message: "Dish deleted from cart"});
        } else {
            res.status(404).json({error: "Dish not found in cart"});
        }
    } catch (error) {
        console.error("Error deleting from cart:", error);
        res.status(500).json({error: error.message});
    }
};

// checkout
exports.checkout = async (req, res) => {
    if (!req.session.consumerId) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        const consumerId = req.session.consumerId;
        const cartItems = await Cart.findAll({
            where: { consumerId },
            include: [{ model: Dish }]
        });
        console.log("Cart Items:", cartItems);

        const orderItems = cartItems.map(item => ({
            dishId: item.dishId,
            name: item.Dish.name,
            quantity: item.quantity,
            price: item.Dish.price,
        }));
        const totalPrice = cartItems.reduce((total, item) => total + (item.Dish.price * item.quantity), 0);

        const order = await Order.create({
            consumer_id: consumerId,
            restaurant_id: cartItems[0].restaurantId,
            price: totalPrice,
            status: 'New',
            items: JSON.stringify(orderItems)
        });
        await Cart.destroy({ where: { consumerId } });
        res.status(200).json(order);
    } catch (error) {
        console.error("Error checking out:", error);
        res.status(500).json({error: error.message});
    }
};