import database from 'database/database';
import ValidateObject from 'libraries/global/Validate';
import IpSchema from 'models/ip.schema';

export default async function API(req, res) {
	const { method } = req;
	await database();
	switch (method) {
		case 'GET':
			try {
				const ip = await IpSchema.find();
				res.status(200).json(ip);
			} catch ({ message }) {
				res.status(400).json({ error: message });
			}
			break;
		case 'POST':
			try {
				const body = await ValidateObject(req.body, ['ip']);
				const ip = new IpSchema(body);
				await ip.save();
				res.status(200).json(ip);
			} catch ({ message }) {
				res.status(400).json({ error: message });
			}
			break;
		case 'PUT':
			try {
				const { _id } = req.body;
				const body = await ValidateObject(req.body, ['ip']);
				const ip = await IpSchema.findOneAndUpdate({ _id }, body, { 
					new: true, 
				});
				res.status(200).json(ip);
			} catch ({ message }) {
				res.status(400).json({ error: message });
			}
			break;
		case 'DELETE':
			try {
				const { _id } = req.body;
				await IpSchema.findOneAndDelete({ _id });
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
