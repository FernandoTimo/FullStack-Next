export default function toLowerKeysAndValues(obj) {
  try {
    if (typeof obj !== "object") {
      throw new Error("toLowerKeys: El argumento debe ser un objeto");
    }
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      const newKey = key.toLowerCase();
      const value = obj[key];
      if (typeof value === "object") {
        newObj[newKey] = toLowerKeysAndValues(value);
      } else {
        newObj[newKey] = value.toString().toLowerCase();
      }
    });

    return newObj;
  } catch (error) {
    console.error(error);
  }
}
