var mongoose=require("mongoose");
var campgroundschema= new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    discription:String,
    author: {
        id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
        },
        username:String
    },
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports=mongoose.model("Campgorunds",campgroundschema);