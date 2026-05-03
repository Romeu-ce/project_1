const express = require('express');
const pool = require('./labTest');

const app = express();
app.use(express.json());
console.log("SERVER FILE LOADED");
// GET all users
app.get('/coaches', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM coaches');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST new user
app.post('/coaches', async (req, res) => {
  const {coatch_first_name, coatch_last_name,hourly_pay,salary,birth_date,email,group_id } = req.body;

  try {
    console.log("BODY:", req.body);
    const [result] = await pool.query(
      'INSERT INTO coaches(coatch_first_name,coatch_last_name,hourly_pay,salary,birth_date,email,group_id) VALUES(?,?,?,?,?,?,?)',
      [coatch_first_name, coatch_last_name,hourly_pay,salary,birth_date,email,group_id]
    );
    res.json({
  message: 'Coach created',
  id: result.insertId
});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/coaches/:coatch_id', async (req, res) => {
  const { coatch_id  } = req.params;
  const { coatch_first_name, coatch_last_name, hourly_pay, salary, birth_date, email, group_id } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE coaches SET coatch_first_name=?, coatch_last_name=?, hourly_pay=?, salary=?, birth_date=?, email=?, group_id=? WHERE coatch_id=?',
      [coatch_first_name, coatch_last_name, hourly_pay, salary, birth_date, email, group_id, coatch_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    res.json({ message: 'Coach updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));