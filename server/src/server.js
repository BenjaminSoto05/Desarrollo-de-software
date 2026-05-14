// ============================================================================
// Entry Point del Servidor — server.js
// Capa: Infrastructure (arranque y configuración)
// ============================================================================

require('dotenv').config();

const app = require('./app');
const prisma = require('./infrastructure/database/prismaClient');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Verificar conexión a la base de datos
    await prisma.$connect();
    console.log('✅ Conexión a PostgreSQL establecida.');

    // Iniciar servidor HTTP
    app.listen(PORT, () => {
      console.log(`🚀 Servidor UCT-Vínculo Mayor corriendo en http://localhost:${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Cerrando servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
