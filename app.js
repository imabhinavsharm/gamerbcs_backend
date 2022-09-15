const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());

app.set("view engine","ejs")

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get("/home",(req,res)=>{
  res.render("./home");
})

module.exports = app;