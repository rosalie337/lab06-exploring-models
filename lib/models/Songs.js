const pool = require('../utils/pool.js');

module.exports = class Song {
    id;
    artist;
    title;
    album;

    constructor(row) {
      this.id = row.id;
      this.artist = row.artist;
      this.title = row.title;
      this.album = row.album;
    }

    static async insert({ artist, title, album }) {
      const { rows } = await pool.query(
        'INSERT INTO songs (artist, title, album) VALUES ($1, $2, $3) RETURNING *',
        [artist, title, album]
      );
      return new Song(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM songs');

      return rows.map(row => new Song(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM songs WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`No song with ${id}`);
      return new Song(rows[0]);
    }

    static async update(id, { artist, title, album }) {
      const { rows } = await pool.query(
        `UPDATE songs
                SET artist=$1,
                    title=$2,
                    album=$3
                WHERE id=$4
                RETURNING *
            `,
        [artist, title, album, id]  
      );
      return new Song(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM songs WHERE id=$1 RETURNING *',
        [id]
      );

      return new Song(rows[0]);
    }
};
