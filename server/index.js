const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5005;

// CORS config
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/paragliding_booking')
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
