"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const port = 8000;
const app = (0, express_1.default)();
// Load environment variables from .env file 
dotenv_1.default.config({ path: "env-variables.env" });
const db_pwd = process.env.DATABASE_PASSWORD;
console.log("The password is " + db_pwd);
// Default Route
app.get("/", (req, res) => {
    res.send("Hello from Express YAYYYY");
});
app.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});
const client = new pg_1.Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: db_pwd,
    database: "nba-team-builder-db"
});
client.connect();
client.query("Select * from player_data", (err, res) => {
    if (!err) {
        console.log(res.rows);
    }
    else {
        console.log(err.message);
    }
    client.end();
});
