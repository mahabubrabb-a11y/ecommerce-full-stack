const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    product_name: {
      type: String,
      required: true,
    },

    color: {
      type: String,
    },

    size: {
      type: String,
      required: true,
    },

    qty: {
      type: Number,
      required: true,
      default: 1,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const cartModel = mongoose.model('Cart', DataSchema);

module.exports = cartModel;