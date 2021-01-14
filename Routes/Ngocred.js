const router = require('express').Router();
const bcrypt=require('bcrypt');
const mysql=require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nihar@25*',
    database: 'Volunteer'  //your db name
});

const { authenticatedOnly } = require('../Middleware/authmid');

// Middlewares
router.use(authenticatedOnly);

router.get('/:type',function(req,res){
  let type=req.params.type;
  let name=req.user.Name;

    con.query("select * from POSTS where Name=? and Type",[name,type],function(err,rows){
      if(!err){
        res.send(rows[0]);
      }else{
        console.log(err);
        res.json({message:"error"});
      }

    });
});

router.get('/uneeds',function(req,res){
  let name=req.user.Name;
  con.query("select * from UNEEDS where Ngoname=? ",[name],function(err,rows){
    if(!err){
      res.send(rows[0]);
    }else{
      console.log(err);
      res.json({message:"error"});
    }

  });

});

router.post('/uneeds',function(req,res){
  let name=req.user.Name;
  let desc=req.body.desc;
  let ph=req.body.ph;

  con.query("INSERT INTO UNEEDS (Ngoname,Description,Ph) VALUES(?,?,?)",[name,desc,ph],function(err,rows){
    if(!err){
      res.send(rows[0]);
    }else{
      console.log(err);
      res.json({message:"error"});
    }

  });
});

router.delete('/uneeds/:id',function(req,res){
  let id=req.params.id;
  con.query("Delete from UNEEDS where ID=? ",[id],function(err,rows){
    if(!err){
      res.send(rows[0]);
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


  con.query("INSERT INTO POSTS (Title,Description,District,Location,Date,Name,Type) VALUES(?,?,?,?,?,?,?)",[title,desc,dist,loc,date,name,type],function(err,rows){
    if(!err){
      res.send(rows[0]);
    }else{
      console.log(err);
      res.json({message:"error"});
    }

  });
});


router.delete('/:type/:id',function(req,res){
  let type=req.params.type;
  let id=req.params.id;

  con.query("Delete from POSTS where ID=? ",[id],function(err,rows){
    if(!err){
      res.send(rows[0]);
    }else{
      console.log(err);
      res.json({message:"error"});
    }

  });

});

router.get('/enrolled',function(res,req){
  let name=req.user.Name;
  con.query('Select * from ENROLLED where Ngoname=?',[name],function(err,rows){
    if(!err){
      res.send(rows[0]);
    }else{
      res.json({message:"error"});
    }
  });
});

router.put('/enrolled/:email/:id',function(res,req){
  let id=req.params.id;
  let email=req.params.email;
  let status=1;
  con.query('UPDATE ENROLLED SET Status=? WHERE ID=? AND Email=?',[status,id,email],function(err,rows){
    if(!err){
      res.send({message:"updated"});
    }else{
      console.log(err);
      res.send({message:"error"});
    }
  });

});
/*
router.get('/:type',function(res,req){
  if (type==='blood'){
    let bg=req.params.bg;
    con.query('SELECT Name,DOB,Sex,District,Ph FROM BLOODATA WHERE BG=? ORDER BY District',[bg],function(err,rows){
      if(!err){
        res.send(rows[0]);
      }else{
        res.json({message:"error"});
      }
    });
  }
});*/


module.exports=router;
