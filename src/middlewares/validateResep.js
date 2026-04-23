module.exports = (req, res, next) => {
  const { nama, kategori, tingkat_kesulitan, bahan, langkah } = req.body;

  if (!nama || nama.trim() === '') {
    return res.status(400).json({ message: 'Nama wajib diisi' });
  }

  if (!kategori || kategori.trim() === '') {
    return res.status(400).json({ message: 'Kategori wajib diisi' });
  }

  if (!tingkat_kesulitan || tingkat_kesulitan.trim() === '') {
    return res.status(400).json({ message: 'Tingkat kesulitan wajib diisi' });
  }

  if (!bahan || bahan.length === 0 || bahan.some(b => b.trim() === '')) {
    return res.status(400).json({ message: 'Minimal 1 bahan dan tidak boleh kosong' });
  }

  if (!langkah || langkah.length === 0 || langkah.some(l => l.trim() === '')) {
    return res.status(400).json({ message: 'Minimal 1 langkah dan tidak boleh kosong' });
  }

  next();
};