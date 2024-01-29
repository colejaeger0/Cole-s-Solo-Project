const pg = require('pg');

const conString = 'postgres://bvkxbnyq:SxJrkNncNaTn9AZuYMaFrHlv1iNAi7Ah@chunee.db.elephantsql.com/bvkxbnyq';
const client = new pg.Client(conString);
client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
   console.log("connected")
  });


module.exports = client;


// const { Pool } = require('pg');

// const PG_URI = 'postgres://bvkxbnyq:SxJrkNncNaTn9AZuYMaFrHlv1iNAi7Ah@chunee.db.elephantsql.com/bvkxbnyq';

// const pool = new Pool({
//     connectionString: PG_URI
// })

// module.exports = {
//     query: (text, params, callback) => {
//       console.log('executed query', text);
//       return pool.query(text, params, callback);
//     }
//   };

