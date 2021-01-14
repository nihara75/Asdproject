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

router.get('/:type',function(req,res){
  let type=req.params.type;
  let name=req.user.name;

    con.query("select * from POSTS where Name=$1 and Type=$2",[name,type],function(err,result){
      if(!err){

        res.send(result.rows);
      }else{
        console.log(err);
        res.json({message:"error"});
      }

    });
});


router.get('/ug/urgent',function(req,res){
  let name=req.user.name;
  con.query("Select * from UNEEDS where Ngoname=$1",[name],function(err,result){
    if(!err){
      res.send(result.rows);
    }else{
      console.log(err);
      res.json({message:"error"});
    }

  });

});



router.post('/uneeds',function(req,res){
  let name=req.user.name;
  let desc=req.body.desc;
  let ph=req.body.ph;

  con.query("INSERT INTO UNEEDS (Ngoname,Description,Ph) VALUES($1,$2,$3)",[name,desc,ph],function(err,rows){
    if(!err){
      res.json({message:"success"});
    }else{
      console.log(err);
      res.json({message:"error"});
    }

  });
});



router.delete('/uneeds/:id',function(req,res){
  let id=req.params.id;
  con.query("Delete from UNEEDS where ID=$1 ",[id],function(err,rows){
    if(!err){
      res.json({message:"success"});
    }else{
      console.log(err);
      res.json({message:"error"});
    }

  });

});



router.post('/:type',function(req,res){
  let type=req.params.type;
  let name=req.user.name;
  let title=req.body.title;
  let desc=req.body.desc;
  let dist=req.body.dist;
  let loc=req.body.loc;
  let date=req.body.dat;


  con.query("INSERT INTO POSTS (Title,Description,District,Location,Date,Name,Type) VALUES($1,$2,$3,$4,$5,$6,$7)",[title,desc,dist,loc,date,name,type],function(err,rows){
    if(!err){
      res.json({message:"success"});
    }else{
      console.log(err);
      res.json({message:"error"});
    }

  });
});




router.delete('/:type/:id',function(req,res){
  let type=req.params.type;
  let id=req.params.id;

  con.query("Delete from POSTS where ID=$1 ",[id],function(err,rows){
    if(!err){
      res.json({result:rows[0]});
    }else{
      console.log(err);
      res.json({message:"error"});
    }

  });

});


router.get('/enrolled/:id',function(req,res){
  let id=req.params.id;
  let name=req.user.name;

  con.query('Select * from ENROLLED e,PROFILE p where e.Email=p.Email and Ngoname=$1 and ID=$2',[name,id],function(err,result){
    if(!err){
      res.send(result.rows);
    }else{
      res.json({message:"error"});
    }
  });
});

router.put('/enrolled/:email/:id',function(req,res){
  let id=req.params.id;
  let email=req.params.email;
  let status=1;
  con.query('UPDATE ENROLLED SET Status=$1 WHERE ID=$2 AND Email=$3',[status,id,email],function(err,rows){
    if(!err){
      res.json({message:"updated"});
    }else{
      console.log(err);
      res.json({message:"error"});
    }
  });

});

router.get('/:type',function(res,req){
  if (type==='blood'){
    let bg=req.body.bg;
    con.query('SELECT Name,DOB,Sex,District,Ph FROM BLOODATA WHERE BG=$1 ORDER BY District',[bg],function(err,result){
      if(!err){
        res.send(result.rows);
      }else{
        res.json({message:"error"});
      }
    });
  }
});


module.exports=router;
