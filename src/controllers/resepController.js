const resepModel = require('../models/resepModel');

const getAllResep = async (req, res) => {
  try {
    const data = await resepModel.getResep({
      kategori: req.query.kategori,
      tingkatKesulitan: req.query.tingkatKesulitan,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createResep = async (req, res) => {
  try {
    const result = await resepModel.createResep(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteResep = async (req, res) => {
  try {
    const id = req.params.id;

    await resepModel.deleteResep(id);

    return res.status(200).json({
      success: true,
      message: 'Resep berhasil dihapus'
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  getAllResep,
  createResep,
  deleteResep,
};