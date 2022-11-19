import database from 'database/database';

export default async function API(req, res) {
	const { method } = req;
	await database();
	switch (method) {
		case 'GET':
			try {
				const usage = 'await UsageSchema.find()';
				res.status(200).json(usage);
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
