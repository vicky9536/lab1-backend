const { Cart } = require('../models');
const { Consumer } = require('../models');
const { Dish } = require('../models');

// review cart
exports.getCart = async (req, res) => {
    try {
        const consumerId = req.session.consumer.id;
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
    try {
        const { dishId, quantity } = req.body;
        const consumerId = req.session.consumer.id;
        const cartItem = await Cart.create({
            dishId,
            quantity,
            consumerId
        });
        res.status(201).json(cartItem);
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({error: error.message});
    }
};

// delete dish from cart
exports.deleteCart = async (req, res) => {
    try {
        const deleted = await Cart.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({message: "Dish deleted from cart"});
        } else {
            res.status(404).json({error: "Dish not found in cart"});
        }
    } catch (error) {
        console.error("Error deleting from cart:", error);
        res.status(500).json({error: error.message});
    }
};

// checkout