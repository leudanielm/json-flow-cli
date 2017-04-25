module.exports = {getType, isPrimitiveType, stripIllegal, capitalise};

function getType(value) {
  return toString.call(value).match(/[A-Z].+[^\]]/)[0].toLowerCase();
}

function isPrimitiveType(value) {
  const primitiveTypes = ['number', 'string', 'date', 'boolean', 'undefined', 'null', 'symbol'];
  return primitiveTypes.includes(getType(value));
}

function stripIllegal(string) {
  return string.replace(/./g, chr => /[a-z]/i.test(chr) ? chr : '');
}

function capitalise(string) {
  return string.replace(/^./, chr => chr.toUpperCase())
}
