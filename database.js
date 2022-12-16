import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()


// id: 1, 
// key: 1,
// date: "Mon Sep 19 2022 09:23:01 GMT-0700 (Pacific Daylight Time)",
// text: "Helped grandma cross the street",
// rating: 6

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE 
}).promise()


// returns all the moods in the mood table as array of objects
export async function getMoods(){
    const [result] = await pool.query("SELECT * FROM moods");
    return result;
}


export async function deleteMood(id){
    let query = `
        DELETE 
        FROM moods
        WHERE id = ?`;
    
    const [result] = await pool.query(query, [id]);
    return result;
}


export async function updateMood(notes, rating, id){
    let query = `
        UPDATE moods
        SET
        notes = ?,
        rating = ?
        WHERE id = ?`;

    return await pool.query(query, [notes, rating, id]);
}


export async function insertMood(notes, rating){
    let query = `
        INSERT INTO moods (notes, rating)
        VALUES (?, ?)`;

    return await pool.query(query, [notes, rating]);
}


export async function seedDatabase(){
   let query = `
   INSERT INTO 
     moods(notes, rating, created) 
   VALUES 
    ('Contemplated existence',6,'2022-04-12 02:23:22'), 
    ('Went whale watching in Fiji',7,'2022-04-12 02:23:22'), 
    ('Went camping in Hawaii',9,'2022-04-12 02:23:22'), 
    ('Went backpacking in Colombia',9,'2022-04-12 02:23:22'), 
    ('Hiked a mountain',8,'2022-04-12 02:23:22'), 
    ('Went to the office',7,'2022-02-26 02:23:22'), 
    ('Moved to the beach to become a professional surfer',4,'2022-04-12 02:23:22'), 
    ('Applied for medical school',8,'2022-08-12 02:23:22'), 
    ('Went to see Swedish House Mafia',9,'2022-04-17 02:23:22')`

   await pool.query(query)
}
