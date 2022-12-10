import { Schema, model, models } from "mongoose";
import validator from "mongoose-unique-validator";
import "./ip.schema";

const UsageSchema = new Schema({
  route: { type: String },
  ips: [
    {
      _id: false,
      ip: { type: Schema.Types.ObjectId, ref: "Ip" },
      counter: { type: Number, default: 1 },
    },
  ],
  countries: [
    {
      _id: false,
      country: { type: Schema.Types.ObjectId, ref: "Country" },
      counter: { type: Number, default: 1 },
    },
  ],
  regions: [
    {
      _id: false,
      region: { type: Schema.Types.ObjectId, ref: "Region" },
      counter: { type: Number, default: 1 },
    },
  ],
  cities: [
    {
      _id: false,
      city: { type: Schema.Types.ObjectId, ref: "City" },
      counter: { type: Number, default: 1 },
    },
  ],
  browsers: [
    {
      _id: false,
      browser: { type: Schema.Types.ObjectId, ref: "Browser" },
      counter: { type: Number, default: 1 },
    },
  ],
  oss: [
    {
      _id: false,
      os: { type: Schema.Types.ObjectId, ref: "Os" },
      counter: { type: Number, default: 1 },
    },
  ],
  devices: [
    {
      _id: false,
      device: { type: Schema.Types.ObjectId, ref: "Device" },
      counter: { type: Number, default: 1 },
    },
  ],
});
UsageSchema.plugin(validator, { message: "El {PATH} debería ser único" });
export default models.Usage || model("Usage", UsageSchema);
