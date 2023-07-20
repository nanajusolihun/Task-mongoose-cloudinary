import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const DB_URL = process.env.DB_URL;

export { PORT, CLOUD_NAME, API_KEY, API_SECRET, DB_URL };
