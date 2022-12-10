export default function dynamicParse(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    try {
      acc[key] = JSON.parse(obj[key]);
    } catch (error) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
