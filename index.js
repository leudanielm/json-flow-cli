const toFlowDefinition = require('./src/toFlowDefinition');

process.stdin.setEncoding('utf8');

let finalChunk = '';
process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    finalChunk += chunk;
  }
});

process.stdin.on('end', () => {
  console.log(toFlowDefinition(process.argv[3], finalChunk));
});
