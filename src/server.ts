import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import Joi from 'joi'

dotenv.config();
const port = process.env.PORT || 3000;
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

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

  const planetValidator = Joi.object({
    name: Joi.string().required(),
  });

app.get('/', (req, res) => {
    res.send("Hello there")
})

app.get('/api/planets', (req, res) => {
    res.status(200).json(planets)
})

app.get('/api/planets/:id', (req, res) => {
    const {id} = req.params 
    const planet = planets.find(p => p.id === Number(id))
    if(planet) {
        res.status(200).json(planet)
    } else {
        res.send("Couldn't find the planet")
    }
})


app.post('/api/planets', (req, res) => {
    const id = planets.length + 1; 
    const {error} = planetValidator.validate(req.body);
    if(error) {
        res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    const {name} = req.body
    const newPlanet = {id, name}
    
    planets = [...planets, newPlanet] 
    res.status(201).json({msg: "Planet created successfully"})
})

app.put('/api/planets/:id', (req,res)=>{
    const { id } = req.params;
    const {error} = planetValidator.validate(req.body);
    if(error) {
        res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    const { name } = req.body; 
    planets = planets.map(p => p.id === Number(id) ? ({...p, name}) : p ) 
    res.status(200).json({msg : "Planet is updated"})
})

app.delete('/api/planets/:id', (req, res) => {
    const { id } = req.params 
    planets = planets.filter(p => p.id !== Number(id))
    res.status(200).json({msg: "planet deleted successfully"})
    
})

app.listen(port, () => {
    console.log(`server successfuly launched on http://localhost:${port}`)
})