import express from 'express';
import dotenv from 'dotenv'; 
import { json } from 'body-parser';
import morgan from 'morgan';

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

app.get('/', (req, res) => {
    res.send("Hello there")
})


app.listen(port, () => {
    console.log(`server successfuly launched on http://localhost:${port}`)
})