const request = require('supertest');

jest.mock('../db', () => ({
  query: jest.fn()
}));

const pool = require('../db');
const { app } = require('../server');

describe('Todo API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET / returns API health response', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Todo API is running!',
      status: 'success'
    });
  });

  it('POST /tasks returns 400 when title is missing', async () => {
    const response = await request(app).post('/tasks').send({ description: 'x' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Title is required' });
  });

  it('GET /tasks returns tasks from database', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          title: 'Test task',
          description: '',
          completed: false,
          created_at: '2026-04-25T00:00:00.000Z'
        }
      ]
    });

    const response = await request(app).get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);
    expect(response.body.tasks[0].title).toBe('Test task');
  });
});
