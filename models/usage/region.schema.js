import { Schema, model, models } from "mongoose";
import validator from "mongoose-unique-validator";
const RegionSchema = new Schema({
  name: { type: String },
});
RegionSchema.plugin(validator, { message: "El {PATH} debería ser único" });
export default models.Region || model("Region", RegionSchema);
