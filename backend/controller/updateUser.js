const User = require("../models/User");

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from request parameters
    const updates = req.body; // Get the updated fields from the request body

    // Validate if `id` is provided
    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "User ID is required",
      });
    }

    // Find the user by ID and update with new data
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules defined in the schema are applied
    });

    // If user not found
    if (!updatedUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Error updating user:", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
