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

// Adds a new player to the database
router.post("/addPlayer", (req: Request, res: Response) => {
    controller.addPlayerByID(req, res);
})

// Edit a user-added player in the database
router.put("/edit/:id", (req: Request, res: Response) => {
    controller.updatePlayerByID(req, res);
})

// Delete a user-added player in the database
router.delete("/delete/:id", (req: Request, res: Response) => {
    controller.deletePlayerByID(req, res);
})

export default router;