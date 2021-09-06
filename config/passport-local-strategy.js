const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;


const User = require('../models/user');

//authencation using passport
passport.use(new LocalStrategy({
	usernameField:'email'
},
function(email,password,done){
//find user and establish the identity
User.findOne({email:email},function(err,user){
	if(err){
		console.log('Error in finding user--->passport');
		return done(err);
	}
	if(!user||user.password !=password ){
		 console.log('Invalid Username/Password')
		 return done(null,false);
	}

	return done(null,user);
});
}

));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
  done(null,user.id);
});
//deserializing the user from the cookies
passport.deserializeUser(function(id,done){
 User.findById(id,function(err,user){
       if(err){
	       console.log('error in finding user-->Passport');
	       return done(err);
       }
       return done(null,user)
 });
});
//check if the user is autheticated
passport.checkAuthentication= function(req,res,next){
	//if the user is signed in, then pass on therequest to the next function(controller's action)
	if(req.isAuthenticated()){
		return next();//user view the page
	}
	//if the user is not signed in
	return res.redirect('/users/sign-in');
}
 
passport.setAuthenticatedUser = function(req,res,next){
	//req.user contains the cureent signed in user from the session cookie and we are just sending this to locals for the views
       res.locals.user =req.user;

}


//deserializing the user from the cookies
module.exports = passport;