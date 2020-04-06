const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User= require('./Db/user');

//const User = require('../models/User');
/*module.exports = function(passport) {
	passport.use(
		new LocalStrategy({ usernameField: 'email'},(email,password,done) =>{
			//Match User
			User.findOne({ email: email })
			.then(user =>{
				if(!user){

                 return done(null,false,{message: 'That email is not registered'});
				}

				//Match password
				bcrypt.compare(password, user.password,(err,isMatch)  =>{
					if(err) throw err;


					if(isMatch) {
                     return done(null,user);

					}else{
						return done(null,false,{ message: 'password incorrect'})
					}
				});
			
		})
			.catch(err => console.log(err));


})

);

	passport.serializeUser(function(User,done){
     done(null,user.id);
	});

	passport.deserializeUser(function(id,done){
		User.findById(id,(err,user) =>{
			done(err, user);
		});
	});

}*/
module.exports = function(passport) {
	passport.serializeUser(function(User,done){
     done(null,user.id);
	});
	passport.deserializeUser(function(User,done){
		done(null,user.id);
	});

   passrport.use(new localstrategy(function(email,pass,done){
   	User.findOne({email:email},function(err,doc){
   		if(err) { done(err)}
   			else {
   				if(doc) {
                    var valid = doc.comparepass(pass,doc.pass)
                    if(valid){
                    	done(null,{
                    		email:doc.email,
                    		pass:doc.pass
                    	})
                    }
                    	else{
                    		done(null, false)
                    	}
                    
   				}else {
   					done(null,false)
   				}
   			}
   	})
   }))
}