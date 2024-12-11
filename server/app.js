const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const timetableRoutes = require('./routes/timetable');
const teacherRoutes = require('./routes/teacher'); 

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/timetable', timetableRoutes);
app.use('/api/teachers', teacherRoutes); 


app.get("/ping",(req,res)=>{
    console.log("pong");
    res.send("pong");
    
})

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});