process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRES_IN = '1h';

const { mockDeep, mockReset } = require('jest-mock-extended');
const { PrismaClient } = require('@prisma/client');

const mockPrisma = mockDeep();

jest.mock('../src/infrastructure/database/prismaClient', () => mockPrisma);
jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue('OK'),
    on: jest.fn(),
    quit: jest.fn(),
  }));
});

beforeEach(() => {
  mockReset(mockPrisma);
});

module.exports = { prismaMock: mockPrisma };
