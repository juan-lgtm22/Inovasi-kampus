const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Mahasiswa = require('../models/mahasiswa.js');

const app = express();

app.use(cors());
app.use(express.json());

// Hubungkan ke Database MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Terhubung'))
  .catch((err) => console.error('Error MongoDB:', err));

// Route Cek Server
app.get('/', (req, res) => {
  res.send('API CRUD Kampus Siap Digunakan');
});

// 1. CREATE (Tambah Mahasiswa)
app.post('/api/mahasiswa', async (req, res) => {
  try {
    const data = new Mahasiswa(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. READ (Ambil Semua Mahasiswa)
app.get('/api/mahasiswa', async (req, res) => {
  try {
    const data = await Mahasiswa.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. UPDATE (Edit Mahasiswa berdasarkan ID)
app.put('/api/mahasiswa/:id', async (req, res) => {
  try {
    const data = await Mahasiswa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. DELETE (Hapus Mahasiswa berdasarkan ID)
app.delete('/api/mahasiswa/:id', async (req, res) => {
  try {
    await Mahasiswa.findByIdAndDelete(req.params.id);
    res.json({ message: 'Data mahasiswa berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Menjalankan di port lokal saat dites lokal
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
}

module.exports = app;