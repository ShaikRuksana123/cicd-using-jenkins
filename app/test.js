const assert = require('assert');
const { createServer } = require('./server');
const http = require('http');

const server = createServer().listen(3000, () => {
  http.get('http://localhost:3000', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        assert.strictEqual(data, 'Hello');
        console.log('Test passed');
        server.close();
        process.exit(0);
      } catch (err) {
        console.error('Test failed', err);
        server.close();
        process.exit(1);
      }
    });
  }).on('error', (e) => {
    console.error('Request error', e);
    server.close();
    process.exit(1);
  });
});