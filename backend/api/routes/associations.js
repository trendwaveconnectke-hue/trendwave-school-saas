const express = require('express');
const router = express.Router();
const Association = require('../models/Association');

// POST /api/associations/register
router.post('/register', async (req, res) => {
  try {
    const {
      associationName,
      registrationNumber,
      associationType,
      professionalField,
      establishedYear,
      memberCount,
      email,
      phone,
      website,
      address,
      presidentName,
      presidentEmail,
      presidentPhone,
      presidentPosition,
      membershipTypes,
      activities,
      subscriptionPlan
    } = req.body;

    // Basic validation
    if (!associationName || !registrationNumber || !associationType || !email) {
      return res.status(400).json({
        error: 'Missing required fields: associationName, registrationNumber, associationType, and email are required'
      });
    }

    // Check if association already exists
    const existingAssociation = await Association.findOne({
      $or: [
        { registrationNumber },
        { email },
        { associationName }
      ]
    });

    if (existingAssociation) {
      return res.status(409).json({
        error: 'Association already registered with this registration number, email, or name'
      });
    }

    // Generate association ID
    const associationId = `TWCA${Math.floor(1000 + Math.random() * 9000)}`;

    // Create new association
    const association = new Association({
      associationId,
      associationName,
      registrationNumber,
      associationType,
      professionalField,
      establishedYear,
      memberCount,
      email,
      phone,
      website,
      address,
      presidentName,
      presidentEmail,
      presidentPhone,
      presidentPosition: presidentPosition || 'President',
      membershipTypes: membershipTypes || [],
      activities: activities || [],
      subscriptionPlan: subscriptionPlan || 'free',
      status: 'pending'
    });

    await association.save();

    res.status(201).json({
      success: true,
      message: 'Association registered successfully',
      associationId,
      data: {
        associationId,
        associationName,
        email,
        nextSteps: ['Verify your email', 'Complete association profile', 'Add members']
      }
    });

  } catch (error) {
    console.error('Association registration error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

module.exports = router;
