import express, {Express, Request, Response} from "express";
import {Player} from "../models/player"

// Function to getAllPlayers in PostgreSQL DB Table
export const getAllPlayers = async (req: Request, res: Response) => {
    try {
        const players = await Player.findAll();

        res.send({
            statusCode: 200,
            statusMessage: "OK",
            message: "Successfully retrieved all the players.",
            data: players.rows,
        });
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: null,
            data: null,
        })
    }
}

// Function to get specific player by ID
export const getPlayerByID = async (req: Request, res: Response) => {
    try {
        const player = await Player.findByID("3");

        res.send({
            statusCode: 200,
            statusMessage: "OK",
            message: "Successfully retrieved player 3",
            data: player.rows,
        });
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: null,
            data: null,
        })
    }

}

// Function to get players based on position
export const getPlayerByPos = async (req: Request, res: Response) => {
    try {
        console.log(typeof req.params.pos);
        const position: string = req.params.pos;
        const players = await Player.findByPos(position);

        res.send({
            statusCode: 200,
            statusMessage: "OK",
            message: "Successfully retrieved all the players.",
            data: players.rows,
        });
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: null,
            data: null,
        })
    }
}

// controller method for adding a new player
export const addPlayerByID = async (req: Request, res: Response) => {
    let { name, position, age, team, fgPercent, threePointPercent, freeThrowPercent, rebounds, assists, points } = req.body;

    // Validation
    if (!name || !name.trim() || !position || !position.trim() || age == null || age < 0 || !team || !team.trim() || fgPercent < 0 || fgPercent > 100 || threePointPercent < 0 || threePointPercent > 100 || freeThrowPercent < 0 || freeThrowPercent > 100 || rebounds < 0 || assists < 0 || points < 0) {
        return res.status(400).send({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: null,
            data: null,
        })
    }

    // If user doesn't provide these values, set them to 0
    if (fgPercent == undefined) {
        fgPercent = 0;
    }

    if (threePointPercent == undefined) {
        threePointPercent = 0;
    }

    if (freeThrowPercent == undefined) {
        freeThrowPercent = 0;
    }

    if (rebounds == undefined) {
        rebounds = 0;
    }

    if (assists == undefined) {
        assists = 0;
    }

    if (points == undefined) {
        points = 0;
    }

    try {
        const player = new Player(name, position, age, team, fgPercent, threePointPercent, freeThrowPercent, rebounds, assists, points, true);

        await player.addNewPlayer();

        res.send({
            statusCode: 200,
            statusMessage: "OK",
            message: "Successfully added player",
            data: null,
        });
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: null,
            data: null,
        })
    }
}

// controller method for updating a user-added player
export const updatePlayerByID = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    let { name, position, age, team, fgPercent, threePointPercent, freeThrowPercent, rebounds, assists, points } = req.body;

    // Validation of request body
    if (!name || !name.trim() || !position || !position.trim() || age == null || age < 0 || !team || !team.trim() || fgPercent < 0 || fgPercent > 100 || threePointPercent < 0 || threePointPercent > 100 || freeThrowPercent < 0 || freeThrowPercent > 100 || rebounds < 0 || assists < 0 || points < 0) {
        return res.status(400).send({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: null,
            data: null,
        })
    }

    // Need to also ensure this player was a user-added player so need to validate that by comparing the id with the ids of the user-added players (new_player = true)
    const userAddedPlayers = await Player.findUserAddedPlayers();

    let isUserAddedPlayer = false;

    for (let i = 0; i < userAddedPlayers.rows.length; i++) {
        if (id == userAddedPlayers.rows[i].index) {
            isUserAddedPlayer = true;
            break;
        }
    }

    if (!isUserAddedPlayer) {
        return res.status(400).send({
            statusCode: 400,
            statusMessage: "Player cannot be edited",
            message: null,
            data: null,
        })
    }

    // If user doesn't provide these values, set them to 0
    if (fgPercent == undefined) {
        fgPercent = 0;
    }

    if (threePointPercent == undefined) {
        threePointPercent = 0;
    }

    if (freeThrowPercent == undefined) {
        freeThrowPercent = 0;
    }

    if (rebounds == undefined) {
        rebounds = 0;
    }

    if (assists == undefined) {
        assists = 0;
    }

    if (points == undefined) {
        points = 0;
    }

    try {
        const player = new Player(name, position, age, team, fgPercent, threePointPercent, freeThrowPercent, rebounds, assists, points, true);

        await player.findPlayerByIdAndUpdate(id);

        res.send({
            statusCode: 200,
            statusMessage: "OK",
            message: "Successfully edited player",
            data: null,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: null,
            data: null,
        })
    }
}

// controller method for deleting a user-added player
export const deletePlayerByID = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    
    // Need to also ensure this player was a user-added player so need to validate that by comparing the id with the ids of the user-added players (new_player = true)
    const userAddedPlayers = await Player.findUserAddedPlayers();

    let isUserAddedPlayer = false;

    for (let i = 0; i < userAddedPlayers.rows.length; i++) {
        if (id == userAddedPlayers.rows[i].index) {
            isUserAddedPlayer = true;
            break;
        }
    }

    if (!isUserAddedPlayer) {
        return res.status(400).send({
            statusCode: 400,
            statusMessage: "Player cannot be deleted",
            message: null,
            data: null,
        })
    }

    try {
        await Player.findPlayerByIdAndDelete(id);

        res.send({
            statusCode: 200,
            statusMessage: "OK",
            message: "Successfully deleted player",
            data: null,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: null,
            data: null,
        })
    }
}