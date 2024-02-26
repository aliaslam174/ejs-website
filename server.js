const { name } = require('ejs');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');

// Define a route
app.get('/', (req, res) => {
const title="home"
 res.render('index',{
    title:title
 })

});
app.get('/Properties', (req, res) => {
    const title="about page"
     res.render('Properties',{
        title:title
     })
    
    });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});