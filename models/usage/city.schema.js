import { Schema, model, models } from "mongoose";
import validator from "mongoose-unique-validator";
const CitySchema = new Schema({
  name: { type: String },
});
CitySchema.plugin(validator, { message: "El {PATH} debería ser único" });
export default models.City || model("City", CitySchema);
