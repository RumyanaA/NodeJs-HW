import dotenv from 'dotenv';
import { absolutePath } from './dotenvPath.js';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config({ path: absolutePath });
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
export default {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    jwtSecret: process.env.JWT_SECRET
};
//# sourceMappingURL=index.js.map