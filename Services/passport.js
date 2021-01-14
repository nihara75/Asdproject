const router = require('express').Router();
const bcrypt=require('bcrypt');
const mysql=require('mysql');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
/*const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nihar@25*',
    database: 'Volunteer'  //your db name
});*/
const Pool = require('pg').Pool
const con = new Pool({
  user: 'zwqbogojihtevw',
  host: 'ec2-52-22-135-159.compute-1.amazonaws.com',
  database: 'd4dnnion0o8cnp',
  password: '986adc236b287eb9707dcde80bc638768d5e655f2af7288204875c35162241f4',
  port: 5432,
  ssl:{
    rejectUnauthorized:false,
    require:true,
  },
})

module.exports=function(passport){
  passport.serializeUser(function(user, done) {

  		done(null, user.Email);
      });

      // used to deserialize the user
  passport.deserializeUser(function(id, done) {
  		con.query("Select * from REGISTER where Email = $1",[id],function(err,result){


  			done(err, result.rows[0]);
  		});
      });

  passport.use(new LocalStrategy({usernameField:'email',passwordField:'password'},function(email,password,done){
    con.query('Select * from REGISTER where Email=$1',[email],function(err,result){


      if(!result.rows.length){
        return done(null,false,{message:'Email not registered'})
      }
      

      bcrypt.compare(password,result.rows[0].Password,(err,isMatch)=>{
        if(err) throw err;
        console.log(isMatch);
        if(isMatch){
          return done(null,result.rows[0],{message:'Login successful'});

        }else{
          return done(null,false,{message:'Password mismatch'});
        }
      });
    });




  }));

}
