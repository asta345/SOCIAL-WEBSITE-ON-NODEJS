const passport = require('passport');
const googleStragey =require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// teeling passport to use the new strategy for google login
passport.use(new googleStragey({
  clientID:"259947245386-94insf23ng03ead6orv0up1t8hlg6frd.apps.googleusercontent.com",// delete it
  clientSecret:"Vfco4PMFlGINXujiMB_QGkg0",
  callbackURL:" http://localhost:9000/users/auth/google/callback",
},
function (accessToken,refreshToken,profile,done){
	//find user
	User.findOne({email:profile.emails[0].value}).exec(function(err,user){
		if(err){console.log('error in google-strategy-passport',err);return;}
                console.log(accessToken,refreshToken);
		console.log(profile);
              if(user){
		      // if found set this as req.user
		      return done(null,user);
	        }else{
			//if user is not found create a user
			User.create({
				name:profile.displayName,
				email:profile.emails[0].value,
				password:crypto.randomBytes(20).toString('hex')
			},function(err,user){
				if(err){console.log('error in creating user google stratgey-passport',err);return;}

				return done(null,user);
			})
		}
  
	});
}
));

module.exports =passport;
