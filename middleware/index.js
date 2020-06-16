var middlewareObj={},
 Campgorunds=require("../models/campground"),
 Comment =require("../models/comment");

middlewareObj.checkLoginOwnerComment=function (req,res,next){
    if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err || !foundComment){
            req.flash("error","comment not found")
            res.redirect("back");
        }else{
            //does user own the campground?
            if(foundComment.author.id.equals(req.user._id)){//mongoose object to sting
            next();
            
        }else{
            req.flash("error","You don't have permission to do that!");
            res.redirect("back");
        }}
    });
    }else{
        req.flash("error","You need to be login to do that!");
      res.redirect("back");
    }
}
middlewareObj.checkLoginOwner=function (req,res,next){
    if(req.isAuthenticated()){
    Campgorunds.findById(req.params.id,function(err,foundCampground){
        if(err || !foundCampground){
            req.flash("error","Campgorund not found");
            res.redirect("back");
        }else{
            //does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)){//mongoose object to sting
            next();
            
        }else{
            req.flash("error","You don't have permission to do that!");
            res.redirect("back");
        }}
    });
    }else{
        req.flash("error","You need to be login to do that!");
        res.redirect("back");
    }
}
middlewareObj.isLoggedin=function (req ,res , next){
    if(req.isAuthenticated()){
        return next();
    }
    else
    { 
        req.flash("error","You need to be login to do that!");
        res.redirect("/login");
    }
}
module.exports=middlewareObj;