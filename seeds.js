var mongoose=require("mongoose");
var Campgorunds=require("./models/campground");
var Comment=require("./models/comment");

var data=[
    {
        name:"Campfire",
        image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        discription:"I love campfire at evening"
    },
    {
        name:"Mountains",
        image:"https://images.unsplash.com/photo-1590122401646-5534a84afa13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80",
        discription:"I love tracking on mountains"
    },
    {
        name:"Waterfall",
        image:"https://images.unsplash.com/photo-1477581265664-b1e27c6731a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        discription:"I love to here sounds of running and falling water"
    }
]
function seedDB(){
    //remove old campgrounds
    Campgorunds.remove({},function(err){
        if(err){
            console.log("error");
        }
        else{
            console.log("remove the data");
            //add new campgrounds
            data.forEach(function(seed){
            Campgorunds.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("added campgrounds");
                    //create comments
                    Comment.create({
                        text:"This is great place for find peace of nature",
                        author:"Hounr"
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }
                        else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("added comment");
                        }
                    }
                    )
                }
            });
            });
        }
    });
}
module.exports=seedDB;