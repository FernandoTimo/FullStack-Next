import { Schema, model, models } from "mongoose";
import validator from "mongoose-unique-validator";
const DeviceSchema = new Schema({
  name: { type: String },
});
DeviceSchema.plugin(validator, { message: "El {PATH} debería ser único" });
export default models.Device || model("Device", DeviceSchema);
