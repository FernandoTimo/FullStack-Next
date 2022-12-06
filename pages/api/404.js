export default async function API(req, res) {
  res.status(404).json({ error: "Not found" });
}
