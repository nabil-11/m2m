const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    pName: {
      type: String,
      required: true,
    },
    UserName: {
      type: String,
      required: true,
  },
    UserId: {
      type: String,
      required: true,
  },
    pDescription: {
      type: String,
      required: true,
    },
    pPrice: {
      type: Number,
      required: true,
    },
    pSold: {
      type: Number,
      default: 0,
    },
 
    pCategory: {
      type: String,
      required: true,
    },
    pLocation: {
      type: String,
      required: true,
    },

    pImage: {
      type: String,
      required: true,
    },
    liked :{
      type: Array,
      default: []
    }
  
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
