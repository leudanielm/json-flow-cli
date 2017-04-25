const test = require('tape');
const {getType, isPrimitiveType, stripIllegal, capitalise} = require('./util');

test('getType', t => {
  t.equal(getType([]), 'array');
  t.equal(getType({}), 'object');
  t.equal(getType(1), 'number');
  t.equal(getType('foo'), 'string');
  t.end();
});

test('isPrimitiveType', t => {
  t.equal(isPrimitiveType('string'), true);
  t.equal(isPrimitiveType('number'), true);
  t.equal(isPrimitiveType('symbol'), true);
  t.end();
});

test('stripIllegal', t => {
  t.equal(stripIllegal('@@@@3322@@11@@@ddd'), 'ddd');
  t.equal(stripIllegal('foo-Bar-baZ'), 'fooBarbaZ');
  t.end();
});

test('capitalise', t => {
  t.equal(capitalise('foobar'), 'Foobar');
  t.end();
});
