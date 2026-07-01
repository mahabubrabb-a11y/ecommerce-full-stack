/**const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
     
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    cus_name : {type: String},
    cus_city : {type: String},
    cus_add : {type: String},
    cus_country : {type : String},
    cus_fas : {type : String},
    cus_phone : {type: String},
    cus_postcode: {type : String},
    cus_state : {type : String},

    //shipping schema 
    ship_name: { type: String, required: true },
    ship_phone: { type: String, required: true },

    ship_address: { type: String, required: true },
    ship_city: { type: String, required: true },
    ship_state: { type: String },
    ship_postcode: { type: String },

    ship_country: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//hash password
DataSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//compare password method 
DataSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};


const adminModel = mongoose.model('admin', DataSchema);
module.exports = adminModel;**/


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    //  Customer Info
    customer: {
      name: String,
      city: String,
      address: String,
      country: String,
      fax: String,
      phone: String,
      postcode: String,
      state: String,
    },

    //  Shipping Info
    shipping: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: String,
      postcode: String,
      country: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//  hash password
DataSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// compare password
DataSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const adminModel = mongoose.model('admin', DataSchema);
module.exports = adminModel;