var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
var geo = require('mapbox-geocoding');


var User = require("../models/user");
var Notification = require("../models/notification");
// var middleware = require("../middleware");
var Review = require("../models/review");
var Comment = require("../models/comment");

const middleware = require('../middleware') ;

const {isLoggedIn, isSafe} = require("../middleware");




var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dcsika1yb', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


//INDEX - show all campgrounds
router.get("/", function(req, res){
    var noMatch= null;
    if(req.query.search) {
       const regex = new RegExp(escapeRegex(req.query.search), 'gi');
       // Get all campgrounds from DB
       Campground.find({name: regex}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           if(allCampgrounds.length < 1) {
            //   noMatch = "No campgrounds match that query, please try again.";
               noMatch = "No Search results found for " + ' "' + req.query.search + '" ' + " please try again with a valid campground name";
           }
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds', noMatch: noMatch});
       }
     }); 
    } else {
     // Get all campgrounds from DB
     Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds', noMatch: noMatch});
       }
     });
    }
});

//CREATE - add new campground to DB 

// ==========================================
// OLD CODE
// ==========================================

// router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res) {
//     cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
//       if(err) {
//         req.flash('error', err.message);
//         return res.redirect('back');
//       }
//       // add cloudinary url for the image to the campground object under image property
//       req.body.campground.image = result.secure_url;
//       // add image's public_id to campground object
//       req.body.campground.imageId = result.public_id;
//       // add author to campground
//       req.body.campground.author = {
//         id: req.user._id,
//         username: req.user.username
//       }
//       Campground.create(req.body.campground, function(err, campground) {
//         if (err) {
//           req.flash('error', err.message);
//           return res.redirect('back');
//         }
//         res.redirect('/campgrounds/' + campground.id);
//       });
//     });
// });


// =========================================================
// NEW CREATE/POST ROUTE
// =========================================================

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var cost = req.body.cost;
// FOR MAPBOX MAPS
  geo.geocode(req.body.location, function (err, data) {
     if (err || data.status === 'ZERO_RESULTS') {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
     }
     var lat = data.results[0].geometry.location.lat;
     var lng = data.results[0].geometry.location.lng;
     var location = data.results[0].formatted_address;
     var newCampground = {name: name, image: image, description: desc, cost: cost, author:author};
     // Create a new campground and save to DB
     Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
     });
  });
});


// =================================================
// NEW CODE 2 FOR CREATE/POST ROOUTE(NOTIFICATIONS)
// =================================================

// router.post("/", middleware.isLoggedIn, async function(req, res){
//    // get data from form and add to campgrounds array
//    var name = req.body.name;
//    var image = req.body.image;
//    var desc = req.body.description;
//    var author = {
//         id: req.user._id,
//         username: req.user.username
//    };

// //   let content = req.body.content;

//   let location = req.body.location;


//   geocodingClient

//      .forwardGeocode({

//       query: location,

//       limit: 1

//      })

//      .send()

//      .then(response => {

//       const match = response.body;

//       const coordinates = match.features[0].geometry.coordinates;


//       const newPost = {

//         name: name,

//         desc: description,

//         // content: content,

//         images: image,

//         coordinates: coordinates

//       };



//      var newCampground = {name: name, image: image, description: desc, author:author, location: location, lat: lat, lng: lng};
    
//      // var newCampground = {name: name, image: image, description: desc, author:author}

//      try {
//       let campground = await Campground.create(newCampground);
//       let user = await User.findById(req.user._id).populate('followers').exec();
//       let newNotification = {
//         username: req.user.username,
//         campgroundId: campground.id
//       }
//       for(const follower of user.followers) {
//         let notification = await Notification.create(newNotification);
//         follower.notifications.push(notification);
//         follower.save();
//       }
      
//       let response = await geocodingClient
//       .forwardGeocode({
//         query: req.body.post.location,
//           limit: 1
//   })
//   .send(); 
//           req.body.post.coordinates = response.body.features[0].geometry.coordinates;
//           let post = await Campground.create(req.body.post);
//           console.log(post);
      
//       //redirect back to campgrounds page
//       res.redirect(`/campgrounds/${post.id}`);
//      } catch(err) {
//       req.flash('error', err.message);
//       res.redirect('back');
//      }
//   });
// });





// NEW- SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW: showmore info about one campground
// router.get("/:id", function(req,res){
//    // find the campground with provided id
//    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(foundCampground);
//             // render show template with that campground
//             res.render("campgrounds/show", {campground: foundCampground});
//         }
//    });
    
//    req.params.id
    
// });

// new show route with reviews feature

// SHOW - shows more info about one campground
router.get("/:id", function (req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").populate({
        path: "reviews",
        options: {sort: {createdAt: -1}}
    }).exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// NEW CODE
// router.get("/:id", function(req, res){
//     //find the campground with provided ID
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(foundCampground)
//             //render show template with that campground
//             res.render("campgrounds/show", {campground: foundCampground});
//         }
//     });
// });

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
      Campground.findById(req.params.id, function(err, foundCampground){
          res.render("campgrounds/edit", {campground: foundCampground});
      });
});

// UPDATE CAMPGROUND ROUTE

router.put("/:id", upload.single('image'), function(req, res){
    delete req.body.campground.rating;  //added for reviews and ratings feature
    geo.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;

    Campground.findById(req.params.id, async function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            if (req.file) {
              try {
                  await cloudinary.v2.uploader.destroy(campground.imageId);
                  var result = await cloudinary.v2.uploader.upload(req.file.path);
                  campground.imageId = result.public_id;
                  campground.image = result.secure_url;
              } catch(err) {
                  req.flash("error", err.message);
                  return res.redirect("back");
              }
            }
            campground.name = req.body.name;
            campground.description = req.body.description;
            campground.save();
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});
// // DESTROY CAMPGROUND ROUTE
// router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
//     Campground.findByIdAndRemove(req.params.id, function(err){
//         if(err) {
//             res.redirect("/campgrounds");
//         } else{
//             res.redirect("/campgrounds");
//         }
//     });
// });


// DESTROY CAMPGROUND ROUTE

// router.delete('/:id', function(req, res) {
//   Campground.findById(req.params.id, async function(err, campground) {
//    if(err) {
//       req.flash("error", err.message);
//       return res.redirect("back");
//    }
//    try {
//         await cloudinary.v2.uploader.destroy(campground.imageId);
//         campground.remove();
//         req.flash('success', 'Campground deleted successfully!');
//         res.redirect('/campgrounds');
//    } catch(err) {
//         if(err) {
//           req.flash("error", err.message);
//           return res.redirect("back");
//         }
//    }
//   });
// });

router.delete('/:id', function(req, res) {
  Campground.findById(req.params.id, async function(err, campground) {
    if(err) {
      req.flash("error", err.message);
      return res.redirect("back");
    }
    // deletes all comments associated with the campground
            Comment.remove({"_id": {$in: campground.comments}}, function (err) {
                if (err) {
                    console.log(err);
                    return res.redirect("/campgrounds");
                }
                // deletes all reviews associated with the campground
                Review.remove({"_id": {$in: campground.reviews}}, async function (err) {
                    if (err) {
                        console.log(err);
                        return res.redirect("/campgrounds");
                    }
                    try {
                         await cloudinary.v2.uploader.destroy(campground.imageId);
                         campground.remove();
                         req.flash('success', 'Campground deleted successfully!');
                         res.redirect('/campgrounds');
                    } catch(err) {
                           if(err) {
                                req.flash("error", err.message);
                                return res.redirect("back");
                               }
                     }
        });
     });
  });
});



function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};





module.exports = router;