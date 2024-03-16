import express, {Express, Request, Response} from "express";
import cors from "cors";
import router from "./routes/router";

const port = 8000;

const app: Express = express();

// Allows express to pass the request json body
app.use(express.json());

app.use(cors());

app.use("/", router);

app.listen(port, () => {
    console.log(`Now listening on port: ${port}`)
});
