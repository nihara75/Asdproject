const router = require('express').Router();



router.get('/post',function(req,res){
  const place=req.query.place;//in case of searching

});

router.get('/post/:id',function(req,res){

});

router.post('/post/compose',function(req,res){
  //need to provide content for each post.
});

router.delete('/post/:id',function(req,res){

});

router.delete('/post',function(req,res){
  //deleting expired records and redirecting it to feed
  res.redirect('/feed/post'); 
});






module.exports=router;
