import database from "database/database";
import cloudinary from "cloudinary";
import { IncomingForm } from "formidable";
cloudinary.config({
  cloud_name: "timoideas",
  api_key: "315428361168546",
  api_secret: "-xfXhoTPzG2CSPzld6A2k9LzfQQ",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function API(req, res) {
  const { method } = req;
  await database();

  switch (method) {
    case "GET":
      try {
        const upload = "await UploadSchema.find()";
        res.status(200).json(upload);
      } catch ({ message }) {
        res.status(400).json({ error: message });
      }
      break;
    default:
      res.status(405).json({
        message: "Method not allowed",
      });
      break;
  }
}
