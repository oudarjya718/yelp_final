require('dotenv').config()

var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User       = require("./models/user"),
    seedDB     = require("./seeds")
    
// const middleware = require('.. /middleware') ;

    
// Requiring routes
    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index"),
    reviewRoutes     = require("./routes/reviews")


// console.log(process.env.DATABASEURL);
// mongoose.connect("mongodb://localhost/yelp_camp") //SHOULD BE REMOVED WHEN UPLOADING ON GITHUB OR MAKING IT PUBLIC//
// AND EXPORTED IN DATABASEURL WHEN STARTING DEVELOPMENT SERVER
    
mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://oudarjya:database1@ds113703.mlab.com:13703/yelpcamp123");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// app.use(express.static('public'))


app.use(methodOverride("_method"));
app.use(flash());
// console.log(__dirname);
seedDB(); //seed the DB

// PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "once again rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));


app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(async function(req, res, next){
   res.locals.currentUser = req.user;
   if(req.user) {
    try {
      let user = await User.findById(req.user._id).populate('notifications', null, { isRead: false }).exec();
      res.locals.notifications = user.notifications.reverse();
    } catch(err) {
      console.log(err.message);
    }
   }
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);









app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the YELP CAMP server HAS started!");
}); 

