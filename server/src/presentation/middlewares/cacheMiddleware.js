// ============================================================================
// Middleware: Cache
// Capa: Presentation
// ============================================================================

const redisClient = require('../../infrastructure/redisClient');

const cacheMiddleware = (key) => {
  return async (req, res, next) => {
    try {
      const cachedData = await redisClient.get(key);
      
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
      
      // Añadimos la key al request para que el controlador pueda guardar la data
      req.cacheKey = key;
      next();
    } catch (error) {
      console.error('Error en cacheMiddleware:', error);
      next(); // Si falla Redis, continuamos procesando la request sin caché
    }
  };
};

module.exports = cacheMiddleware;
