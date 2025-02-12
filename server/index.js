const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

//import conections
const connection = require('./DB');
//Start Connection
connection();

//import Routes
// const userRoute = require('./routes/user');
// const demoRoute = require('./routes/demo');
// const branchRoute = require('./routes/branchRoute');
// const agentRoute = require('./routes/agentRoute');

//Use Route
// app.use('/api', userRoute);
// app.use('/demo', demoRoute);
// app.use('/api/branch', branchRoute);
// app.use('/api/agent', agentRoute);

// 404 Route (Catch-All)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Page Not Found' });
});

//port address details
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});