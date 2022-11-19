import { Schema, model, models } from 'mongoose';
import validator from 'mongoose-unique-validator';
const UsageSchema = new Schema({
	usage: { type: String },
});
UsageSchema.plugin(validator, { message: 'El {PATH} debería ser único' });
export default models.Usage || model('Usage', UsageSchema);

