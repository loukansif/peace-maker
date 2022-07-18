import express from 'express'
import {getUsers, getOneUser, createUser, updateUser} from '../controllers/user.js'
const routerUser = express.Router()
routerUser.use(express.json())
routerUser.use(express.urlencoded({ extended: true }))

routerUser.get('/', async (req, res) => {
    let users = await getUsers()
    res.json(users);
})

routerUser.get('/:email', async (req, res) => {
    let user = await getOneUser(req.params.email)
    res.json(user)
})

routerUser.post('/', async (req, res) => {
    const newUser = await createUser(req.body)
    res.send('nouveau user créé')
})


routerUser.put('/:email', async (req, res) => {
    let updateOneUser = await updateUser(req.params.email, req.body)
    res.send(updateOneUser)
        });

export default routerUser