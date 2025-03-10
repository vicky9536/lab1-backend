const { Restaurant } = require('../models');

// View restaurant info
exports.viewRestInfo = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            return res.status(404).json({error: "Restaurant not found"});
        }
        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error fetching restaurant info:", error);
        res.status(500).json({error: error.message});
    }
};

// Update restaurant info
exports.updateRestInfo = async (req, res) => {
    console.log("Received request to update restaurant profile:", req.session.restaurantId);
    if (!req.session.restaurantId) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        const { name, location, description, contact_info, timings, image_url } = req.body;
        const restaurant = await Restaurant.findByPk(req.session.restaurantId);
        if (!restaurant) {
            return res.status(404).json({error: "Restaurant not found"});
        }
        restaurant.name = name;
        restaurant.location = location;
        restaurant.description = description;
        restaurant.contact_info = contact_info;
        restaurant.timings = timings;
        restaurant.image_url = image_url;
        await restaurant.save();
        req.session.Restaurant = { ...req.session.Restaurant, name, location, description, contact_info, timings, image_url };
        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error updating restaurant profile:", error);
        res.status(500).json({error: error.message});
    }
};