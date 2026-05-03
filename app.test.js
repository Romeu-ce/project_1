const request = require('supertest');
const app = require('./blabla');
const pool = require('./labTest');

// Після всіх тестів закриваємо підключення до БД
afterAll(async () => {
  await pool.end();
});

// --- GET /coaches ---
test('GET /coaches повертає список тренерів', async () => {
  const res = await request(app).get('/coaches');

  expect(res.status).toBe(200);        // сервер відповів OK
  expect(Array.isArray(res.body)).toBe(true); // повернув масив
});

// --- POST /coaches ---
test('POST /coaches створює нового тренера', async () => {
  const newCoach = {
    coatch_first_name: 'Тест',
    coatch_last_name: 'Тестовий',
    hourly_pay: 100,
    salary: 5000,
    birth_date: '1990-01-01',
    email: 'test@test.com',
    group_id: 1
  };

  const res = await request(app).post('/coaches').send(newCoach);

  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Coach created'); // правильне повідомлення
  expect(res.body.id).toBeDefined();              // повернув id
});

// --- PUT /coaches/:id ---
test('PUT /coaches/999 повертає 404 якщо тренер не існує', async () => {
  const res = await request(app)
    .put('/coaches/999999')
    .send({ coatch_first_name: 'Новий' });

  expect(res.status).toBe(404); // тренер не знайдений
});