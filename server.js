const express = require('express')

const app=express()
app.set('view engine','ejs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
//const use = require('./model/user');
const router = express.Router();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
const cookieParser = require('cookie-parser')


//const User = '../../model/user'


//Passport config

require('./config/passport')(passport);

// DB config

const db = require('./keys').mongoURI;

//connection to mongodb
const connectDb = require('./Db/connection');
const User= require('./Db/user');

connectDb();

//EJS
//app.use(expressLayouts);
//app.set('view engine','ejs');

//Express body parser
app.use(bodyparser.urlencoded({
	extended:true
}));
app.use(bodyparser.json());

//Express session

//app.use(cookieParser('secret'));
app.use(session({
	secret : 'secret',
	//maxAge : 3600000,
	resave : true,
	saveUninitialized : true
}));

//Passport middleware

app.use(passport.initialize());
app.use(passport.session());

//Connect Flash

app.use(flash());

//Global variables

app.use(function(req,res,next){
	res.locals.success_message = req.flash('success_message');
	res.locals.error_message = req.flash('error_message');
	res.locals.error = req.flash('error');
	next();
});







//connect to mongo

//mongoose.connect(db, {useNewUrlParser : true})

//.then(() => console.log('mongodb connected'))
//.catch(err => console.log(err));






//Express body parser

app.use(express.urlencoded({ extended : false }));


//ROUTES


app.use('/users',require('./users.js'));






//mongoose.connect('mongodb+srv://mongodbdata:ankitank@cluster0-rn5ty.mongodb.net/test?retryWrites=true&w=majority',{
//	useNewUrlParser : true ,useUnifiedTopology : true,
//}) .then(() => console.log("Database Connected")
//);

//app.get('/',(req,res)=>res.sendFile(__dirname + '/index.html'))

//app.get('/loginsample',(req,res)=>res.sendFile(__dirname +'/loginsample.html'))

//app.get('/Dashboard',(req,res)=>res.sendFile(__dirname + '/Dashboard.html'))



//passport middleware
/*app.use(passport.initialize());
app.use(passport.session());


//Connect flash
app.use(flash());
*/


app.get('/',(req,res) =>{
	res.render('index');

});
app.get('/loginsample',(req,res) =>{
//const flashMessages = res.locals.getMessages();
//consolre.log('flash', flashMessages);
   res.render('loginsample');

});



//Login Handle
router.post('/loginsample',(req,res,next) =>{
	passport.authentication('local', {

	successRedirect: '/views/Dashboard',
	failureRedirect:'/views/loginsample',
	failureFlash: true
})(req, res, next);

});
app.get('/signup',(req,res) =>{
	res.render('signup');
});

 
app.post('/signupreg',async(req,res)=>{
	try
	{
	console.log(req.body);
	const hashpass = await bcrypt.hash(req.body.pass,10)
	userSchema.methods.comparepass = function (password,hash) {
		return bcrypt.compareSync(password,hash)
	}
	const{email,username,pass,pass2} = req.body;
	let user ={};
	user.email = email
	user.username = username;
	user.pass = hashpass;
	user.pass2 = pass2;
	var err;
	if(!email|| !username || !pass || !pass2  ){
		err="please Fill all the fields...";

		//errors.push({msg: 'please fill in all fields'});
	
      res.render('signup',{'err' : err });
     }
     //check passwords match
	if(pass!== pass2){
		//errors.push({msg: 'passwords do not match'});
		err="passwords don't match..";
		res.render('signup',{'err' : err ,'email':email,'username': username} );
	}

    //const hashpass = await bcrypt.hash(req.body.pass,10)


	/*if(typeof err == 'undefined'){
		user.findOne({email:email}, function(err,data){
         if (err) throw err;
         if (data){
         	console.log("User  Exists");
         	err="user already exists with this email..";
		res.render('signup',{'err' : err ,'email':email,'username': username} );
	
         }else{
         	bcrypt.genSalt(10,(err,salt)=>{
         		if(err) throw err;
         			bcrypt.hash(pass, salt, (err,hash)=>{
         				if (err)  throw err;
                            pass = hash;
                            user({
                            	email,
                            	username,
                            	pass,
                            	pass2

                            }).save((err,data)=>{
                            	if(err) throw err ;
                            	req.flash('success_message', "Registered successfully... Login to continue..");
                            	res.redirect('/loginsample');
                            });
         				});
         		
         			});
         	   }
        
            });
    
        }
    */





  

//Authentication Strategy

var localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy({ usernameField : 'email'},(email,password,done)=>{

	//const hashpass = await bcrypt.confirm(req.body.pass,user.pass)
	user.findOne({email : email},(err,data) =>{
       if(err) throw err;
       if(!data){
       	return done(null,false,  { message : "User Doesn't Exists.."});
       }
       bcrypt.compare(password,data.password,(err,match) =>{
          if(err){
          	return done(null, false);
          }
          if(!match){
          	return done(null, false, { message : "Passwords Dont't Match"});
          }
          if(match){
          	return done (null,data);
          }
       });
	});
}));



passport.serializeUser(function(user,cb){
	cb(null,user.id);
});
passport.deserializeUser(function(id,cd){
	user.findById(id,function(err,user){
		cb(err,user);
	});
});
		
//End of Authentication Strategy	

app.post('/loginsample',(req,res,next)=>{
	passport.authenticate('local',{
		failureRedirect : '/loginsample',
		successRedirect : '/Dashboard',
		failureFlash :true,
	})(req,res,next);
});
	
   
     


	let userModel = new User(user);


	await userModel.save();
	//res.json('userModel');
	res.send("succesfull Register");
	res.redirect('/loginsample');
}
catch(error)
{


	res.status(500).send(error);
}






});

app.get('/Dashboard',(req,res) => {
	 var data = {name:'vishal',
	             regno:'123456',
	             branch:'IT',
	             semester:'4th'}

	             res.render('Dashboard',{data:data});
});


//signup handle
 




//app.get('/',(req,res)=>{
//	res.render('Dashboard',{name:'ankita'});


//	app.get('/',(req,res)=>{
//	res.render('Dashboard',{ registrstion :'1123'});



//});










app.get('/login',(req,res)=> {
	res.render('Dashboard');
});


module.exports = router;

app.listen(3000) 