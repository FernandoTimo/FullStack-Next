import { Schema, model, models } from 'mongoose';
import validator from 'mongoose-unique-validator';
const OrganizationSchema = new Schema({
  organization: { type: String },
});
OrganizationSchema.plugin(validator, {
  message: 'El {PATH} debería ser único',
});
export default models.Organization || model('Organization', OrganizationSchema);
