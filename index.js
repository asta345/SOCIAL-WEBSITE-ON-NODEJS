const express = require('express'); 
//to run cookie 
const cookieParser = require('cookie-parser');
const app = express();
const port = 9000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie

const session =require('express-session');
const passport =require('passport');
const passsport =require('./config/passport-local-strategy');
app.use(express.urlencoded());

 app.use(cookieParser());  
app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

 


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// // // use express router
 app.use('/', require('./routes'));

app.use(session({
    name:'codeial',
    //to do change the secert before deployment in production mode
    secret:"something",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)

    }
}));
 app.use(passport.initialize());
 app.use(passport.session());

 

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
