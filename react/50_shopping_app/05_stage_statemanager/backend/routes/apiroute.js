const express = require("express");
const itemModel = require("../models/item");

let router = express.Router();



//REST API

router.get("/shopping",function(req,res) {
	let query = {"user":req.session.user}
	itemModel.find(query).then(function(items) {
		return res.status(200).json(items);
	}).catch(function(err) {
		console.log("Failed to find items. Reason",err);
		return res.status(500).json({"message":"Internal Server Error"})
	})
})

router.post("/shopping",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"message":"Bad Request"});
	}
	if(!req.body.type) {
		return res.status(400).json({"message":"Bad Request"});
	}
	let item = new itemModel({
		"type":req.body.type,
		"count":req.body.count,
		"price":req.body.price,
		"user":req.session.user
	})
	item.save().then(function(item){
		return res.status(201).json(item)
	}).catch(function(err) {
		console.log("Failed to add new item. Reason",err);
		return res.status(500).json({"message":"Internal Server Error"})		
	})
})

router.delete("/shopping/:id",function(req,res) {
	itemModel.deleteOne({"_id":req.params.id,"user":req.session.user}).then(function(){
		return res.status(200).json({"message":"Success"});
	}).catch(function(err){
		console.log("Failed to remove item. Reason",err);
		return res.status(500).json({"message":"Internal Server Error"})		
	})
})

router.put("/shopping/:id",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"message":"Bad Request"});
	}
	if(!req.body.type) {
		return res.status(400).json({"message":"Bad Request"});
	}
	let item = {
		"type":req.body.type,
		"count":req.body.count,
		"price":req.body.price,
		"user":req.session.user
	}
	itemModel.replaceOne({"_id":req.params.id,"user":req.session.user},item).then(function(){
		return res.status(200).json({"message":"Success"});
	}).catch(function(err) {
		console.log("Failed to edit item. Reason",err);
		return res.status(500).json({"message":"Internal Server Error"})		
	})

})

module.exports = router;