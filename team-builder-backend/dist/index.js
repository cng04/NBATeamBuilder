"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller/controller");
const port = 8000;
const app = (0, express_1.default)();
// Allows express to pass the request json body
app.use(express_1.default.json());
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
app.get("/", (req, res) => {
    // res.send("Hello from Express YAYYYY")
    (0, controller_1.getAllPlayers)(req, res);
});
app.get("/hi", (req, res) => {
    res.send("Hello World");
});
app.post("/hi/data", (req, res) => {
    console.log(req.body);
    res.send({ "status": "OK" });
});
// app.all handles all http methods (i.e. get, post, put, delete)
app.all("api/all", (req, res) => {
    return res.sendStatus(200);
});
app.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});
