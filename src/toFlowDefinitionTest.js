const test = require('tape');
const fs = require('fs');
const { resolve } = require('path');
const toFlowDefinition = require('./toFlowDefinition');
const foo = require('./test-files/foo.json');

test('toFlowDefinition: simple', t => {
  const jsonString = JSON.stringify({
    a: 1,
    b: 2,
  });
  t.equal(
    toFlowDefinition('Simple', JSON.stringify(foo)),
    fs.readFileSync(resolve('./src/test-files/foo.output'), 'utf-8')
  );
  t.end();
});
