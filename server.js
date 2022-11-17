//import 'dotenv/config';
var cors = require("cors");  
const express = require("express");
const env = require("dotenv");
var bodyParser = require('body-parser');  
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode");


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
app.use('/auth',require("./routes/auth"));
app.use('/qr',require("./routes/qr"));
app.use('/order',require("./routes/order"));
app.use('/seq',require("./routes/order"));
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port 4000!`),
);