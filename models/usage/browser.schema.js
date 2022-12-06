import { Schema, model, models } from "mongoose";
import validator from "mongoose-unique-validator";
const BrowserSchema = new Schema({
  name: { type: String },
});
BrowserSchema.plugin(validator, { message: "El {PATH} debería ser único" });
export default models.Browser || model("Browser", BrowserSchema);
