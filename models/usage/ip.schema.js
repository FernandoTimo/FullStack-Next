import { Schema, model, models } from "mongoose";
import validator from "mongoose-unique-validator";
const IpSchema = new Schema({
  name: { type: String },
});
IpSchema.plugin(validator, { message: "El {PATH} debería ser único" });
export default models.Ip || model("Ip", IpSchema);
