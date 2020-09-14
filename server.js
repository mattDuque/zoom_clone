const express = require('express')
const app = express()
const server = require ('http').Server(app)
const io = require('socket.io')(server)
const routes = require('./routes')
const {v4: id} = require('uuid')
const {ExpressPeerServer} = require('peer')
const peerServer = ExpressPeerServer(server, {
	debug: true
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/', routes)
app.use('/peerjs', peerServer)

server.listen(3300, () => {
	console.log('App listening on port 3300')
})

io.on('connection', socket =>{
	socket.on('join-room', (roomId, userId)=>{
		console.log("joined")
		socket.join(roomId)
		socket.to(roomId).broadcast.emit('user-connected', userId)
		socket.on('message', message =>{
			io.to(roomId).emit('createMessage', message)
		})
		socket.on('disconnect', () => {
			socket.to(roomId).broadcast.emit('user-disconnected', userId)
    	})
	})
})