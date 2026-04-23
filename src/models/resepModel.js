const pool = require("../config/db");

const getResep = async ({ kategori, tingkatKesulitan, page, limit }) => {
  const offset = (page - 1) * limit;

  let query = `SELECT * FROM resep WHERE 1=1`;
  const values = [];

  if (kategori) {
    values.push(kategori);
    query += ` AND kategori = $${values.length}`;
  }

  if (tingkatKesulitan) {
    values.push(tingkatKesulitan);
    query += ` AND tingkat_kesulitan = $${values.length}`;
  }

  query += ` ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
  values.push(limit, offset);

  const resep = await pool.query(query, values);

  for (let r of resep.rows) {
    const bahan = await pool.query(
      "SELECT * FROM bahan WHERE resep_id = $1",
      [r.id]
    );
    const langkah = await pool.query(
      "SELECT * FROM langkah WHERE resep_id = $1 ORDER BY urutan",
      [r.id]
    );
    r.bahan = bahan.rows;
    r.langkah = langkah.rows;
  }

  return resep.rows;
};

const searchResep = async (q) => {
  const resep = await pool.query(
    `SELECT * FROM resep 
     WHERE nama ILIKE $1
     ORDER BY created_at DESC`,
    [`%${q}%`]
  );

  for (let r of resep.rows) {
    const bahan = await pool.query(
      "SELECT * FROM bahan WHERE resep_id = $1",
      [r.id]
    );
    const langkah = await pool.query(
      "SELECT * FROM langkah WHERE resep_id = $1 ORDER BY urutan",
      [r.id]
    );
    r.bahan = bahan.rows;
    r.langkah = langkah.rows;
  }

  return resep.rows;
};

const createResep = async (data) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const resepRes = await client.query(
      `INSERT INTO resep (nama, kategori, tingkat_kesulitan)
       VALUES ($1, $2, $3) RETURNING id`,
      [data.nama, data.kategori, data.tingkat_kesulitan]
    );

    const resepId = resepRes.rows[0].id;

    for (const b of data.bahan) {
      await client.query(
        `INSERT INTO bahan (resep_id, nama_bahan)
         VALUES ($1, $2)`,
        [resepId, b]
      );
    }

    for (let i = 0; i < data.langkah.length; i++) {
      await client.query(
        `INSERT INTO langkah (resep_id, deskripsi, urutan)
         VALUES ($1, $2, $3)`,
        [resepId, data.langkah[i], i + 1]
      );
    }

    await client.query("COMMIT");

    return {
      message: "Resep berhasil ditambahkan",
      id: resepId,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const deleteResep = async (id) => {
  await pool.query("DELETE FROM resep WHERE id = $1", [id]);
};

module.exports = {
  getResep,
  searchResep, 
  createResep,
  deleteResep,
};