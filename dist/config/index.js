import dotenv from 'dotenv';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config({ path: '../.env' });
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
export default {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};
//# sourceMappingURL=index.js.map