const router = require('express').Router();
const bcrypt=require('bcrypt');
const saltRounds = 10;

const logged=false;

router.post('/Login',function(req,res){
//reference code
  /*const username=req.body.username;
  const password=req.body.password;

  User.findOne({email:username},function(err,founduser){

    if(err)
    {
      console.log(err);
    }
    else{
      if(founduser){
        bcrypt.compare(password, founduser.password, function(err, result) {
          if(result===true)
          {
            res.render("secrets"); //render feed page instead

            res.send() a json object with logged value
          }
});


      }
    }
  });*/

});



router.post('/Signup',function(req,res){

  const {Name,email,designation,address,ph}=req.body;
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const password=hash;
    //insert row into register table;
});

});


router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true, message: 'Logout successful' });
    res.redirect("/");
});


module.exports = router;
