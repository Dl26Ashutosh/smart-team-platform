const UserProfile = require("../models/userProfile.model");

// CREATE USER PROFILE
exports.createProfile = async (req, res) => {
  try {
    const { userId, firstName, lastName, email } = req.body;

    if (!userId || !firstName || !lastName || !email) {
      return res.status(400).json({
        message: "userId, firstName, lastName, and email are required",
      });
    }

    const profileExists = await UserProfile.findOne({ userId });
    if (profileExists) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = await UserProfile.create({
      userId,
      firstName,
      lastName,
      email,
    });

    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET USER PROFILE
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await UserProfile.findOne({ userId }).populate("teams");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE USER PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const profiles = await UserProfile.find({ isActive: true })
      .limit(limit)
      .skip(skip)
      .populate("teams");

    const total = await UserProfile.countDocuments({ isActive: true });

    res.json({
      data: profiles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE USER PROFILE
exports.deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      { isActive: false },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ message: "User deactivated", profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
