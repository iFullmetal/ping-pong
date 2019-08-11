const express = require('express')
const socketio = require('socket.io')
const path = require('path')
const http = require('http')
const { addPlayer, getPlayer, removePlayer, updateRooms } = require('./utils/players')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', (socket)=>{
    console.log(`websocket: ${socket.id} is connected.`)

    socket.on('join', (roomName, callback)=>{
        const error = addPlayer(socket.id, roomName)
        if(error){
            callback(error)
            return
        }
        socket.join(roomName)

        callback()
    })

    socket.on('keyPressed', (key)=>{
        const player = getPlayer(socket.id);
        player.move(key)
    })

    socket.on('disconnect', ()=>{
        removePlayer(socket.id)
    })
})

setInterval(()=>{
    updateRooms((room)=>{
        io.to(room.roomName).emit('update', room)
    })
}, 20)

server.listen(port, ()=>{
    console.log('Server is up on port', port)
})