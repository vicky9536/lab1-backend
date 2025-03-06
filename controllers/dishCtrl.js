const { Dish } = require('../models');

// Create new dish
exports.createDish = async (req, res) => {
    try {
        const { name, description, price, category, restaurantId } = req.body;
        const dish = await Dish.create({
            name,
            description,
            price,
            category,
            restaurantId
        });
        res.status(201).json(dish);
    } catch (error) {
        console.error("Error creating dish:", error);
        res.status(500).json({error: error.message});
    }
};

// Update dish
exports.updateDish = async (req, res) => {
    try {
        const [updated] = await Dish.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedDish = await Dish.findOne({ where: { id: req.params.id } });
            res.status(200).json(updatedDish);
        } else {
            res.status(404).json({error: "Dish not found"});
        }
    } catch (error) {
        console.error("Error updating dish:", error);
        res.status(500).json({error: error.message});
    }
};

// Delete dish
exports.deleteDish = async (req, res) => {
    try {
        const deleted = await Dish.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({message: "Dish deleted"});
        } else {
            res.status(404).json({error: "Dish not found"});
        }
    } catch (error) {
        console.error("Error deleting dish:", error);
        res.status(500).json({error: error.message});
    }
};