const router = require('express').Router();
const bcrypt=require('bcrypt');
const mysql=require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nihar@25*',
    database: 'Volunteer'  //your db name
});

router.get('/check',function(req,res){
  let email=req.user.Email;
  con.query("Select * from PROFILE where Email=? and Status IS NOT NULL ",[email],function(err,rows){
    if(!err){
      if(rows.length>0){
        res.json({status:"updated"});
      }
      else{
        res.json({status:"not complete"});
      }
    }
  });
});

router.post('/update',function(req,res){
  let dob=req.body.dob;
  let institution=req.body.institute;
  let district=req.body.district;
  let ph=req.body.ph;
  let url=req.body.image;
  let status=1;
  let email=req.user.email;
  if(dob=== null && institution === null && district === null && ph === null && url===null ){
    res.json({message:"can't update"});
  }
  else{
    con.query("INSERT INTO PROFILE (Dob,institution,District,Ph,ImageU,Status) VALUES(?,?,?,?,?,?)",[dob,institution,district,ph,url,status],function(err,rows){
      if(!err){
        res.json({message:"success"})
      }else{
        console.log(err);
        res.json({message:"error"});
      }

    });
  }
});


router.get('/profile',function(req,res){
  let user=req.user.Email;
  con.query("Select * from PROFILE where Email=?",[email],function(err,rows){
    if(!err){
      res.send(rows[0]);
    }else{
      console.log(err);
      res.json({message:"error"});
    }

  });

});

module.exports=router;