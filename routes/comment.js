var express   =require("express"),
    Campgorunds=require("../models/campground"),
    Comment =require("../models/comment"),
     middleware=require("../middleware");


var router   =express.Router({mergeParams:true});
    
//====================
//comments route
//====================
router.get("/new",middleware.isLoggedin,function(req, res) {
    Campgorunds.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
                res.render("comments/new",{campground: campground});
        }
    });
});
//post the comments
router.post("/",middleware.isLoggedin,function(req,res){
    Campgorunds.findById(req.params.id,function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campground");
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","Something went wrong");
                }
                else{
                    //add username and id
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    //save
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                     req.flash("succes","Comment added successfully");
                    res.redirect("/campground/"+campground._id);
                }
            });
        }
    });
});
//edit comment
router.get("/:comment_id/edit",middleware.checkLoginOwnerComment,function(req,res){
    Campgorunds.findById(req.params.id,function(err, foundcampground) {
        if(err || !foundcampground ){
            req.flash("error","No campground found");
            return res.redirect("back");
        }
    Comment.findById(req.params.comment_id,function(err, foundcomment) {
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id: req.params.id ,comment: foundcomment});         
        }
    });
    });
});
//update comment
router.put("/:comment_id",middleware.checkLoginOwnerComment,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatecomment){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("succes","Comment added successfully");
            res.redirect("/campground/"+req.params.id);
        }
    });
});
router.delete("/:comment_id",middleware.checkLoginOwnerComment,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err,deletecomment){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("succes","Comment is deleted ");
            res.redirect("back");
        }
    });
});

module.exports=router;