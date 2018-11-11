var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductModelSchema = new Schema({
	numeropedido:Number,
	producto:String,
	color:String,
	talla:String,
    costo:Number,
	venta:Number,
	estado:String
});

module.exports = mongoose.model('Product', ProductModelSchema );
