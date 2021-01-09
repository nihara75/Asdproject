const router = require('express').Router();
const bcrypt=require('bcrypt');
const mysql=require('mysql');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const { unauthenticatedOnly } = require('../Middleware/authmid.js');

const saltRounds = 10;
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nihar@25*',
    database: 'Volunteer'  //your db name
});
const logged=false;

router.post('/Login',unauthenticatedOnly,passport.authenticate('local',{failureRedirect: '/auth/loginFailure'}),function(req,res){
/*let email=req.body.email;
let password=req.body.password;*/
return res.send({ success: true, user: req.user })


});


router.get('/loginFailure', (req, res) => {
    res.json({ success: false, user: false, message: 'User login failed'});
});

router.post('/Signup',unauthenticatedOnly,async function(req,res){

  const {name,role,email}=req.body;
  let password=req.body.password;
  let confirm=req.body.confirm;



if(confirm==password){

 await bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
     password=hash;
     con.query("INSERT INTO REGISTER VALUES(?,?,?,?)",[name,role,email,password],function(err,result){
       if(!err){
         res.json({success:true});
       }else {

           console.log(err);

       }
     });
   });}
   else{
     res.send({message:"Password not matching"});
   }



});


router.get('/logout', (req, res) => {
    req.logout();
    res.json({ logged: false, message: 'Logout successful' });
    res.redirect("/");
});


module.exports = router;
