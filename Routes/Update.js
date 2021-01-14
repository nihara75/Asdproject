const router = require('express').Router();
const bcrypt=require('bcrypt');
const mysql=require('mysql');
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

const { authenticatedOnly } = require('../Middleware/authmid');

// Middlewares
router.use(authenticatedOnly);
router.get('/check',function(req,res){

  let email=req.user.Email;
  con.query("Select * from PROFILE where Email=$1 and Status IS NOT NULL ",[email],function(err,result){
    if(!err){
      if(result.rows.length>0){
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
  let email=req.user.Email;
  if(dob=== null && institution === null && district === null && ph === null && url===null ){
    res.json({message:"can't update"});
  }
  else{
    con.query("UPDATE PROFILE SET Dob=$1,Institution=$2,District=$3,Ph=$4,ImageU=$5,Status=$6 WHERE Email=$7",[dob,institution,district,ph,url,status,email],function(err,rows){
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
  con.query("Select * from PROFILE where Email=$1",[user],function(err,result){
    if(!err){
      res.send(result.rows);
    }else{
      console.log(err);
      res.json({message:"error"});
    }

  });

});

module.exports=router;
