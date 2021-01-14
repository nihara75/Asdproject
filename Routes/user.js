const router = require('express').Router();
const bcrypt=require('bcrypt');
const mysql=require('mysql');
//const Sequilize =  require('sequelize');
//const Op = Sequilize.Op;
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nihar@25*',
    database: 'Volunteer'  //your db name
});

const { authenticatedOnly } = require('../Middleware/authmid');

// Middlewares
router.use(authenticatedOnly);

router.get('/enrolled',function(req,res){
  let email=req.user.Email;
  con.query('select * from ENROLLED where Email=?',[email],function(err,rows){
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }

  });
});

router.get('/uneeds',function(req,res){
  let email=req.user.Email;
  con.query('select * from UNEEDS',function(err,rows){
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }

  });
});


router.get('/posts/:type',function(req,res){
  let type=req.params.type;
  con.query('select * from POSTS where Type=?',[type],function(err,rows){
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
      res.send({message:"error"});
    }

  });
});


router.post('/enrolled/:title/:name/:id',function(req,res){
  let id=req.params.id;
  let name=req.params.name;
  let email=req.user.Email;
  let title=req.params.title;
  let type=req.query.type;
  let status=0;
  console.log(type);
  console.log(title);
  console.log(name);
  if(type==='blood'){
    con.query('INSERT INTO BLOODDATA(Name,BG,DOB,Sex,District,Ph,Status) VALUES(?,?,?,?,?,?,?)',[name,bg,dob,sex,dist,ph,status],function(err,rows){
      if(!err){
        res.send(rows[0]);
      }
      else{
        console.log(err);
        res.send({message:"error"});
      }
    });
  }
  else{
    con.query('INSERT INTO ENROLLED VALUES(?,?,?,?,?)',[id,name,email,title,status],function(err,rows){
      if(!err){
        res.send(rows);
      }
      else{
        console.log(err);
        res.send({message:"error"});
      }

    });}});

//Search for keywords and location
router.get('/postsearch', function(req, res){
  let term = req.body.term;
  let dist = req.body.dist;

  con.query('SELECT * FROM POSTS WHERE Description=? OR District=?'[term, dist], function(err,rows){
      if(!err){
      res.send(rows[0]);
    }
    else{
      console.log(err);
      res.send({message:"error"});
    }
  });
});

router.get('/uneedsearch', function(req, res){
  let term = req.body.term;

  con.query('SELECT * FROM UNEEDS WHERE Description=?'[term], function(err,rows){
      if(!err){
      res.send(rows[0]);
    }
    else{
      console.log(err);
      res.send({message:"error"});
    }
  });
});

  //con.findAll({ where: { Description: {[Op.like]: '%' + term + '%'} } })
  //  .then(posts => res.render('posts', {posts} ))
  //  .catch(err => console.log(err));
//});


module.exports=router;
