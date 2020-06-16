var express=require("express"),
 Campgorunds=require("../models/campground"),
 middleware=require("../middleware");
 
var router=express.Router();
//Show the campgrounds from db
router.get("/",function(req,res){
    Campgorunds.find({},function(err,allCampgrounds){
       if(err){
           console.log(err);
       }else
       {
             res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});  
       }
    });
});

//make the new campground to the page and db
router.post("/",middleware.isLoggedin,function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var desc=req.body.discription;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground={name: name, price: price, image: image, discription:desc ,author:author};
    // campgrounds.push(newCampground);
    Campgorunds.create(newCampground,function(err,newlycampgrounds){
        if(err){
            console.log(err);
        }
        else{
                res.redirect("/campground"); 
        }
    });
});

//for adding new campground
router.get("/new",middleware.isLoggedin,function(req, res) {
    res.render("campgrounds/new");
});

//show details and id
router.get("/:id",function(req,res){
    Campgorunds.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err|| !foundCampground){
            req.flash("error","Campground not found");
            res.redirect("back");
        }
        else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campgrounds:foundCampground});      
        }
    });
});
//edit the campground
router.get("/:id/edit",middleware.checkLoginOwner,function(req, res) {
    Campgorunds.findById(req.params.id,function(err,foundCampground){
         req.flash("succes","Editted Campgorund successfully");
    res.render("campgrounds/edit",{campground:foundCampground});
    });
});

//update the campground
router.put("/:id",middleware.checkLoginOwner,function(req,res){
    //find and update
    Campgorunds.findByIdAndUpdate(req.params.id,req.body.campground,function(err,update){
        res.redirect("/campground/"+req.params.id);
    });
});
//destroy campground
router.delete("/:id",middleware.checkLoginOwner,function(req,res){
    Campgorunds.findByIdAndRemove(req.params.id,function(err){
             req.flash("succes","Deleted successfully");
            res.redirect("/campground");
    });
});


module.exports=router;