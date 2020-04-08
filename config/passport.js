const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

function init(password,getUserByEmail,getUserById) {

   const authenticator = (eamail,password,done) => {

   	//getting the logged in user

   	const user = getUserByEmail(email);

   	if (user == null)
   	{
   		return done(null,false,{message:"Wronge Email Address"})
   	}

   	//compare the hashes of the password
   	try{
   		if(await bcrypt.compare(pass,user.pass)){
   			return done(null,user);
   		}
   		else{
   			return done(null,false{message:"password is incorrect"})
   		}
   	} catch (e) {
   		return done(e);
          
   	}

   }

	passport.use(new localStrategy({ usernameField: 'email'},
		authenticator))

	passport.serializeUser((user,done) => {done(null,user.id)})
	passport.deserializeUser((id,done )=> {
		done(null,getUserById(id))
	})
}

module.exports = init;





/*const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const User= require('./Db/user');

const User= require('../Db/user');
module.exports = function(passport) {
	

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
			
		});
		})
        );

			//.catch(err => console.log(err));







	passport.serializeUser(function(user,done){
     done(null,user.id);
	});

	passport.deserializeUser(function(id,done){
		User.findById(id,(err,user) =>{
			done(err, user);
		});
	});

};
*/