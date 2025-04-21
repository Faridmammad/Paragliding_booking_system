const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = 5005;

// CORS config
const corsOptions = {
  origin: [
    'http://localhost:3000',                // for local dev
    'https://  paragliding-booking-system.vercel.app'  
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)

  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Root route
app.get('/', (req, res) => {
  res.send('Paragliding Booking API is running 🚀');
});

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
