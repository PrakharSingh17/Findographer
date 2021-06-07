const express = require ('express');
const Ninja = require('../models/ninja');
const router = express.Router();



// get a list of ninjas from the db
router.get('/ninjas', function(req, res,next){
    // Ninja.find({}).then(function(ninjas){
    //     res.send(ninjas);
    // });
    // Ninja.geoNear({
    //     type:'Point',coordinates:[parseFloat(req.query.lng), parseFloat(req.query,lat)]},
    //     {maxDistance:100000, spherical:true}
    //     ).then(function(ninjas){
    //         res.send(ninjas);
    //     });
    Ninja.aggregate().near({
        near:{
            type:'Point',
            coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance:100000,
        spherical:true,
        distanceField:"dis"
    }).then(function(ninjas){
        res.send(ninjas);
    });
    
});

// add a new ninja to the db
router.post('/ninjas', function(req, res,next){
    // var ninja=new Ninja(req.body);
    // ninja.save();
    //to do the above thing
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
    // res.send({
    //     type: 'POST',
    // name:req.body.name,
    // rank:req.body.rank
});


// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    }).catch(next);
});

// delete a ninja from the db
router.delete('/ninjas/:id', function(req, res,next){
    Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
        res.send(ninja);
    }).catch(next);
    
});

module.exports = router;