const { name } = require('ejs');
const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const post =require('./models/post')
var bodyParser = require('body-parser')
// const session = require('express-session');

// const flash = require('express-flash');

// middle weare
app.use(express.static("public"));
app.set('view engine', 'ejs');

// Session middleware
// app.use(session({
//     secret: 'dffskjhkusyerhu',
//     resave: false,
//     saveUninitialized: true
// }));

// Flash middleware
// app.use(flash());
// Define a route
// app.get('/', (req, res) => {
// const title="home"
//  res.render('index',{
//     title:title
//  })

// });
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/blog",async(req,res)=>{

    const posts=await post.find({})
     res.render('blog',{posts:posts})
    //  message: req.flash('message')
})
app.get("/postform",(req,res)=>{

    res.render('create-form')

})
app.post("/createpost",async(req,res)=>{

    try {
        // create post
        const newPost = await post.create({ content: req.body.content, imageUrl: req.body.imageUrl, authorId: "65bb926686ce77b32cc9bfe8" });
        
        // req.flash('message', 'Post successfully created');
        return res.redirect("/blog");
      } catch (error) {
          console.log(error.message);
      }

})

app.get('/:pages?', (req, res) => {
  
    try {
        res.render(`${req.params.pages ? req.params.pages : "index"}`);
    } catch (err) {
        console.error(err);
        res.status(501).send('Internal Server Error dfsf');
    }
});

// Start the server
mongoose.connect("mongodb+srv://aliaslam22246:4YqMspL89JWB9k50@cluster0.ia8nqr9.mongodb.net/instagrame").then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    });
  })
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });