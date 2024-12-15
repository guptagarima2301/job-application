const User = require("../models/User");
exports.getUser = async (req, res) => {
	try {
        const { status } = req.query; // Read the 'status' query parameter

        // Build a dynamic filter object
        const filter = {};
        if (status) {
            filter.status = status;
        }

        const userData = await User.find(filter); // Apply filter
        res.json({ success: true, data: userData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};