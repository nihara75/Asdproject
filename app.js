const express=require('express');
const mysql=require('mysql');
const bodyparser=require('body-parser');
const fileUpload=require('express-fileupload');
const path=require('path');
const session=require('express-session');
const app=express();
const keys = require('./config');
const authUserRoutes = require('./Routes/authenticate.js');
const postroutes = require('./Routes/post.js');
const ngoroutes = require('./Routes/Ngocred.js');

app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
/*app.use(app.router);
authUserRoutes.initialize(app);*/
app.use('/auth', authUserRoutes);
app.use('/feed', postroutes);
app.use('/ngo', ngoroutes);

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nihar@25*',
    database: 'Volunteer'  //your db name
});


con.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});


app.listen(6000,function(){
  console.log("App running on port 3000");
});
