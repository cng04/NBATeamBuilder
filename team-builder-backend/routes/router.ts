import express, {Express, Request, Response} from "express";
const router = express.Router();
import * as controller from "../controller/controller";

// Default Route

// Route to get all players
router.post("/displayPosition", (req: Request, res: Response) => {
    controller.getAllPlayers(req, res);
})

// Retrieves player based on their id
router.get("/player/:id", (req: Request, res: Response) => {
    // res.send("Hello from Express YAYYYY")
    // getAllPlayers(req, res);
    controller.getPlayerByID(req, res);
});

// Retrieves players based on specific position
router.post("/displayPosition/:pos", (req: Request, res: Response) =>  {
    controller.getPlayerByPos(req, res);
});

export default router;