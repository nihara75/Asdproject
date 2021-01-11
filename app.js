const express=require('express');
const mysql=require('mysql');
const bodyparser=require('body-parser');
const fileUpload=require('express-fileupload');
const path=require('path');
const session=require('express-session');
const app=express();
const keys = require('./config');
const passport=require('passport');

const authUserRoutes = require('./Routes/authenticate.js');
const userroutes = require('./Routes/user.js');
const update=require('./Routes/Update.js');
const ngoroutes = require('./Routes/Ngocred.js');
require('./Services/passport.js')(passport);

app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(session({
    secret: 'hello there',
    resave: true, saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

/*app.use(app.router);
authUserRoutes.initialize(app);*/
app.use('/auth', authUserRoutes);
app.use('/user', userroutes);
app.use('/up', update);
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


app.listen(11000,function(){
  console.log("App running on port 3000");
});
