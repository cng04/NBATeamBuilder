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
            data: players,
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

export const updatePlayerByID = async (req: Request, res: Response) => {

}

export const deletePlayerByID = async (req: Request, res: Response) => {

}