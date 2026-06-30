const request = require('supertest');
const app = require('../../src/app');
const { prismaMock } = require('../setup');
const JwtService = require('../../src/infrastructure/services/JwtService');

describe('Evaluaciones E2E Tests', () => {
  let tokenAdultoMayor;

  beforeAll(() => {
    const jwtService = new JwtService(process.env.JWT_SECRET, '1h');
    tokenAdultoMayor = jwtService.generateToken({ id: '1', rol: 'ADULTO_MAYOR' });
  });

  it('should create an evaluacion', async () => {
    prismaMock.solicitud.findUnique.mockResolvedValue({
      id: '550e8400-e29b-41d4-a716-446655440000',
      estado: 'COMPLETADA',
      solicitanteId: '1',
      voluntarioId: '2'
    });
    prismaMock.evaluacion.findFirst.mockResolvedValue(null);
    prismaMock.evaluacion.create.mockResolvedValue({
      id: 'eval-1',
      puntuacion: 5,
      comentario: 'Excelente ayuda'
    });

    const res = await request(app)
      .post('/api/evaluaciones')
      .set('Authorization', `Bearer ${tokenAdultoMayor}`)
      .send({
        solicitudId: '550e8400-e29b-41d4-a716-446655440000',
        puntuacion: 5,
        comentario: 'Excelente ayuda'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });
});
