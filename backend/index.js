const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoDB = require('./db');

mongoDB();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'auth-token'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Import routes
app.use('/api', require('./routes/createuser'));
app.use('/api', require('./routes/DisplayData'));
app.use('/api', require('./routes/order')); 
app.use('/api', require('./routes/admin'));
app.use('/api/admin', require('./routes/adminAddItem'));
app.use('/api/admin', require('./routes/adminView'));



// Default route
app.get('/', (req, res) => res.send('✅ Server is running!'));

// Start server
app.listen(port, () => console.log(`🌐 Server running at http://localhost:${port}`));

