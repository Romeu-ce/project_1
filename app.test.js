const request = require('supertest');
const app = require('./blabla');

// "Підробляємо" підключення до БД — реальна MySQL не потрібна
jest.mock('./labTest', () => ({
  query: jest.fn(),
  end: jest.fn()
}));

const pool = require('./labTest');

afterAll(async () => {
  await pool.end();
});

// --- GET /coaches ---
test('GET /coaches повертає список тренерів', async () => {
  // Імітуємо що БД повернула двох тренерів
  pool.query.mockResolvedValue([[
    { coatch_id: 1, coatch_first_name: 'Іван' },
    { coatch_id: 2, coatch_first_name: 'Петро' }
  ]]);

  const res = await request(app).get('/coaches');

  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

// --- POST /coaches ---
test('POST /coaches створює нового тренера', async () => {
  // Імітуємо що БД успішно додала запис
  pool.query.mockResolvedValue([{ insertId: 42 }]);

  const res = await request(app).post('/coaches').send({
    coatch_first_name: 'Тест',
    coatch_last_name: 'Тестовий',
    hourly_pay: 100,
    salary: 5000,
    birth_date: '1990-01-01',
    email: 'test@test.com',
    group_id: 1
  });

  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Coach created');
  expect(res.body.id).toBe(42);
});

// --- PUT /coaches/:id ---
test('PUT /coaches/999 повертає 404 якщо тренер не існує', async () => {
  // Імітуємо що БД не знайшла жодного запису
  pool.query.mockResolvedValue([{ affectedRows: 0 }]);

  const res = await request(app)
    .put('/coaches/999')
    .send({ coatch_first_name: 'Новий' });

  expect(res.status).toBe(404);
});
