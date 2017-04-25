const toFlowType = require('./toFlowType');

module.exports = function toFlowDefinition(name, jsonString) {
  const parsed = toFlowType(name, JSON.parse(jsonString));
  delete parsed.__name;
  return Object.keys(parsed).map(key => parsed[key].join('\n')).join('\n');
}
