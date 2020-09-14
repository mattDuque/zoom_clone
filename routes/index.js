const routes = require('express').Router()
const path = require('path')
const {v4: id} = require('uuid')

routes.get('/', (req, res) => {
	res.redirect(`/${id()}`)
})

routes.get('/:room', (req, res) =>{
	res.render('room', {roomId: req.params.room})
})

module.exports = routes