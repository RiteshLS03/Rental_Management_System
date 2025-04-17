const Property = require("../Model/Property/PropertyModel");
const asyncHandler = require("express-async-handler");
// Create a new property
exports.addProperty = asyncHandler(async (req, res) => {
  const { id } = req.landlord;
  const { address } = req.body;

  // Validate required fields
  if (!address) {
    return res.status(400).json({
      message: "Please provide all required fields: address and landlord",
    });
  }

  try {
    // Check if property with the same address already exists for the same landlord
    const existingProperty = await Property.findOne({ address });
    if (existingProperty) {
      return res.status(400).json({
        message: "Property with this address already exists ",
      });
    }

    // Create new property
    const newProperty = new Property({
      address,
      landlord: id,
    });

    // Save property to database
    const savedProperty = await newProperty.save();

    res.status(201).json({
      message: "Property added successfully",
      data: {
        id: savedProperty._id,
        address: savedProperty.address,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding property",
      error: error.message,
    });
  }
});

// Get all properties (with populated landlord and)
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("landlord");
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "landlord"
    );
    //   .populate(");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(updatedProperty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
