const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001 ;

mongoose.connect(
  process.env.MONGO_URL, 
  { useNewUrlParser: true, useUnifiedTopology: true } ,
    ()=>{
      console.log("connected to MongoDB")
    }
)

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
})