const { Favorite } = require('../models');

// View the favorite list
exports.viewFavorite = async (req, res) => {
    if (!req.session.consumerId) {
        return res.status(401).json({error: "Unanthorized"})
    }

    try {
        const favorite = await Favorite.findAll({
            where: {consumerId: req.session.consumerId}
        });
        res.status(200).json(favorite);
    } catch (error) {
        console.error("Error fetching favorite list:", error);
        res.status(500).json({error: error.message});
    }
}


// Add a restaurant to favorites
exports.addFavorite = async (req, res) => {
    if (!req.session.consumerId) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        const favorite = await Favorite.create({
            consumerId: req.session.consumerId, restaurantId: req.body.restaurantId
        });
        res.status(201).json(favorite);
    } catch (error) {
        console.error("Error adding favorite:", error);
        res.status(500).json({error: error.message});
    }
};

// Remove a restaurant from favorites
exports.removeFavorite = async (req, res) => {
    if (!req.session.consumerId) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        const deleted = await Favorite.destroy({
            where: { id: req.params.id, consumerId: req.session.consumerId }
        });
        if (deleted) {
            res.status(200).json({message: "Favorite removed"});
        } else {
            res.status(404).json({error: "Favorite not found"});
        }
    } catch (error) {
        console.error("Error removing favorite:", error);
        res.status(500).json({error: error.message});
    }
};