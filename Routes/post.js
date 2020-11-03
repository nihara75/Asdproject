const router = require('express').Router();
const mysql=require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nihar@25*',
    database: 'Volunteer'  //your db name
});


router.get('/post',function(req,res){
  const place=req.query.place;//in case of searching
  con.query("SELECT ID,NAME,HEAD,CONTENT,DATET FROM POST ORDER BY ID DESC",function(err,result){
    if(err){
      res.send({message:"Mistake in the query"});
    }else{
      if(result.length>0){
        res.send(result);
        console.log(result);
      }else{
        res.send({message:"null set"});
      }
    }
  });

});

router.get('/post/:id',function(req,res){
  const id=req.params.id;
  con.query("SELECT NAME,HEAD,CONTENT,DATET FROM POST WHERE ID=?",[id],function(err,result){
    if(err){
      res.send({message:"Mistake in the query"});
    }else{
      if(result.length>0){
        res.send(result);
        console.log(result);
      }else{
        res.send({message:"null set"});
      }
    }
  });

});

router.post('/post/compose',function(req,res){
  //need to provide content for each post.
  const name=req.body.name;
  const head=req.body.head;
  const content=req.body.content;
  const date=req.body.date;
  con.query("INSERT INTO POST (NAME,HEAD,CONTENT,DATE) VALUES(?,?,?,?) ",[name,head,content,date],function(err,result){
    if(err){
      res.send({message:"Mistake in the query"});
    }else{
      if(result.length>0){
        res.send({success:true});
        console.log(result);
      }else{
        res.send({message:"null set"});
      }
    }
  });
});

router.delete('/post/:id',function(req,res){
  const id=req.params.id;
  con.query("DELETE FROM POST WHERE ID=? ",[id],function(err,result){
    if(err){
      res.send({message:"Mistake in the query"});
    }else{
      if(result.length>0){
        res.send(result);
        console.log(result);
      }else{
        res.send({message:"null set"});
      }
    }
  });


});

router.delete('/postd',function(req,res){
  //deleting expired records and redirecting it to feed
/*  delete from deleteRowsOlderThan5Demo
   -> where datediff(now(), deleteRowsOlderThan5Demo.Post_Date) > 5;*/
   con.query("DELETE FROM POST WHERE datediff(now(),POST.DATET) > 10",function(err,result){
     if(err){
       res.send({message:"Mistake in the query"});
     }else{
       if(result.length>0){

         console.log(result);
       }else{
         res.send({message:"null set"});
       }
     }
   });
  res.redirect('/feed/post');
});






module.exports=router;
