var express      =require("express"),
    app          =express(), 
    bodyParser   =require("body-parser"),
    mongoose     =require("mongoose"),
    flash        =require("connect-flash"),
    passport     =require("passport"),
    ejslint =require("ejs-lint"),
    LocalStrategy=require("passport-local"),
    methodOverride=require("method-override"),
    Campgorunds  =require("./models/campground"),
    Comment      =require("./models/comment"),
    User         =require("./models/user"),
    seedDB        =require("./seeds");
//routes require
ejslint("landing",'async:true')
var campgroundroute=require("./routes/campground"),
    commentroute   =require("./routes/comment"),
    indexroute     =require("./routes/index");
//db
// seedDB();
mongoose.connect("mongodb+srv://Raj:1249@yelpcamp.b9dgv.mongodb.net/yelpcamp?retryWrites=true&w=majority");
app.use(bodyParser.urlencoded({extended:true}));        
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

app.use(flash());
//passport initialize configuration
app.use(require("express-session")({
    secret:"Rusy wins again",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for user session
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.succes=req.flash("succes");
    next();
});

//routing
app.use("/",indexroute);
app.use("/campground",campgroundroute);
app.use("/campground/:id/comments",commentroute);

//Start the server
app.listen(process.env.PORT || 3000,function(){
    console.log("Start the YELPCAMP Server");
});