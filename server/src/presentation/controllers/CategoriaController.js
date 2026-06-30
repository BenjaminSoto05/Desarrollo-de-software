// ============================================================================
// Controller: Categorías
// Capa: Presentation
// ============================================================================

class CategoriaController {
  /**
   * @param {Object} useCases
   */
  constructor(useCases) {
    this.getCategorias = useCases.getCategorias;
    this.handleGetAll = this.handleGetAll.bind(this);
  }

  /**
   * GET /api/categorias
   * Lista categorías activas para el formulario de creación
   */
  async handleGetAll(req, res, next) {
    try {
      const categorias = await this.getCategorias.execute();
      
      const response = {
        success: true,
        data: categorias,
      };

      if (req.cacheKey) {
        const redisClient = require('../../infrastructure/redisClient');
        await redisClient.set(req.cacheKey, JSON.stringify(response), 'EX', 3600);
      }

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoriaController;
