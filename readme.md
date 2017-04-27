# JSON Flow CLI
## Generate flow types from JSON streams without any schemas.

### Installation
```
npm install json-flow-cli -g
```

### Usage

```
cat some-json-file.json | json-flow [options]
curl http://some-web-api/json-response | json-flow [options]

Options:

--name={schema}      Used to generate the name of your flow types
--help               Displays this help.
```

### Example

#### [Input](src/test-files/foo.json)
```json
{
  "somePropA": {
    "somePropB": {
      "someOtherPropA": 1,
      "someOtherPropB": 2
    },
    "someOtherPropC": [
      {
        "somePropD": {
          "somePropE": {}
        }
      },
      {
        "somePropD": {
          "somePropF": {}
        }
      },
      {
        "somePropD": {
          "somePropG": {}
        }
      }
    ]
  }
}

```

Run json-flow-cli against the above input:

```
cat src/test-files/foo.json | json-flow-cli --name Simple > foo.output
```

#### [Output](src/test-files/foo.output)

```javascript
type Simple = {
  somePropA: SimpleSomePropA,
};

type SimpleSomePropA = {
  somePropB: SimpleSomePropASomePropB,
  SomeOtherPropC: Array<SimpleSomePropASomeOtherPropC>,
};

type SimpleSomePropASomePropB = {
  someOtherPropA: number,
  someOtherPropB: number,
};

type SimpleSomePropASomeOtherPropC = {
  somePropD: SimpleSomePropASomeOtherPropCSomePropD,
};

type SimpleSomePropASomeOtherPropCSomePropD = {
  somePropE: object,
};
```
