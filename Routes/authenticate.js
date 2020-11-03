const router = require('express').Router();
const bcrypt=require('bcrypt');
const mysql=require('mysql');
const saltRounds = 10;
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nihar@25*',
    database: 'Volunteer'  //your db name
});
const logged=false;

router.post('/Login',function(req,res){
let name=req.body.name;
let password=req.body.password;
con.query("SELECT NAME,PASSWORD FROM REGISTER WHERE NAME=? AND PASSWORD=?",[name,password],function(err,result){
  if(err){
    res.send({message:"error with the query"});
  }
  else{
    if(result.length>0){
      res.send({logged:true});

    }else{
      res.send({message:"Username and password mismatch!"});
      console.log(result.length);
    }

  }

});

});



router.post('/Signup',function(req,res){

  const {name,email,designation}=req.body;
  let password=req.body.password;
  let confirm=req.body.confirm;



if(confirm==password){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
     password=hash;
});
  con.query("INSERT INTO REGISTER VALUES(?,?,?,?)",[name,email,password,designation],function(err,result){
    if(!err){
      res.json({success:true});
    }else {
      {
        console.log(err);
      }
    }
  });
}else{
  res.send({message:"Password not matching"});
}

});


router.get('/logout', (req, res) => {
    req.logout();
    res.json({ logged: false, message: 'Logout successful' });
    res.redirect("/");
});


module.exports = router;
