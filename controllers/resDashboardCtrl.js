const { Restaurant } = require('../models');
const { Dish } = require('../models');

// Get all restaurants
exports.getAllRest = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.status(200).json(restaurants);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).json({error: error.message});
    }
};

// Get dishes for a specific restaurant
exports.getDishes = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const dishes = await Dish.findAll({ where: { restaurantId } });
        res.status(200).json(dishes);
    } catch (error) {
        console.error("Error fetching dishes:", error);
        res.status(500).json({error: error.message});
    }
};