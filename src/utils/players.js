let rooms = []



const { Ball, dimensions } = require('./ball.js')

function Player(id, y, x){
    this.id = id
    this.y = y //"виртуальный y", т.к. в бэкэнде я представляю, что canvas 160/100
    this.x = x
    this.speed = 3
    this.move = (dir)=>{
        const offset = this.speed * dir
        if(this.y + offset < 0 || this.y + offset + dimensions.playerHeight > dimensions.virtualHeight) {
            return
        }
        this.y += offset
    }
}

const addPlayer = (id, roomName)=>{
    let room = rooms.find((r) => r.roomName === roomName)
    if(room){
        if(room.players.length === 2){
            return 'Room is full!'
        }
        //комната найдена -> в комнате не 2 игрока => в комнате один игрок
        //следующий будет вторым
        room.players.push(new Player(id, 50, dimensions.virtualWidth - (dimensions.playerWidth + dimensions.playerWidth/2)))
        console.log('Player 2 added to room', roomName)
    }
    else{
        //комната не найдена => создаю комнату с этим юзером и именем
        room = { roomName: roomName, players: [], ball: new Ball(dimensions) }
        room.players.push(new Player(id, 50, dimensions.playerWidth/2))
        rooms.push(room)
        console.log('Player 1 added to room', roomName)
    }
}

const getPlayer = (id)=>{
    let res
    rooms.forEach((room)=>{
        res = room.players.find((player)=> player.id === id)
        if(res)return
    })
    return res;

    // for(let i = 0; i < rooms.length; i++){
    //     for(let j = 0; j < rooms[i].players.length; j++){
    //         if(rooms[i].players[j].id === id)
    //             return rooms[i].players[j]
    //     }
    // }
}

//прохожусь по всем комнатам, колбэк имитит ивент с игровыми данными
//соответсвующих комнатам
const updateRooms = (callback)=>{
    rooms.forEach((room)=>{
        //обновляю комнату
        if(room.players.length === 2){
            room.ball.update(room.players)
        }
        callback(room)//отправляю новые данные игрокам
    })
}

const removePlayer = (id)=>{
    rooms.forEach((room)=>{
        let index = room.players.findIndex((player)=> player.id === id)
        if(index !== -1){
            if(room.players.length === 1){
                //TODO сделать нормальный умный сброс комнаты, это счас тут костыль, ага
                rooms = []
            }
            room.players.splice(index, 1)
            return
        }
    })
}



module.exports = {
    addPlayer,
    getPlayer,
    removePlayer,
    updateRooms,
    dimensions
}