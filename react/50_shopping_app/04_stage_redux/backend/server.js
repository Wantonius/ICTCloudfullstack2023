const express = require("express");
const apiroute = require("./routes/apiroute");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");

let app = express();

//MONGO CONNECTION

const mongodb_url = process.env.MONGODB_URL;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongodb_user+":"+mongodb_password+"@"+mongodb_url+"/shoppingdatabase?retryWrites=true&w=majority"

mongoose.connect(url).then(
	() => console.log("Connected to mongo atlas"),
	(err) => console.log("Failed to connect to mongo atlas. Reason",err)
)

mongoose.set("toJSON",{virtuals:true});
//LOGIN DATABASES

const time_to_live_diff = 3600000;

//BODYPARSER

app.use(express.json());

let port = process.env.PORT || 3001;

//LOGIN MIDDLEWARE

createToken = () => {
	let token = crypto.randomBytes(64);
	return token.toString("hex");
}

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({message:"Forbidden"});
	}
	sessionModel.findOne({"token":req.headers.token}).then(function(session) {
		if(!session) {
			return res.status(403).json({"message":"Forbidden"});
		}
		let now = Date.now();
		if(now > session.ttl) {
			sessionModel.deleteOne({"_id":session._id}).then(function() {
				return res.status(403).json({"message":"Forbidden"});
			}).catch(function(err) {
				console.log("Failed to remove session. Reason",err);
				return res.status(403).json({"message":"Forbidden"});				
			})
		} else {
			session.ttl = now + time_to_live_diff;
			req.session = {};
			req.session.user = session.user;
			session.save().then(function(){
				return next();
			}).catch(function(err) {
				console.log("Failed to resave session. Reason",err);
				return next();
			})
		}
	}).catch(function(err) {
		console.log("Failed to find session. Reason",err);
		return res.status(403).json({"message":"Forbidden"});
	})
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"message":"Bad request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"message":"Bad request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"message":"Bad request"});
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			console.log("Failed to encrypt password. Reason:",err);
			return res.status(500).json({message:"Internal Server Error"})
		}
		let user = new userModel({
			"username":req.body.username,
			"password":hash
		})
		user.save().then(function(user) {
			return res.status(201).json({message:"Register success"});
		}).catch(function(err){
			if(err) {
				if(err.code === 11000) {
					return res.status(409).json({message:"Username already in use"});
				}
				return res.status(500).json({message:"Internal Server Error"});
			}
			if(!user) {
				return res.status(500).json({message:"Internal Server Error"});
			}			
		})
	})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"message":"Bad request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"message":"Bad request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"message":"Bad request"});
	}
	userModel.findOne({"username":req.body.username}).then(function(user) {
		if(!user) {
			return res.status(401).json({"message":"Unauthorized"});
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
			if(err) {
				console.log("Failed to compare passwords. Reason",err);
				return res.status(500).json({"message":"Internal Server Error"})
			}
			if(!success) {
				return res.status(401).json({"message":"Unauthorized"});
			}
			let token = createToken();
			let now = Date.now();
			let session = new sessionModel({
				"user":req.body.username,
				"ttl":now+time_to_live_diff,
				"token":token
			})
			session.save().then(function(session) {
				return res.status(200).json({token:token})
			}).catch(function(err) {
				console.log("Failed to save session. Reason",err);
				return res.status(500).json({"message":"Internal Server Error"})
			})
		})
	}).catch(function(err) {
		console.log("Failed to find user. Reason",err);
		return res.status(500).json({"message":"Internal Server Error"})		
	})
})

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({message:"Not found"})
	}
	sessionModel.deleteOne({"token":req.headers.token}).then(function() {
		return res.status(200).json({"message":"Logged out"});
	}).catch(function(err){
		console.log("Failed to remove login session. Reason",err);
		return res.status(500).json({"message":"Internal Server Error"});	
	})
})


app.use("/api",isUserLogged,apiroute);

app.listen(port);

console.log("Running in port",port);