import Redis from 'ioredis';

let redis;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL, {
    // This is important to prevent ioredis from trying to connect during the build phase
    // if the URL is present but the server is not running.
    lazyConnect: true
  });
} else {
  // Create a mock/dummy client if Redis is not configured.
  // This allows the build to pass without a real Redis connection.
  redis = {
    get: async () => null,
    set: async () => 'OK',
    on: () => {}, // ioredis uses event listeners, so we need a dummy 'on' method
    connect: async () => {}, // and a dummy 'connect' method
  };
}

export default redis;
