const express = require("express");
const cors = require("cors");

var bodyParser = require('body-parser');  
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode");
const sseRoute = require("./routes/sse");


var urlencodedParser = bodyParser.urlencoded({ extended: false })  
// app.use(express.static('public'));  
const app = express();
connectDB()

app.use(express.json({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  console.log('res is ',res)
  res.send('Hello World!');
});
app.post('/post',(req,res)=>{
    res.json({success:true})
})
app.use(function (req, res, next) {
  res.flush = function () { /* Do nothing */ }
  next();
})
app.use(sseRoute);
app.use('/auth',require("./routes/auth"));
app.use('/table',require("./routes/table"));

app.use('/qr',require("./routes/qr"));
app.use('/order',require("./routes/order"));
app.use('/seq',require("./routes/order"));
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port`, process.env.PORT),
);