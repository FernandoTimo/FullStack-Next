import database from 'database/database';
import ValidateObject from 'libraries/global/Validate';
import UsageSchema from 'models/usage.schema';

export default async function API(req, res) {
	const { method } = req;
	await database();
	switch (method) {
		case 'GET':
			try {
				const usage = await UsageSchema.find();
				res.status(200).json(usage);
			} catch ({ message }) {
				res.status(400).json({ error: message });
			}
			break;
		case 'POST':
			try {
				const body = await ValidateObject(req.body, ['usage']);
				const usage = new UsageSchema(body);
				await usage.save();
				res.status(200).json(usage);
			} catch ({ message }) {
				res.status(400).json({ error: message });
			}
			break;
		case 'PUT':
			try {
				const { _id } = req.body;
				const body = await ValidateObject(req.body, ['usage']);
				const usage = await UsageSchema.findOneAndUpdate({ _id }, body, { 
					new: true, 
				});
				res.status(200).json(usage);
			} catch ({ message }) {
				res.status(400).json({ error: message });
			}
			break;
		case 'DELETE':
			try {
				const { _id } = req.body;
				await UsageSchema.findOneAndDelete({ _id });
				res.status(200).json({ ok: true });
			} catch ({ message }) {
				res.status(400).json({ error: message });
			}
			break;
		default:
			res.status(405).json({
				message: 'Method not allowed',
			});
			break;
	}
}
