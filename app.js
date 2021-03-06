//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const func = require(__dirname + "/public/function.js");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts = [];
let err = {
  title: "Error!!",
  content: "You tackled a error from your side plzz try again click home, <br> Go back to Main Menu",
};
// app.set("views",path.join(__dirname+"views/"),path.join(__dirname,"views/partials/"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.listen(3000, function() {
  console.log("Server started on port 3000");
});


app.get("/", function(request, responce) {
  responce.render("home", {
    content: homeStartingContent,
    array: posts
  });

});

app.get("/posts/:topic", function(request, responce) {
  // :topic is param which you can fetch with the help of the request.params.nameYouGave(for us it is topic)
  let route = request.params.topic;
  // responce.render(route,{content:homeStartingContent,array:posts});
  let a = func.matchingTest(posts, route);
  if (a >= 0) {
    console.log("match found");
    responce.render("post", {
      content: posts[a]
    });
  } else {
    console.log("match not found");

    responce.render("post", {
      content:err,
    });
  }

  // { topic: 'compose' }
});

// thus with :topic we can fetch and give result accordingly

app.get("/about", function(request, responce) {
  responce.render("about", {
    content: aboutContent,
  });

});

app.get("/contact", function(request, responce) {
  responce.render("contact", {
    content: contactContent,
  });

});

app.get("/compose", function(request, responce) {
  responce.render("compose");

});

app.post("/compose", function(request, responce) {

  let ttl = request.body.title;
  let cnt = request.body.postContent;
  let obj = {
    title: ttl,
    content: cnt,
  }
  posts.push(obj);
  responce.redirect("/");

});
