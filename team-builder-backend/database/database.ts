import {Client, Pool} from "pg";
import dotenv from 'dotenv'; 

// Load environment variables from .env file 
dotenv.config({ path: "env-variables.env"}); 

// DB Password
const db_pwd : string = process.env.DATABASE_PASSWORD!;

// Pool object to hold connection details to postgres db
// Use Pool over Client from pg module
export const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: db_pwd,
    database: "nba-team-builder-db"
});

