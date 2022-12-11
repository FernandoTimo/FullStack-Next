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
        const _ids = await Promise.all(
          [
            [ipSchema, ip],
            [browserSchema, browser],
            [deviceSchema, device],
            [countrySchema, country],
            [regionSchema, region],
            [citySchema, city],
            [osSchema, os],
          ].map(async ([schema, value]) => {
            const { _id } = await schema.findOneAndUpdate(
              { name: value },
              { name: value },
              { upsert: true, new: true }
            );
            return _id;
          })
        );
        const usage_keys = [
          ["ips", "ip"],
          ["browsers", "browser"],
          ["devices", "device"],
          ["countries", "country"],
          ["regions", "region"],
          ["cities", "city"],
          ["oss", "os"],
        ];
        const usage = await usageSchema
          .findOne({ route }, (err, doc) => {
            if (err) return console.log(err);
            if (doc) {
              usage_keys.forEach(([_p, _s], i) => {
                doc[_p].find((elem) => elem[_s].equals(_ids[i]))
                  ? doc[_p].find((elem) => elem[_s].equals(_ids[i])).counter++
                  : doc[_p].push({ [_s]: _ids[i], counter: 1 });
              });
              doc.save();
            } else {
              const newusage = new usageSchema({
                route,
                ...usage_keys.reduce(
                  (acc, [_p, _s], i) => ({
                    ...acc,
                    [_p]: [{ [_s]: _ids[i], counter: 1 }],
                  }),
                  {}
                ),
              });
              newusage.save();
            }
          })
          .clone();
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
