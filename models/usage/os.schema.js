import { Schema, model, models } from "mongoose";
import validator from "mongoose-unique-validator";
const OsSchema = new Schema({
  name: { type: String },
});
OsSchema.plugin(validator, { message: "El {PATH} debería ser único" });
export default models.Os || model("Os", OsSchema);
