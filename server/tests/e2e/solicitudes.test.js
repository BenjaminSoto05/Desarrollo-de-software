const request = require('supertest');
const app = require('../../src/app');
const { prismaMock } = require('../setup');
const JwtService = require('../../src/infrastructure/services/JwtService');

describe('Solicitudes E2E Tests', () => {
  let tokenAdultoMayor;
  let tokenEstudiante;

  beforeAll(() => {
    const jwtService = new JwtService(process.env.JWT_SECRET, '1h');
    tokenAdultoMayor = jwtService.generateToken({ id: '1', rol: 'ADULTO_MAYOR' });
    tokenEstudiante = jwtService.generateToken({ id: '2', rol: 'ESTUDIANTE' });
  });

  it('should create a solicitud', async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: '1', rol: 'ADULTO_MAYOR', suspendido: false });
    prismaMock.categoria.findUnique.mockResolvedValue({ id: '550e8400-e29b-41d4-a716-446655440000', nombre: 'Test', activa: true });
    prismaMock.solicitud.create.mockResolvedValue({ id: 'sol-1', titulo: 'Ayuda', estado: 'PENDIENTE' });

    const res = await request(app)
      .post('/api/solicitudes')
      .set('Authorization', `Bearer ${tokenAdultoMayor}`)
      .send({
        titulo: 'Ayuda con compras',
        descripcion: 'Necesito ayuda para ir al supermercado.',
        categoriaId: '550e8400-e29b-41d4-a716-446655440000',
        fechaProgramada: '2026-07-01T10:00:00.000Z',
        horaProgramada: '10:00',
        direccion: 'Calle Falsa 123',
        comuna: 'Temuco'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('should accept a solicitud', async () => {
    prismaMock.solicitud.findUnique.mockResolvedValue({ 
      id: 'sol-1', 
      estado: 'PENDIENTE',
      fechaProgramada: new Date('2026-07-01T10:00:00.000Z')
    });
    prismaMock.solicitud.count.mockResolvedValue(0);
    prismaMock.user.findUnique.mockResolvedValue({ id: '2', rol: 'ESTUDIANTE', suspendido: false });
    prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
    prismaMock.solicitud.update.mockResolvedValue({ id: 'sol-1', estado: 'ACEPTADA' });

    const res = await request(app)
      .post('/api/solicitudes/sol-1/accept')
      .set('Authorization', `Bearer ${tokenEstudiante}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
