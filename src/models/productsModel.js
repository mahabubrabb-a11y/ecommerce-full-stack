const mongoose = require('mongoose')
const categoryModel = require('./categoryModel')

const DataSchema = new mongoose.Schema(
{
   title : {type: String},
   Image : {type : String},
   sort_description : {type: String},
   price : {type:Number},
   is_discount : {type: Boolean},
   discount : {type: Boolean},
   remark : {type: String},
   Stock : {type: Number},
   color : {type : String},
   Size : {type: String},
   Description : {type: String},

   category_id : {type: mongoose.Schema.ObjectId, required:true},
   brand_id : {type: mongoose.Schema.ObjectId, required: true}
},

 {
    timestamps : true,
    versionKey : false,
 }

)

const prouctsModel = mongoose.model('Product', DataSchema)
module.exports = prouctsModel;