import { Schema, model, models } from "mongoose";
import validator from "mongoose-unique-validator";
const CountrySchema = new Schema({
  name: { type: String },
});
CountrySchema.plugin(validator, { message: "El {PATH} debería ser único" });
export default models.Country || model("Country", CountrySchema);
