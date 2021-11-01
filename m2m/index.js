const express = require('express');
const mongoose = require('mongoose');
const logger =require('morgan');
const UserRoute = require('./src/Route/UserRoute');
const CmdRoute = require('./src/Route/CmdRoute');
const ProductRoute = require('./src/Route/ProductRoute');
const AdminRoute = require('./src/Route/AdminRoute');
const passport = require('passport');




const cors = require('cors');
require('dotenv').config();
const app = express();
//db 
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
});

mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});
mongoose.connection.on('error', (err) => {
  console.error(`Failed to connected to the database: ${err}`);
});

/// middleware 
app.use(logger('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

require('./src/config/passport')(passport);


// Route 
app.use('/user',UserRoute);
app.use('/api',ProductRoute);
app.use('/api',CmdRoute);
app.use('/api',AdminRoute);

//////////PORT
const PORT = process.env.PORT || 3002
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})

