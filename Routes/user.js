const router = require('express').Router();
const bcrypt=require('bcrypt');
const mysql=require('mysql');
//const Sequilize =  require('sequelize');
//const Op = Sequilize.Op;
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

router.get('/enrolled',function(req,res){
  let email=req.user.email;
  con.query('select * from ENROLLED where Email=$1',[email],function(err,result){
    if(!err){
      res.send(result.rows);
    }
    else{
      console.log(err);
    }

  });
});

router.get('/uneeds',function(req,res){
  let email=req.user.email;
  con.query('select * from UNEEDS',function(err,result){
    if(!err){
      res.send(result.rows);
    }
    else{
      console.log(err);
    }

  });
});


router.get('/posts/:type',function(req,res){
  let type=req.params.type;
  con.query('select * from POSTS where Type=$1',[type],function(err,result){
    if(!err){
      res.send(result.rows);
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
  let email=req.user.email;
  let title=req.params.title;
  let type=req.query.type;
  let status=0;
  console.log(type);
  console.log(title);
  console.log(name);
  if(type==='blood'){
    con.query('INSERT INTO BLOODDATA(Name,BG,DOB,Sex,District,Ph,Status) VALUES($1,$2,$3,$4,$5,$6,$7)',[name,bg,dob,sex,dist,ph,status],function(err,rows){
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
    con.query('INSERT INTO ENROLLED VALUES($1,$2,$3,$4,$5)',[id,name,email,title,status],function(err,rows){
      if(!err){
        res.json({message:"success"});
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

  con.query('SELECT * FROM POSTS WHERE Description=$1 OR District=$2'[term, dist], function(err,result){
      if(!err){
      res.send(result.rows);
    }
    else{
      console.log(err);
      res.send({message:"error"});
    }
  });
});

router.get('/uneedsearch', function(req, res){
  let term = req.body.term;

  con.query('SELECT * FROM UNEEDS WHERE Description=$1'[term], function(err,result){
      if(!err){
      res.send(result.rows);
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
