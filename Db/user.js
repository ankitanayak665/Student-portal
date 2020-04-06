const mongoose = require('mongoose');

const user = new mongoose.Schema({

	email:{
        type:String
     },   
    username:{
        type:String
    },
    pass:{
        type:String
    },
     pass2:{
        type:String
    }
    
});

module.exports = User = mongoose.model('user',user);