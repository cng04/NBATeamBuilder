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

export const getPlayerByID = async (req: Request, res: Response) => {

}

export const updatePlayerByID = async (req: Request, res: Response) => {

}

export const deletePlayerByID = async (req: Request, res: Response) => {
    
}