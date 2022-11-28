import { Schema, model, models } from 'mongoose';
import validator from 'mongoose-unique-validator';
const ApiSchema = new Schema({
	api: { type: String },
});
ApiSchema.plugin(validator, { message: 'El {PATH} debería ser único' });
export default models.Api || model('Api', ApiSchema);

