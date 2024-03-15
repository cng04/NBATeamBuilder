import {client} from '../database/database';

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

    static async findAll() {
        const sql = "SELECT * FROM player_data";

        // Connecting to PostgreSQL DB
        await client.connect();

        // Running the SQL Query
        const result = await client.query(sql);

        // Disconnecting from PostgreSQL DB
        await client.end();

        return result;
    }

    static async findByID(id: string) {

    }

}