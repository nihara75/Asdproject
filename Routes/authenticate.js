const router = require('express').Router();
const bcrypt=require('bcrypt');
const mysql=require('mysql');
const Pool = require('pg').Pool
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const { unauthenticatedOnly } = require('../Middleware/authmid.js');

const saltRounds = 10;
/*const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nihar@25*',
    database: 'Volunteer'  //your db name
});
const logged=false;*/

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

router.post('/Login',unauthenticatedOnly,passport.authenticate('local',{failureRedirect: '/auth/loginFailure'}),function(req,res){
/*let email=req.body.email;
let password=req.body.password;*/
 res.send({ success: true, user: req.user })


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
     con.query("INSERT INTO REGISTER VALUES($1,$2,$3,$4)",[name,role,email,password],function(err,result){
       if(!err){
         res.json({success:true});
         con.query("INSERT INTO PROFILE (Email,Name) VALUES($1,$2)",[email,name],(err,rows)=>{
           if(!err)
           {
             console.log('success');
           }
         });
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

});


module.exports = router;
