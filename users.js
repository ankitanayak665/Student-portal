const express = require ('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
//const User = require('../model/user');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')

const app = express();

//Passport config
//require('./config/passport').configure(passport);

//login page
router.get('/loginsample',(req,res) => res.render('loginsample'));


//dashboard page

router.get('/Dashboard',(req,res) => res.render('Dashboard'));

//Express Session

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  }));

//passport middleware

app.use(passport.initialize());
app.use(passport.session());


//Connect flash
app.use(flash());

//Global vars
app.use((req,res,next) =>{
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();

});



//signup page

//router.get('/signup',(req,res) => res.render('signup'));

//signup handle
   /*router.post('/signup',(req,res) =>{
	const{username,pass,pass2} = req.body;

	let errors = [];

	//check required fields

	if(!username || !pass || !pass2 ){
		errors.push({msg: 'please fill in all fields'});
	}

	//check passwords match
	if(pass!== pass2){
		errors.push({msg: 'passwords do not match'});
	}

	//check pass length
	if(pass.length < 6){
		errors.push({msg: 'password should be at least 6 characters'});

	}

	if(errors.length > 0) {
		res.render('signup', {
			errors,
			username,
			pass,
			pass2

		});
	}else {
		//validation passed
       User.findOne({ pass: pass});
       .then(user  =>{

	     if(user) {
	     	//User exists
	     	errors.push({msg: 'Email is already registered'});

	            
            res.render('signup', {
			errors,
			username,
			pass,
			pass2

		});

	     }else {
	      
          const newUser = new User({
	        username,
	        pass,
	        pass2
          });

         //Hash Password

          bcrypt.genSalt(10,(err,salt) =>
          bcrypt.hash(newUser.password,salt,() =>{
	        if(err) throw err;

	        //Set password to hashed
	        newUser.password = hash;
	        //Save user
	        newUser.save()
	        .then(user => {
	        	req.flash('success_msg','you are now registered and can log in');
	          res.redirect('/users/loginsample');
	        })
	        .catch(err => console.log(err));
          }))

	     }
       });
       
	}
}); 
*/

//Login Handle
router.post('/loginsample',(req,res,next) => {

passport.authenticate('local',{
	successRedirect: '/views/Dashboard',
	failureRedirect:'/views/loginsample',
	failureFlash: true

})(req, res, next);

});
module.exports = router;

