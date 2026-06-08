const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware configuration
app.use(express.json());
app.use(cors()); 

// Connect to MongoDB Database
mongoose.connect('mongodb://127.0.0.1:27017/taskmanager')
  .then(() => console.log('MongoDB Database Connected Successfully!'))
  .catch((err) => console.log('Database Connection Error Log: ', err.message));

// Routes Configuration
app.use('/api/auth', require('./routes/authRoutes'));

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log('Server is running successfully on port: 5000');
});