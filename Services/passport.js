const router = require('express').Router();
const bcrypt=require('bcrypt');
const mysql=require('mysql');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nihar@25*',
    database: 'Volunteer'  //your db name
});

module.exports=function(passport){
  passport.serializeUser(function(user, done) {
  		done(null, user.Email);
      });

      // used to deserialize the user
  passport.deserializeUser(function(id, done) {
  		connection.query("Select * from REGISTER where Email = "+id,function(err,rows){
  			done(err, rows[0]);
  		});
      });

  passport.use(new LocalStrategy({usernameField:'email',passwordField:'password'},function(email,password,done){
    con.query('Select * from REGISTER where Email=?',[email],function(err,rows){
      if(!rows.length){
        return done(null,false,{message:'Email not registered'})
      }
      console.log(password);
      console.log(rows[0].Password);
      bcrypt.compare(password,rows[0].Password,(err,isMatch)=>{
        if(err) throw err;
        console.log(isMatch);
        if(isMatch){
          return done(null,rows[0],{message:'Login successful'});

        }else{
          return done(null,false,{message:'Password mismatch'});
        }
      });
    });




  }));

}
