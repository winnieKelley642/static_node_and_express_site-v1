// Add variables to require the necessary dependencies.
const express = require('express');
const app = express();
const {projects} = require('./data.json');


//set “view engine” to “pug”
app.set('view engine', 'pug');

//use a static route and the express.static method to serve the static files located in the public folder
app.use('/static', express.static('public'));

//set routes:
//index:
app.get('/', (req, res) =>{
    res.render('index', {projects});    
});

//about:
app.get('/about', (req, res) =>{
    res.render('about', {projects});
});

//Dynamic "project" routes (/project or /projects) based on the id of the project that render a customized version of the Pug project template to show off each project. Which means adding data, or "locals", as an object that contains data to be passed to the Pug template.
app.get('/project/:id', (req, res) =>{
    res.render('project',{
        project: projects[req.params.id]
    })    
})

//error handling
//404 error
app.use((req, res, next) =>{
    const error = new Error(`Dun Dun Dun, that page is not available`);
    error.status = 404;
    //log out error in console as project requires
    console.log(`Ooops! Something went wrong: ${error}`);
    next(error);
});
//error message
app.use((error, requ, res, next) => {
    res.locals.error = error;
    res.status(error.status);
    res.render(`error`);
});

app.get('/', (request, respond) =>{
    respond.send('connected properly to localhost:3000');
});

app.listen(3000);