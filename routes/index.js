var express   =require("express"),
    passport  =require("passport"),
    User      =require("../models/user");
var router=express.Router();
//Home page 
router.get("/",function(req,res){
   res.render("landing"); 
});
//=====================
//Auth routes
//======================
//sign up
router.get("/register",function(req, res) {
    res.render("register");
});
//logic to find user exist or not
router.post("/register",function(req, res) {
var newUser=new User({username:req.body.username});
   User.register(newUser,req.body.password,function(err,user){
       if(err){
           req.flash("error",err.message);
           return res.render("register");
       }
       else{
           passport.authenticate("local")(req,res,function () {
                req.flash("succes","Welcome to YelpCamp "+user.username);
               res.redirect("/campground");
           })
       }
   }) 
});

//login
router.get("/login",function(req, res) {
    res.render("login");
});
//show users yelp-campp data
//login logic
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campground",
    failureRedirect:"/login"
}),function(req, res) {
    
});
//logout
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("succes","Succesfully Logout");
    res.redirect("/");
});
//middleware
//Check login user before comments
function isLoggedin (req ,res , next){
    if(req.isAuthenticated()){
        return next();
    }
    else
    {
        res.redirect("/login");
    }
}
module.exports=router;