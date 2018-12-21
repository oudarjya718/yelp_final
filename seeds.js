// =====================================================
// OLD CODE////////
// =====================================================


//  var mongoose   = require("mongoose"),
//      Campground = require("./models/campground"),
//      Comment    = require("./models/comment")

// var data = [
//     {
//         name: "Cloud's Rest", 
//         image: "https://images.unsplash.com/photo-1517523976439-e29c573a2b27?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=12bb07633a572791aa50cad3db93b4aa&auto=format&fit=crop&w=700&q=60",
//         description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
//     },
    
//     {
//         name: "Desert", 
//         image: "https://images.unsplash.com/photo-1519095614420-850b5671ac7f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=63ffaa8c9b9aca319b57204b5d620f56&auto=format&fit=crop&w=700&q=60",
//         description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
//     },
    
//     {
//         name: "Camps", 
//         image: "https://images.unsplash.com/photo-1523642595781-e7ce9855e4f6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4eecbe6d90b37b73251d508a97667fe5&auto=format&fit=crop&w=700&q=60",
//         description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
//     }
//  ]


// function seedDB(){
//     // Remove all campgrounds
//     Campground.remove({}, function(err){
//     if(err) {
//         console.log(err);
//     }
//     console.log("removed camgrounds!");
//     //   add a few campgrounds
//     data.forEach(function(seed){
//       Campground.create(seed, function(err, campground){
//           if(err) {
//               console.log(err);
//           } else {
//               console.log("added a campground");
//              //   create a comment
//              Comment.create(
//                  {
//                      text: "this place is great, but I wish there was internet",
//                      author: "Homer"
//              }, function(err, comment){
//                  if(err) {
//                      console.log(err);
//                  } else {
//                     campground.comments.push(comment);
//                     campground.save();
//                     console.log("Created new comment");
//                  }
//              });
//           }
//       });
//     });
//   });
  
//   //   add a few comments
// }


// module.exports = seedDB;

// ===========================
// NEW CODE
// ===========================


var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var seeds = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff76",
            username: "Jack"
        }

    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff76",
            username: "Jack"
        }

    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff76",
            username: "Jack"
        }

    }
];


// ==========================================================
// FOR ASYNC
// ==========================================================


async function seedDB(){
    try {
        await Campground.remove({});
        console.log('Campgrounds removed');
        await Comment.remove({});
        console.log('Comments removed');

        for(const seed of seeds) {
            let campground = await Campground.create(seed);
            console.log('Campground created');
            let comment = await Comment.create(
                {
                    text: 'This place is great, but I wish there was internet',
                    author:{
                        id : "588c2e092403d111454fff76",
                        username: "Jack"
                    }
                }
            )
            console.log('Comment created');
            campground.comments.push(comment);
            campground.save();
            console.log('Comment added to campground');
        }
    } catch(err) {
        console.log(err);
    }
}

module.exports = seedDB;



// =================================================================================
// FROM IANS NOTIFICATIONS CODE
// =================================================================================

// function seedDB(){
//   //Remove all campgrounds
//   Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//          //add a few campgrounds
//         data.forEach(function(seed){
//             Campground.create(seed, function(err, campground){
//                 if(err){
//                     console.log(err)
//                 } else {
//                     console.log("added a campground");
//                     //create a comment
//                     Comment.create(
//                         {
//                             text: "This place is great, but I wish there was internet",
//                             author: "Homer"
//                         }, function(err, comment){
//                             if(err){
//                                 console.log(err);
//                             } else {
//                                 campground.comments.push(comment);
//                                 campground.save();
//                                 console.log("Created new comment");
//                             }
//                         });
//                 }
//             });
//         });
//     }); 
//     //add a few comments
// }

// module.exports = seedDB;