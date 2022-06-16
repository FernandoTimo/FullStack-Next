import database from 'database/database';
import ValidateObject from 'libraries/global/Validate';
import organizationSchema from 'models/organization.schema';

export default async function Index(req, res) {
  const { method } = req;
  await database();
  switch (method) {
    case 'GET':
      try {
        const organizations = await organizationSchema.find();
        res.status(200).json({ data: organizations });
      } catch ({ message }) {
        res.status(400).json({ error: message });
      }
      break;
    case 'POST':
      try {
        const body = await ValidateObject(req.body, ['']);
        const organization = new organizationSchema(body);
        await organization.save();
        res.status(200).json({ data: organization });
      } catch ({ message }) {
        res.status(400).json({ error: message });
      }
      break;
    case 'PUT':
      try {
        const { id } = req.body;
        const body = await ValidateObject(req.body, ['organization']);
        const organization = await organizationSchema.findOneAndUpdate(
          { _id: id },
          body,
          { new: true }
        );
        res.status(200).json({ data: organization });
      } catch ({ message }) {
        res.status(400).json({ error: message });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        await organizationSchema.findOneAndDelete({ _id: id });
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
