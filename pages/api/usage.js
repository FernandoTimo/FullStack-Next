import database from "database/database";
import toLowerKeysAndValues from "libraries/global/toLowerKeysAndValues";
import ValidateObject from "libraries/global/Validate";
import browserSchema from "models/usage/browser.schema";
import citySchema from "models/usage/city.schema";
import countrySchema from "models/usage/country.schema";
import deviceSchema from "models/usage/device.schema";
import ipSchema from "models/usage/ip.schema";
import osSchema from "models/usage/os.schema";
import regionSchema from "models/usage/region.schema";
import usageSchema from "models/usage/usage.schema";

export default async function API(req, res) {
  const { method } = req;
  await database();
  switch (method) {
    case "GET":
      try {
        const usage = await usageSchema.find();
        res.status(200).json(usage);
      } catch ({ message }) {
        res.status(400).json({ error: message });
      }
      break;
    case "POST":
      try {
        const { authorization } = req.headers;
        if (!authorization || authorization !== process.env.USAGE_API_SEED) {
          console.log("Unauthorized");
          res.status(401).json({ error: "Unauthorized" });
          return;
        }
        const {
          route,
          ip,
          user_agent: {
            name: browser,
            device: { type: device },
            os: { name: os },
          },
          location: {
            country: { name: country },
            region: { name: region },
            city,
          },
        } = toLowerKeysAndValues(req.body);

        const { _id: browser_id } = await browserSchema.findOneAndUpdate(
          { name: browser },
          { name: browser },
          { upsert: true, new: true }
        );
        const { _id: device_id } = await deviceSchema.findOneAndUpdate(
          { name: device },
          { name: device },
          { upsert: true, new: true }
        );
        const { _id: ip_id } = await ipSchema.findOneAndUpdate(
          { name: ip },
          { name: ip },
          { upsert: true, new: true }
        );
        const { _id: country_id } = await countrySchema.findOneAndUpdate(
          { name: country },
          { name: country },
          { upsert: true, new: true }
        );
        const { _id: region_id } = await regionSchema.findOneAndUpdate(
          { name: region },
          { name: region },
          { upsert: true, new: true }
        );
        const { _id: city_id } = await citySchema.findOneAndUpdate(
          { name: city },
          { name: city },
          { upsert: true, new: true }
        );
        const { _id: os_id } = await osSchema.findOneAndUpdate(
          { name: os },
          { name: os },
          { upsert: true, new: true }
        );
        const usage = await usageSchema.findOneAndUpdate(
          {
            route,
            "ips._id": ip_id,
            "browsers._id": browser_id,
            "devices._id": device_id,
            "os._id": os_id,
            "countries._id": country_id,
            "regions._id": region_id,
            "cities._id": city_id,
          },
          {
            $inc: { count: 1 },
            $set: { route },
            $addToSet: {
              ips: { _id: ip_id, count: 1 },
              browsers: { _id: browser_id, count: 1 },
              devices: { _id: device_id, count: 1 },
              os: { _id: os_id, count: 1 },
              countries: { _id: country_id, count: 1 },
              regions: { _id: region_id, count: 1 },
              cities: { _id: city_id, count: 1 },
            },
          },
          { upsert: true, new: true }
        );
        res.status(200).json(usage);
      } catch ({ message }) {
        res.status(400).json({ error: message });
      }
      break;
    case "PUT":
      try {
        const { _id } = req.body;
        const body = await ValidateObject(req.body, ["route", "registros"]);
        const usage = await usageSchema.findOneAndUpdate({ _id }, body, {
          new: true,
        });
        res.status(200).json(usage);
      } catch ({ message }) {
        res.status(400).json({ error: message });
      }
      break;
    case "DELETE":
      try {
        const { _id } = req.body;
        await usageSchema.findOneAndDelete({ _id });
        res.status(200).json({ ok: true });
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
