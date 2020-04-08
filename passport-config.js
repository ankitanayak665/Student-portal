const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport')

function init(passport,getUserByEmail,getUserById) {

   const authenticator = async(email,pass,done) => {

   	//getting the logged in user

   	const user = getUserByEmail(email);

   	if (user == null)
   	{
   		return done(null,false,{message:"Wronge Email Address"})
   	}

   	//compare the hashes of the password
   	try{
   		if(await bcrypt.compare(pass, user.pass))
         {
   			return done(null,user);
   		}
   		else{
   			return done(null,false,{message:"password is incorrect"})
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
