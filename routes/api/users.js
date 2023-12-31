const express = require('express');
const router = express.Router();
const uuid = require('uuid')
let users = require('../../users');

//get all users
router.get('/', (req, res) => {
    console.log(`Got Request `)
    res.json(users)
})

//get user by id 
router.get('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    console.log(`Got Request by id `)
    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    }
    else {
        res.sendStatus(400)
    }

})

//create a new user
router.post('/', (req, res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email

    }
    if (!newUser.name || !newUser.email) {
        res.sendStatus(400)
    }
    else {
        users.push(newUser)
        res.json({ msg: 'New User successfully added.', newUser: newUser, })
    }
})


// Update User 
router.put('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))

    if (found) {
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = req.body.name ? req.body.name : user.name
                user.email = req.body.email ? req.body.email : user.email
            }
        })
        res.json({ msg: 'User Updated', users })
    }
    else {
        res.status(400).json({ msg: 'User Not Found' })

    }
})

//delete user
router.delete('/:id', (req, res) => {
    try {
        const found = users.some(user => user.id === parseInt(req.params.id))
        if (found) {
            users = users.filter(user => user.id !== parseInt(req.params.id))
            res.json({
                msg: 'User delted successfully.', users
            })
        }
        else {
            res.status(400).json({ msg: 'User Not Found' })
        }
    }
    catch (err) {
        res.status(400).send({
            err: err.message
        })
    }
})


module.exports = router;