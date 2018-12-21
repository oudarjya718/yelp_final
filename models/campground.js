
var mongoose   = require("mongoose");



// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    imageId: String,
    description: String,
    cost: Number,
    createdAt: { type: Date, default: Date.now },
    location: String,
    coordinates: Array,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },// COMMENTED ONLY FOR SEEDS FILE
    comments: [
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Comment"
          }
        ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    rating: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model("Campground", campgroundSchema);