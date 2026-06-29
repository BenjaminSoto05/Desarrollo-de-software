const request = require('supertest');
const app = require('../../src/app');
const { prismaMock } = require('../setup');
const bcrypt = require('bcryptjs');

describe('Auth E2E Tests', () => {
  it('should register a student', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue({ id: '1', email: 'test@alu.uct.cl', rol: 'ESTUDIANTE' });

    const res = await request(app).post('/api/auth/register/student').send({
      email: 'test@alu.uct.cl',
      password: 'Password123!',
      rut: '12345678-5',
      nombre: 'Juan',
      apellido: 'Perez'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('should login a user', async () => {
    const hash = await bcrypt.hash('Password123!', 10);
    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'test@alu.uct.cl',
      passwordHash: hash,
      rol: 'ESTUDIANTE',
      estado: 'ACTIVO'
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'test@alu.uct.cl',
      password: 'Password123!'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });
});
