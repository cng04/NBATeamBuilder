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

    constructor(name: string, position: string, age: number, team: string, fgPercent: number, threePointPercent:number, freeThrowPercent: number, rebounds: number, assists: number,  points: number) {
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
    }
 
    // Retrieves all the players from the DB
    static async findAll() {
        const sql = "SELECT * FROM player_data";

        // Running the SQL Query
        const result = await pool.query(sql);

        return result;
    }

    // Retrieves only the player by the specific id
    static async findByID(id: string) {
        const sql = "SELECT * FROM player_data where player_data.index = " + id;

        // Running the SQL Query
        const result = await pool.query(sql);

        return result;
    }

    // Retrieves player by position
    static async findByPos(pos: string) {
        const sql = "SELECT * FROM player_data where \"Pos\" Like \'%" + pos + "%\'";

        console.log(sql);

        // Running the SQL Query
        const result = await pool.query(sql);

        // console.log(result);


        return result;
    }

}