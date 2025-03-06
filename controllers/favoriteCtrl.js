const { Favorite } = require('../models');

// Add a restaurant to favorites
exports.addFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.create(req.body);
        res.status(201).json(favorite);
    } catch (error) {
        console.error("Error adding favorite:", error);
        res.status(500).json({error: error.message});
    }
};

// Remove a restaurant from favorites
exports.removeFavorite = async (req, res) => {
    try {
        const deleted = await Favorite.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({message: "Favorite removed"});
        } else {
            res.status(404).json({error: "Favorite not found"});
        }
    } catch (error) {
        console.error("Error removing favorite:", error);
        res.status(500).json({error: error.message});
    }
};