import * as dotenv from 'dotenv';




dotenv.config({
 path: process.env.NODE_ENV === 'test' ? __dirname + '/.env.test' : __dirname + '/.env'
});



//console.log("Cara",process.env.DB_DIALECT);

export default {
   "type": process.env.DB_DIALECT || "postgres",
   "host": process.env.DB_HOST,
   "port": 5432,
   "username": process.env.DB_USER,
   "password": process.env.DB_PASS,
   "database": process.env.DB_NAME || "store", 
//   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/database/migrations/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/database/migrations"
   }
}




