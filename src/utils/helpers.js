const generateId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

const appendYearsToDate = (date, yearsToAppend) => {
  const end = date.getFullYear() + yearsToAppend;
  return new Date(end.toString());
};

module.exports = {
  generateId,
  appendYearsToDate,
};
