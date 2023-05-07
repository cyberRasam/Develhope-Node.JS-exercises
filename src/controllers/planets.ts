import { Request, Response } from "express";
import pgPromise from 'pg-promise';


const db = pgPromise()('postgres://postgres:postgres@localhost:5432/video')
const setupDb= async () => {
  await db.none(`
  DROP TABLE IF EXISTS planets;  
  
  CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT
  );   
  `)

  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Jupiter')`);
  
}
setupDb();

const getAll = async (req: Request, res: Response) => {
    const planets = await db.many(`SELECT * FROM planets;`);
    res.status(200).json(planets)
}

const getOneById = async (req: Request, res: Response) => {
    const {id} = req.params
    const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`, Number(id)); 
    if(planet) {
        res.status(200).json(planet)
    } else {
        res.send("Couldn't find the planet")
    }
}

const create = async (req: Request, res: Response) => {
    const {name} = req.body
    await db.none(`INSERT INTO planets (name) VALUES ($1)`, name)
    res.status(201).json({msg: "Planet created successfully"})
} 

const updateById =  async (req: Request, res: Response)=>{
    const { id } = req.params;
    const { name } = req.body;
    db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [Number(id), name])
    res.status(200).json({msg : "Planet is updated"})
}

const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    await db.none(`DELETE FROM planets WHERE id=$1`, Number(id)) 
    res.status(200).json({msg: "planet deleted successfully"})
    
}

const createImage = async (req: Request, res: Response ) => {
  console.log(req.file)
  const {id}= req.params
  const filename = req.file?.path
  if(filename) {
    res.status(201).json({msg: "Planet image uploaded successfully"})
    db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id,filename])
  }
  else {
    res.status(400).json({msg: "planet image failed to upload"})
  }
}

export { getAll, getOneById, create, updateById, deleteById, createImage}