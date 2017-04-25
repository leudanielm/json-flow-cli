const test = require('tape');
const toFlowType = require('./toFlowType');

test('toFlowType: simple scenario', t => {
  const obj = {
    a: 1,
    b: 2,
  };
  const parsed = toFlowType('Simple', obj);
  t.deepEqual(parsed, {
    __name: [ 'Simple' ],
    Simple: [ 'type Simple = {', '  a: number,', '  b: number,', '};\n' ]
  });
  t.end();
});

test('toFlowType: somewhat complex', t => {
  const obj = {
    somePropA: {
      somePropB: { someOtherPropA: 1, someOtherPropB: 2 },
      someOtherPropC: [
        { somePropD: { somePropE: {} }},
        { somePropD: { somePropF: {} }},
        { somePropD: { somePropG: {} }}
      ]
    }
  };
  const parsed = toFlowType('Complex', obj);
  t.deepEqual(parsed,
    { __name:
     [ 'Complex',
       'ComplexSomePropA',
       'ComplexSomePropASomePropB',
       'ComplexSomePropASomeOtherPropC',
       'ComplexSomePropASomeOtherPropCSomePropD' ],
    Complex: [ 'type Complex = {', '  somePropA: ComplexSomePropA,', '};\n' ],
    ComplexSomePropA:
     [ 'type ComplexSomePropA = {',
       '  somePropB: ComplexSomePropASomePropB,',
       '  SomeOtherPropC: Array<ComplexSomePropASomeOtherPropC>,',
       '};\n' ],
    ComplexSomePropASomePropB:
     [ 'type ComplexSomePropASomePropB = {',
       '  someOtherPropA: number,',
       '  someOtherPropB: number,',
       '};\n' ],
    ComplexSomePropASomeOtherPropC:
     [ 'type ComplexSomePropASomeOtherPropC = {',
       '  somePropD: ComplexSomePropASomeOtherPropCSomePropD,',
       '};\n' ],
    ComplexSomePropASomeOtherPropCSomePropD:
     [ 'type ComplexSomePropASomeOtherPropCSomePropD = {',
       '  somePropE: object,',
       '};\n' ] });
  t.end();
});
