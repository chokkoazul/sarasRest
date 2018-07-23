// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// DATABASE SETUP
var mongoose = require('mongoose');
mongoose.connect('mongodb://sarasuser:dantedante@ds113870.mlab.com:13870/sarasdb');

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log("DB connection alive");
});

// product models lives here
var Product = require('./models/product');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('Something is happening.');
  next();
});

router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});


// on routes that end in /bears
// ----------------------------------------------------
router.route('/products')

  .post(function (req, res) {

    var product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.purchasePrice = req.body.purchasePrice;
    product.salePrice = req.body.salePrice;
    product.status = req.body.status;
    product.image = "chaquetanegra.jpg";
    product.category = req.body.category;

    product.save(function (err) {
      if (err)
        res.send(err);

      res.json({ message: 'Product created!' });
    });
  })

  .get(function (req, res) {
    Product.find(function (err, products) {
      if (err)
        res.send(err);

      res.json(products);
    });
  });

router.route('/products/:product_id')

  .delete(function (req, res) {

    var productId = req.params.product_id;
    console.log(productId);
    Product.remove({"_id": productId}, function(err){
      if(err){
        res.send(err);
      }
      else{
        res.json({ message: 'Product deleted!' });
      }
    });
  });

// REGISTER OUR ROUTES -------------------------------
app.use('/sarasapi', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

