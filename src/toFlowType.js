const {
  capitalise,
  getType,
  isPrimitiveType,
  stripIllegal,
} = require('./util');

module.exports = function toFlowType(name, object, typesArray = {}) {

  let typeName = getTypeName();
  getSubTypeArray(typeName).push(`type ${typeName} = {`);

  if (getType(object) === 'object') {

    for (let prop in object) {

      const targetValue = object[prop];
      const isObject = getType(targetValue) === 'object';
      const isEmptyObject = isObject && !Object.keys(targetValue).length;
      const isArray = getType(targetValue) === 'array';

      if (isPrimitiveType(targetValue) || isEmptyObject) {

        const flowOptional = !targetValue ? '?' : '';
        const flowValue = !targetValue ? 'any' : getType(targetValue);
        addFlowEntry(`  ${prop}${flowOptional}: ${flowValue},`);

      } else if (isObject) {

        const filteredProp = capitalise(stripIllegal(prop));
        addTypeName(`${typeName}${filteredProp}`);
        addFlowEntry(`  ${prop}: ${typeName}${filteredProp},`);
        toFlowType(filteredProp, targetValue, typesArray);

      } else if (isArray) {

        parseArray(targetValue[0], prop);

      }

    }

  } else if (getType(object) === 'array') {

    parseArray(object[0], typeName);

  }

  getSubTypeArray(typeName).push('};\n');

  return typesArray;

  function parseArray(firstItemInValue, propName) {

    const isFirstItemPrimitive = isPrimitiveType(firstItemInValue);
    const filteredProp = capitalise(stripIllegal(propName));

    if (isFirstItemPrimitive && Boolean(firstItemInValue)) {

      addFlowEntry(`  ${filteredProp}: Array<${getType(firstItemInValue)}>,`);

    } else if (!isFirstItemPrimitive && Boolean(firstItemInValue)) {

      addTypeName(`${typeName}${filteredProp}`);
      addFlowEntry(`  ${filteredProp}: Array<${typeName}${filteredProp}>,`);
      toFlowType(typeName, firstItemInValue, typesArray);

    } else {

      addFlowEntry(`  ${filteredProp}?: any,`);

    }
  }

  function getSubTypeArray(typeName) {
    return (typesArray[typeName] || (typesArray[typeName] = []));
  }

  function addTypeName(typeName) {
    const { __name: name } = typesArray;
    const checkedTypeName = name.includes(typeName) ?
      `${typeName}${name.filter(name => name === typeName).length}` :
      typeName;

    name.push(checkedTypeName);
  }

  function addFlowEntry(entryLine) {
    getSubTypeArray(typeName).push(entryLine);
  }

  function getTypeName() {
    const capitalisedName = capitalise(name);
    const isInitialised = Object.keys(typesArray).length;

    if (!isInitialised) {
      typesArray.__name = [capitalisedName];
    }

    return typesArray.__name.slice(-1)[0];
  }
}
