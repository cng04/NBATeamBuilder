import {pool} from '../database/database';
import { QueryConfig, QueryResult } from 'pg';

import dotenv from 'dotenv'; 

// Load environment variables from .env file 
dotenv.config({ path: "env-variables.env"}); 

export class Player {
    private name: string;
    private position: string;
    private age: number;
    private team: string;
    private fgPercent: number;
    private threePointPercent: number;
    private freeThrowPercent: number;
    private rebounds: number;
    private assists: number;
    private points: number;
    private newPlayer: boolean;

    constructor(name: string, position: string, age: number, team: string, fgPercent: number, threePointPercent: number, freeThrowPercent: number, rebounds: number, assists: number,  points: number, newPlayer: boolean) {
        this.name = name;
        this.position = position;
        this.age = age;
        this.team = team;
        this.fgPercent = fgPercent;
        this.threePointPercent = threePointPercent;
        this.freeThrowPercent = freeThrowPercent;
        this.rebounds = rebounds;
        this.assists = assists;
        this.points = points;
        this.newPlayer = newPlayer;
    }
 
    // Retrieves all the players from the DB
    static async findAll() {
        const sql = "SELECT * FROM player_data ORDER BY index";

        // Running the SQL Query
        const result = await pool.query(sql);

        return result;
    }

    // Retrieves only the player by the specific id
    static async findByID(id: string) {
        const sql = "SELECT * FROM player_data where player_data.index = " + id + " ORDER BY index";

        // Running the SQL Query
        const result = await pool.query(sql);

        return result;
    }

    // Retrieves player by position
    static async findByPos(pos: string) {
        const sql = "SELECT * FROM player_data where \"Pos\" Like \'%" + pos + "%\'" + " ORDER BY index";

        console.log(sql);

        // Running the SQL Query
        const result = await pool.query(sql);

        // console.log(result);


        return result;
    }

    // Retrives all user-added player
    static async findUserAddedPlayers() {
        const sql = "SELECT index FROM player_data where new_player = true";

        // Running the SQL Query
        const result = await pool.query(sql);
        
        return result;
    }

    // Inserts a new player's record into the database
    async addNewPlayer() {
        const sql = `INSERT INTO player_data ("Player", "Pos", "Age", "Tm", "FG%", "3P%", "FT%", "TRB", "AST", "PTS", "new_player") VALUES ('${this.name}', '${this.position}', ${this.age}, '${this.team}', ${this.fgPercent}, ${this.threePointPercent}, ${this.freeThrowPercent}, ${this.rebounds}, ${this.assists}, ${this.points}, ${this.newPlayer})`;

        console.log(sql);

        // Running the SQL Query
        const result = await pool.query(sql);

        console.log(result);

        return result;
    }

    async findPlayerByIdAndUpdate(id: string) {
        const sql = `UPDATE player_data SET "Player" = '${this.name}', "Pos" = '${this.position}', "Age" = ${this.age}, "Tm" = '${this.team}', "FG%" = ${this.fgPercent}, "3P%" = ${this.threePointPercent}, "FT%" = ${this.freeThrowPercent}, "TRB" = ${this.rebounds}, "AST" = ${this.assists}, "PTS" = ${this.points}, "new_player" = ${this.newPlayer} WHERE "index" = '${id}'`;

        // Running the SQL Query
        const result = await pool.query(sql);

        console.log(result);

        return result;
    }
}