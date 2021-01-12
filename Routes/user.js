const router = require('express').Router();
const bcrypt=require('bcrypt');
const mysql=require('mysql');
const Sequilize =  require('sequelize');
const Op = Sequilize.Op;
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
      res.send(rows[0]);
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
      res.send(rows[0]);
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
      res.send(rows[0]);
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
  if(type===null){
    con.query('INSERT INTO ENROLLED VALUES(?,?,?,?,?)',[id,name,email,title,status],function(err,rows){
      if(!err){
        res.send(rows[0]);
      }
      else{
        console.log(err);
        res.send({message:"error"});
      }

    });
  }else{

  }


});

//Search for keywords and location
router.get('/search', (req, res)=> {
  let {term} = req.query;
  term = term.toLowerCase();

  con.findAll({ where: { Description: {[Op.like]: '%' + term + '%'} } })
    .then(posts => res.render('posts', {posts} ))
    .catch(err => console.log(err));
});


module.exports=router;
