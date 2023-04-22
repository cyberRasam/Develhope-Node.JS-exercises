import { Request, Response } from "express";

type Planet = {
    id: number,
    name: string,
  };

  type Planets = Planet[];

  let planets: Planets = [
    {
      id: 1,
      name: "Earth",
    },
    {
      id: 2,
      name: "Mars",
    },
  ];

const getAll =  (req: Request, res: Response) => {
    res.status(200).json(planets)
}

const getOneById = (req: Request, res: Response) => {
    const {id} = req.params 
    const planet = planets.find(p => p.id === Number(id))
    if(planet) {
        res.status(200).json(planet)
    } else {
        res.send("Couldn't find the planet")
    }
}

const create = (req: Request, res: Response) => {
    const id = planets.length + 1; 
    // const {error} = planetValidator.validate(req.body);
    // if(error) {
    //     res.status(400).json({ error: error.details.map((err) => err.message) });
    // }
    const {name} = req.body
    const newPlanet : Planet = {id, name}
    
    planets = [...planets, newPlanet] 
    res.status(201).json({msg: "Planet created successfully"})
} 

const updateById = (req: Request, res: Response)=>{
    const { id } = req.params;
    // const {error} = planetValidator.validate(req.body);
    // if(error) {
    //     res.status(400).json({ error: error.details.map((err) => err.message) });
    // }
    const { name } = req.body; 
    planets = planets.map(p => p.id === Number(id) ? ({...p, name}) : p ) 
    res.status(200).json({msg : "Planet is updated"})
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params 
    planets = planets.filter(p => p.id !== Number(id))
    res.status(200).json({msg: "planet deleted successfully"})
    
}

export { getAll, getOneById, create, updateById, deleteById}