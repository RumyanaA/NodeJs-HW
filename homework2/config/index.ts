import dotenv from 'dotenv';
import { absolutePath } from './dotenvPath.js';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config({ path: absolutePath });
console.log(envFound);
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't fin .env file  ⚠️");
}

export default {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    jwtSecret: process.env.JWT_SECRET
};

