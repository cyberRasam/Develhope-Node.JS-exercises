import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import Joi from 'joi'
import {getAll, getOneById, create, updateById, deleteById, createImage} from './controllers/planets.js'
import multer from 'multer';
import {logIn} from './controllers/login.js';
import {signUp} from './controllers/signUp.js'
import {logOut} from './controllers/logOut.js'
import authorize from './authorize.js';
import './passport.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({storage})

dotenv.config();
const port = process.env.PORT || 3000;
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use('/uploads', express.static('uploads'))

//   const planetValidator = Joi.object({
//     name: Joi.string().required(),
//   });

app.get('/', (req, res) => {
    res.send("Hello there")
})

app.get('/api/planets', getAll)

app.get('/api/planets/:id', getOneById)

app.post('/api/planets', create )

app.put('/api/planets/:id', updateById)

app.delete('/api/planets/:id', deleteById)

//route for uploading image
app.post('/api/planets/:id/image', upload.single('image'), createImage)

//route for user Login 
app.post('/api/users/login', logIn)

//route for user SignUp
app.post('/api/users/signup', signUp)

//route for user logOut
app.get('/api/users/logout', authorize, logOut)

app.listen(port, () => {
    console.log(`server successfuly launched on http://localhost:${port}`)
})