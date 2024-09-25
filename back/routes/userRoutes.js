

import express from 'express';
const router = express.Router();

import User from '../models/User.js';
import Address from '../models/Address.js';


// // Register user with email
// router.post('/register', async (req, res) => {
//   const { email } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: 'User already registered with this email' });
//     }

//     const newUser = new User({ email });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Submit name and address for the registered user
// router.post('/submit-details', async (req, res) => {
//   const { email, name, address } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     // Create a new address for the user
//     const newAddress = new Address({
//       userId: user._id,
//       name,
//       address,
//     });
//     await newAddress.save();

//     res.status(200).json({ message: 'Details saved successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get addresses for the registered user
// router.get('/addresses', async (req, res) => {
//   const { email } = req.query; // Get email from query parameters

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     // Find all addresses for the user
//     const addresses = await Address.find({ userId: user._id });

//     res.status(200).json(addresses);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// Register user with email
router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User already exists, fetch their addresses
      const addresses = await Address.find({ userId: existingUser._id });
      return res.status(200).json({ message: 'User already exists', addresses });
    }

    // Create new user if doesn't exist
    const newUser = new User({ email });
    await newUser.save();

    // Fetch addresses for the newly registered user (none at this point)
    res.status(201).json({ message: 'User registered successfully', addresses: [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit name and address for the registered user
router.post('/submit-details', async (req, res) => {
  const { email, name, address } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Create a new address for the user
    const newAddress = new Address({
      userId: user._id,
      name,
      address,
    });
    await newAddress.save();

    // Fetch all addresses after saving a new one
    const addresses = await Address.find({ userId: user._id });

    res.status(200).json({ message: 'Details saved successfully', addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get addresses for the registered user
router.get('/addresses', async (req, res) => {
  const { email } = req.query; // Get email from query parameters

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Find all addresses for the user
    const addresses = await Address.find({ userId: user._id });

    res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
