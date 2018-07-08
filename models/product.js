var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductModelSchema = new Schema({
    title:String,
	description:String,
	purchasePrice:Number,
    salePrice:Number,
	status:String,
	image:String,
	category:String
});

module.exports = mongoose.model('Product', ProductModelSchema );
