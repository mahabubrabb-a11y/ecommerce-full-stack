const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    logo: {
      type: String, // image URL
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//  Auto slug generate
brandSchema.pre('save', function (next) {
  if (this.name) {
    this.slug = this.name.toLowerCase().replace(/ /g, '-');
  }
  next();
});

const brandModel = mongoose.model('Brand', DataSchema);
module.exports = brandModel;