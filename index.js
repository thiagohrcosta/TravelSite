const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/js/owl'))
app.use(express.static("css"));
app.use(express.static(__dirname + '/css/owl'));

mongoose.connect("mongodb+srv://admin-app:123456app@movieapi.z0kfu.mongodb.net/travelAgency", {useNewUrlParser: true});

const postSchemaSouthAmerica = {
  postCity: String,
  postCountry: String,
  postprice: Number,
  postCoverImage: String,
  postBackgroundImage: String,
  postContent: String,
  postHotelStar: String
}

const Post = mongoose.model("Post", postSchemaSouthAmerica);

app.get("/", function(req, res){
  Post.find({}, function(err, posts){
    res.render("home", {
      posts: posts
    });
  });
});

app.get("/postcontent", function(req, res){
  res.render("postContent");
});

app.post("/postcontent", function(req, res){
  const post = new Post({
    postCity: req.body.cityName,
    postCountry: req.body.countryName,
    postprice: req.body.price,
    postCoverImage: req.body.coverImage,
    postBackgroundImage: req.body.backgroundImage,
    postContent: req.body.content,
    postHotelStar: req.body.hotelStar
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    };
  });
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("cityContent", {
      postCity: post.postCity,
      postHotelStar: post.postHotelStar,
      postCountry: post.postCountry,
      postprice: post.postprice,
      postCoverImage: post.postCoverImage,
      postBackgroundImage: post.postBackgroundImage,
      postContent: post.postContent,

    });
  });
});



let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
};


app.listen(port, function(){
  console.log("Server has started successfully.")
});