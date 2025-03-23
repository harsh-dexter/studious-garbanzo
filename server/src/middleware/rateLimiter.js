const rateLimit = require('socket.io-ratelimit');

module.exports = rateLimit({
  duration: 60000, // 1 minute window
  max: 100, // Max 100 events per minute
  error: (socket, error) => {
    socket.emit('rate_limit', { message: 'Too many requests' });
    socket.disconnect();
  }
});
