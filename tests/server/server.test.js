const request = require('supertest');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = require('../../server/src/index');

describe('Server Tests', () => {
  let io, server;

  beforeAll((done) => {
    server = createServer(app);
    io = new Server(server);
    server.listen(4001, done);
  });

  afterAll(() => {
    io.close();
    server.close();
  });

  test('Handles socket connections', (done) => {
    const client = require('socket.io-client')('http://localhost:4001');
    client.on('connect', () => {
      client.disconnect();
      done();
    });
  });
});
