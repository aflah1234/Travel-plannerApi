const express = require('express');
const mongoose = require('mongoose');
const Plan = require('../models/plan');
const router = express.Router();

router.get('/plans', async (req, res) => {
    try {
      const plans = await Plan.find();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/plans/:id', async (req, res) => {
    try {
      const plan = await Plan.findById(req.params.id);
      if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
      }
      res.json(plan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.post('/plans', async (req, res) => {
    const { destination, startDate, endDate, activities } = req.body;
  
    if (!destination || !startDate || !endDate) {
      return res.status(400).json({
        error: 'Missing required fields: destination, startDate, and endDate are required.',
      });
    }
  
    try {
      const plan = new Plan({ destination, startDate, endDate, activities });
      await plan.save();
      res.status(201).json(plan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.patch('/plans/:id', async (req, res) => {
    try {
      const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true, 
      });
      if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
      }
      res.json(plan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

  router.delete('/plans/:id', async (req, res) => {
    try {
      const plan = await Plan.findByIdAndDelete(req.params.id);
      if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
      }
      res.json({ message: 'Plan deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  module.exports = router;