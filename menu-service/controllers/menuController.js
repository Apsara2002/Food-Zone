const Menu = require("../models/Menu");
const Restaurant = require("../models/Restaurant");

exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const { restaurantId } = req.body;

    //check restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItem = new Menu(req.body);
    const savedMenuItem = await menuItem.save();

    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const updatedMenuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedMenuItem = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};