// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Apparel Schema
const apparelSchema = new mongoose.Schema({
  type: String,
  brand: String,
  condition: String,
  description: String,
  disposalMethod: String,
  createdAt: { type: Date, default: Date.now },
});

const Apparel = mongoose.model('Apparel', apparelSchema);

// Routes
app.post('/api/apparel', async (req, res) => {
  try {
    const newApparel = new Apparel(req.body);
    await newApparel.save();
    res.status(201).json(newApparel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/apparel', async (req, res) => {
  try {
    const apparels = await Apparel.find().sort({ createdAt: -1 });
    res.json(apparels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});