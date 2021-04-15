const pg = require('pg');
let db;

exports.connect = (uri) => {
  const sql = new pg.Pool({
    connectionString: uri,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  return new Promise(async (resolve, reject) => {
    try {
      // eslint-disable-next-line no-unused-vars
      resolve(db = await sql.connect());
    } catch (err) {
      reject(err);
    }
  });
};
