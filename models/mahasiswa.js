const mongoose = require('mongoose');

const MahasiswaSchema = new mongoose.Schema({
  nim: { type: String, required: true, unique: true },
  nama: { type: String, required: true },
  jurusan: { type: String, required: true },
  angkatan: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Mahasiswa', MahasiswaSchema);