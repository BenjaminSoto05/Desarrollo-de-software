// ============================================================================
// Redis Client
// Capa: Infrastructure
// ============================================================================

const Redis = require('ioredis');

const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

redisClient.on('error', (err) => {
  console.error('Error de conexión con Redis:', err);
});

redisClient.on('connect', () => {
  console.log('✅ Conectado a Redis exitosamente.');
});

module.exports = redisClient;
