 var mongoose   = require("mongoose"),
     Campground = require("./models/campground"),
     Comment    = require("./models/comment")

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://images.unsplash.com/photo-1517523976439-e29c573a2b27?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=12bb07633a572791aa50cad3db93b4aa&auto=format&fit=crop&w=700&q=60",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    },
    
    {
        name: "Desert", 
        image: "https://images.unsplash.com/photo-1519095614420-850b5671ac7f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=63ffaa8c9b9aca319b57204b5d620f56&auto=format&fit=crop&w=700&q=60",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    },
    
    {
        name: "Camps", 
        image: "https://images.unsplash.com/photo-1523642595781-e7ce9855e4f6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4eecbe6d90b37b73251d508a97667fe5&auto=format&fit=crop&w=700&q=60",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    }
 ]


function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
    if(err) {
        console.log(err);
    }
    console.log("removed camgrounds!");
    //   add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
          if(err) {
              console.log(err);
          } else {
              console.log("added a campground");
             //   create a comment
             Comment.create(
                 {
                     text: "this place is great, but I wish there was internet",
                     author: "Homer"
             }, function(err, comment){
                 if(err) {
                     console.log(err);
                 } else {
                    campground.comments.push(comment);
                    campground.save();
                    console.log("Created new comment");
                 }
             });
          }
      });
    });
  });
  
  //   add a few comments
}


module.exports = seedDB;

