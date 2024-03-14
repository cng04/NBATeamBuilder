import express, {Express, Request, Response} from "express";
import {Client} from "pg";
import dotenv from 'dotenv'; 

const port = 8000;

const app: Express = express();

// Load environment variables from .env file 
dotenv.config({ path: "env-variables.env"}); 

const db_pwd : string = process.env.DATABASE_PASSWORD!;
console.log("The password is " + db_pwd);


// Default Route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello from Express YAYYYY")
});

app.listen(port, () => {
    console.log(`Now listening on port: ${port}`)
});

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: db_pwd,
    database: "nba-team-builder-db"
});

client.connect()

client.query("Select * from player_data", (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }

    client.end();
})