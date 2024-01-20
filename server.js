const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser if not already imported
const cors = require('cors')
const app = express();
const mongoose = require('mongoose')

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/task', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check for MongoDB connection success
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const appRoutes = require('./routes/app'); // Adjust the path based on your project structure

// Middleware for parsing JSON
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.json());

app.use(cors())

// Mount the routes defined in app.js under the path '/api'
app.use('/', appRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
