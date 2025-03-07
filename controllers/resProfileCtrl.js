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
    if (!req.session.restaurantId) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        const [updated] = await Restaurant.update(req.body, {
            where: { id: req.session.restaurantId }
        });

        if (updated) {
            const updatedRest = await Restaurant.findByPk(req.session.restaurantId);
            req.session.restaurant = updatedRest.toJSON();
            res.status(200).json(updatedRest);
        } else {
            res.status(404).json({error: "Restaurant not found"});
        }
    } catch (error) {
        console.error("Error updating restaurant info:", error);
        res.status(500).json({error: error.message});
    }
};
