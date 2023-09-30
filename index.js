const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('./config/database');
const homeRoutes = require('./routes/home');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use(cors({credentials: true, origin: 'http://127.0.0.1:5173'}));   // http://127.0.0.1:5173/ is the host of our react app
// Add middleware to enable CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173'); // Replace with the origin of your client-side application
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
//   next();
// });
app.use(cookieParser());

app.use(express.static('dist')); // this is not JSX in the original file, it is just what was compiled at a point in time. If we make changes in our App.jsx this won't appear in the Express version of the application. So, we need to rebuild the app, and replace the current dist in the Express app with the new dist. 

app.use('/uploads', express.static(__dirname + '/uploads/'));  // serving static images from our uploads folder

// app.use(express.static(path.join(__dirname, './client/dist')));
// app.get('*', (_, res) => {
//   res.sendFile(path.join(__dirname), './client/dist/index.html'), (err) => {res.status(500).send(err)};
// })

app.use('/home', homeRoutes);
app.use('/post', postRoutes);
app.use('/user', userRoutes); 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${4000}.`);
})

