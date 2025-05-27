export const buildSearchConditions = (fields) => {
  const condition = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value && typeof value === "string" && value.trim() !== "") {
      condition[key] = { $regex: value.trim(), $options: "i" };
    }
  }
  return condition;
};