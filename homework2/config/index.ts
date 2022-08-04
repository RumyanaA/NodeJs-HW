import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config({ path: '../.env' });
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    jwtSecret: process.env.JWT_SECRET
};
