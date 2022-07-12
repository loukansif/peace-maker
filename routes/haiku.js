import express from 'express'
import {getHaikus, getOneHaiku, createHaiku} from '../controllers/haiku.js'
const routerHaiku = express.Router()
routerHaiku.use(express.json())
routerHaiku.use(express.urlencoded({ extended: true }))


// récupération de tous les Haikus
routerHaiku.get('/', async (req, res) => {
    let haikus = await getHaikus()
    res.json(haikus);
})

// récupération d'un seul Haiku
routerHaiku.get('/:_id', async (req, res) => {  
    let haiku = await getOneHaiku(req.params._id)
    console.log('toto')
    res.json(haiku)
})

// Création d'un Haiku
routerHaiku.post('/', async (req, res) => {
    const newHaiku = await createHaiku(req.body)
    res.send(newHaiku)
})




export default routerHaiku