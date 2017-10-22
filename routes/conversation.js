
var express = require('express');
var router = express.Router();
var MongooseSchema = require('../src/MongooseSchema')
/* GET home page. */
router.get('/', function(req, res, next) {
    MongooseSchema.find({}, (err,response)=>{
        if(err){
            res.status(500).send({
                confirmation: "Fail"
            })
        }else{
            res.json({
                result : response
            })
        }
    })
});
router.post('/', function(req,res,next){
    MongooseSchema.create({name: req.body.name, message: req.body.message},(err)=>{
        if(err){
            res.status(500).send({confirmation: "ERROR"})
        }
    })
})
module.exports = router;
