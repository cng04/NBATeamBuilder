import express, {Express, Request, Response} from "express";
import {Client} from "pg";
import dotenv from 'dotenv'; 
import {client} from './database/database';
import { getAllPlayers } from "./controller/controller";

const port = 8000;

const app: Express = express();

// Allows express to pass the request json body
app.use(express.json());

// Connect to postgreSQL db
// client.connect()

// client.query("Select * from player_data", (err, res) => {
//     if (!err) {
//         console.log(res.rows);
//     } else {
//         console.log(err.message);
//     }

//     client.end();
// })

// Default Route
app.get("/", (req: Request, res: Response) => {
    // res.send("Hello from Express YAYYYY")
    getAllPlayers(req, res);
});

app.get("/hi", (req: Request, res: Response) => {
    res.send("Hello World");
})

app.post("/hi/data", (req: Request, res: Response) => {
    console.log(req.body);

    res.send({"status": "OK"});
})

// app.all handles all http methods (i.e. get, post, put, delete)
app.all("api/all", (req: Request, res: Response) => {
    return res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Now listening on port: ${port}`)
});
