const express = require("express");
const apiroute = require("./routes/apiroute");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const mongoStore = require("connect-mongo");

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

app.use(session({
	name:"shopping_session",
	resave:false,
	secret:"MyBestSecret",
	saveUninitialized:false,
	cookie:{maxAge:1000*60*60},
	store:mongoStore.create({
		mongoUrl:url,
		collectionName:"sessions"
	})
}))

const time_to_live_diff = 3600000;

//BODYPARSER

app.use(express.json());

let port = process.env.PORT || 3001;

//PASSPORT

app.use(passport.initialize());
app.use(passport.session());

passport.use("local-login", new localStrategy({
	usernameField:"username",
	passwordField:"password",
	passReqToCallback:true
},function(req,username,password,done) {
	if(!req.body) {
		return done(null,false,{"Message":"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return done(null,false,{"Message":"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return done(null,false,{"Message":"Bad Request"});
	}
	userModel.findOne({"username":req.body.username}).then(function(user) {
		if(!user) {
			return done(null,false,{"Message":"Unauthorized"});
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
			if(err) {
				console.log("Failed to compare passwords. Reason",err);
				return done(err)
			}
			if(!success) {
				return done(null,false,{"Message":"Unauthorized"});
			}
			let token = createToken();
			let now = Date.now();
			req.temp = {};
			req.temp.token = token;
			req.temp.ttl = now + time_to_live_diff;
			req.temp.user = username;
			return done(null,user);
		})
	}).catch(function(err) {
		console.log("Failed to find user. Reason",err);
		return done(err)		
	})	
}));

passport.serializeUser(function(user,done) {
	console.log("serializeUser")
	done(null,user._id);
})

passport.deserializeUser(function(_id,done) {
	console.log("deserializeUser")
	userModel.findById(_id).then(function(user) {
		return done(null,user);
	}).catch(function(err) {
		return done(err);
	})
})

//LOGIN MIDDLEWARE

createToken = () => {
	let token = crypto.randomBytes(64);
	return token.toString("hex");
}

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({message:"Forbidden"});
	}
	if(req.isAuthenticated()) {
		if(req.headers.token === req.session.token) {
			let now = Date.now()
			if(now > req.session.ttl) {
				req.session.destroy(function() {
					req.logout(function() {
						return res.status(200).json({"Message":"Logged out"})
					})
				})
				return;
			}
			req.session.ttl = now + time_to_live_diff;
			return next();
		}
	}
	return res.status(403).json({"Message":"Forbidden"})
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

app.post("/login",passport.authenticate("local-login",{failureRedirect:"/"}),function(req,res) {
	req.session.user = req.temp.user;
	req.session.ttl = req.temp.ttl;
	req.session.token = req.temp.token;
	return res.status(200).json({token:req.session.token});
})

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({message:"Not found"})
	}
	if(req.session) {
		req.session.destroy(function() {
			req.logout(function() {
				return res.status(200).json({"Message":"Logged out"})
			})
		})
		return;
	}
	return res.status(404).json({message:"Not found"})
})


app.use("/api",isUserLogged,apiroute);

app.listen(port);

console.log("Running in port",port);