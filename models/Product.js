const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const slug = require('slug');

const productSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    description: String,
    manage_stock: Boolean,
    price: [
      {
        amount: String,
        currency: String,
        includes_tax: Boolean,
      },
    ],
    status: {
      type: { type: String, enum: ['draft', 'live'] },
    },
    commodity_type: {
      type: { type: String, enum: ['physical', 'digital'] },
    },
    dimensions: [
      {
        measurement: { type: String, enum: ['length', 'width', 'height'] },
        unit: String,
        value: String,
      },
    ],
    weight: {
      unit: { type: String, enum: ['g', 'kg', 'lb', 'oz'] },
      value: String,
    },
    meta: {
      stock: {
        level: Number,
        availability: String,
      },
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  },
  { timestamps: true },
);
/* eslint-disable */
productSchema.pre('save', function(next) {
  this.slug = slug(this.name);
  next();
});
/* eslint-enable */

productSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
