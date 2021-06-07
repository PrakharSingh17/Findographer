const mongoose=require('mongoose');
const Schema=mongoose.Schema;


//create geolocation schema
const GeoSchema=new Schema({
    type:{
        type:String,
        default:"Point"
    },
    coordinates:{
        type:[Number],
        index:"2dsphere"
    }
});

//create ninja schema & model
const NinjaSchema=new Schema({
    name:{
        type:String,
        required:[true,'Name field is required ']
    },
    type:{
        type:String
    },
    available:{
        type:Boolean,
        default:false
    }, 
    //add in geo loc
    "geometry": GeoSchema
});

const Ninja=mongoose.model('ninja', NinjaSchema);
module.exports=Ninja;