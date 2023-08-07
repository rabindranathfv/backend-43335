import { mongoose } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { collection as collectionBussiness } from "./bussiness.model.js";
import { collection as collectionUsers } from "./user.model.js";

export const collection = "Orders";

// TODO: Check
// mongoose.Schema.Types.ObjectId;
const schema = new mongoose.Schema({
  number: Number,
  products: [],
  totalPrice: Number,
  status: String,
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collectionUsers,
  },
  bussiness: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collectionBussiness,
  },
});

schema.plugin(mongoosePaginate);
const orderModel = mongoose.model(collection, schema);
export default orderModel;
