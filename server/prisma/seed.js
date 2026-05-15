// ============================================================================
// Seed de datos iniciales — Categorías predefinidas
// RF-SOL-01: Categorías predefinidas para solicitudes
// RN-07: Excluye categorías de riesgo (Medicina, Electricidad, Conducción)
// ============================================================================

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const CATEGORIAS_INICIALES = [
  {
    nombre: 'Compras',
    descripcion: 'Ayuda con compras de supermercado, farmacia u otros productos básicos.',
  },
  {
    nombre: 'Trámites',
    descripcion: 'Acompañamiento o gestión de trámites bancarios, municipales o de salud.',
  },
  {
    nombre: 'Acompañamiento',
    descripcion: 'Compañía para paseos, visitas médicas o actividades recreativas.',
  },
  {
    nombre: 'Limpieza del hogar',
    descripcion: 'Ayuda con tareas de limpieza y orden en el hogar.',
  },
  {
    nombre: 'Tecnología',
    descripcion: 'Asistencia con uso de celular, computador o aplicaciones.',
  },
  {
    nombre: 'Jardinería',
    descripcion: 'Mantenimiento básico de jardín: cortar césped, regar plantas.',
  },
  {
    nombre: 'Otros',
    descripcion: 'Otras tareas que no impliquen riesgo físico, legal o médico.',
  },
];

async function main() {
  console.log('🌱 Iniciando seed de categorías...');

  for (const categoria of CATEGORIAS_INICIALES) {
    const result = await prisma.categoria.upsert({
      where: { nombre: categoria.nombre },
      update: {},
      create: categoria,
    });
    console.log(`  ✅ Categoría: ${result.nombre}`);
  }

  console.log('🌱 Seed completado exitosamente.');
}

main()
  .catch((error) => {
    console.error('❌ Error en seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
