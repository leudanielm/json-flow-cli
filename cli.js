#!/usr/bin/env node
const argv = require('yargs').argv;
const toFlowDefinition = require('./src/toFlowDefinition');

if (argv.help) {
  return help();
}

if (argv.name) {
  process.stdin.setEncoding('utf8');
  let finalChunk = '';
  process.stdin.on('readable', () => {
    var chunk = process.stdin.read();
    if (chunk !== null) {
      finalChunk += chunk;
    }
  });
  process.stdin.on('end', () => {
    process.stdout.write(toFlowDefinition(argv.name, finalChunk));
  });
} else {
  help();
}

function help() {
  console.log(`
  Generate flow types from JSON without any schemas.

  Usage examples:
    cat some-json-file.json | json-flow [options]
    curl http://some-web-api/json-response | json-flow [options]

  Options:

  --name={schema}      Used to generate the name of your flow types
  --help               Displays this help.
`);
}
