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
const taskRouter = require('./routes/taskRoute');

//Use Route
app.use('/task', taskRouter);

// 404 Route (Catch-All)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Page Not Found' });
});

//port address details
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});