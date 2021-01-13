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

    con.query("select * from POSTS where Name=? and Type=?",[name,type],function(err,rows,fields){
      if(!err){

        res.json({result:rows});
      }else{
        console.log(err);
        res.json({message:"error"});
      }

    });



});


router.get('/ug/urgent',function(req,res){
  let name=req.user.Name;
  con.query("Select * from UNEEDS where Ngoname=?",[name],function(err,rows){
    if(!err){
      res.send(rows);
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
      res.json({result:rows[0]});
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
      res.json({result:rows[0]});
    }else{
      console.log(err);
      res.json({message:"error"});
    }

  });

});



router.post('/:type',function(req,res){
  let type=req.params.type;
  let name=req.user.Name;
  let title=req.body.title;
  let desc=req.body.desc;
  let dist=req.body.dist;
  let loc=req.body.loc;
  let date=req.body.dat;


  con.query("INSERT INTO POSTS (Title,Description,District,Location,Date,Name,Type) VALUES(?,?,?,?,?,?,?)",[title,desc,dist,loc,date,name,type],function(err,rows){
    if(!err){
      res.json({result:rows[0]});
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
      res.json({result:rows[0]});
    }else{
      console.log(err);
      res.json({message:"error"});
    }

  });

});





router.get('/enrolled/:id',function(req,res){
  let id=req.params.id;
  let name=req.user.Name;

  con.query('Select * from ENROLLED e,PROFILE p where e.Email=p.Email and Ngoname=? and ID=?',[name,id],function(err,rows){
    if(!err){
      res.json({result:rows});
    }else{
      res.json({message:"error"});
    }
  });
});

router.put('/enrolled/:email/:id',function(req,res){
  let id=req.params.id;
  let email=req.params.email;
  let status=1;
  con.query('UPDATE ENROLLED SET Status=? WHERE ID=? AND Email=?',[status,id,email],function(err,rows){
    if(!err){
      res.json({message:"updated"});
    }else{
      console.log(err);
      res.json({message:"error"});
    }
  });

});
















module.exports=router;
