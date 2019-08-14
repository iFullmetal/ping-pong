let rooms = []

const { Ball, dimensions } = require('./ball.js')

function Player(id, y, x){
    this.id = id
    this.y = y //"виртуальный y", т.к. в бэкэнде я представляю, что canvas 160/100
    this.x = x
    this.speed = 3
    this.score = 0
    this.move = (dir)=>{
        const offset = this.speed * dir
        if(this.y + offset < 0 || this.y + offset + dimensions.playerHeight > dimensions.virtualHeight) {
            return
        }
        this.y += offset
    }
    this.becomeFirst = ()=>{
        this.x = dimensions.player1_x
    }
}

function Room(name){
    this.roomName = name
    this.players = []
    this.ball = new Ball()
    this.restart = ()=>{
        this.ball = new Ball()
    }
}

//генерация рандомного имени комнаты для автоподбора
const genareteUniqueName = () =>{
    return (rooms.length + Date.now() + Math.floor(Math.random() * 10000)).toString(16)
}

const findFreeRoom = ()=>{
    let room = rooms.find((room)=>{
        return room.players.length === 1
    })
    if(!room){
        room = new Room(genareteUniqueName())
        rooms.push(room)
    }
    return room
}


const addPlayer = (id, roomName)=>{
    let room = rooms.find((r) => r.roomName === roomName)
    if(room){
        if(room.players.length === 2){
            return 'Room is full!'
        }
        //комната найдена -> в комнате не 2 игрока => в комнате один игрок
        //следующий будет вторым
        room.players.push(new Player(id, 50, room.players.length === 0 ? dimensions.player1_x : dimensions.player2_x))
        console.log('Player 2 added to room', roomName)
    }
    else{
        //комната не найдена => создаю комнату с этим юзером и именем
        room = new Room(roomName)
        room.players.push(new Player(id, 50, dimensions.player1_x))
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
            if(room.ball.update(room.players)){
                room.restart()
            }
        }
        callback(room)//отправляю новые данные игрокам
    })
}

const removePlayer = (id)=>{
    rooms.forEach((room)=>{
        let index = room.players.findIndex((player)=> player.id === id)
        if(index !== -1){
            //если вышел последний пользоваетль
            if(room.players.length === 1){
                room.players = []
                room.restart()
                return;
            }
            room.players.splice(index, 1)
            //чтобы избежать случая, когда вышел первый игрок, но потом зашел еще один, то выйдет так, что оба игрока будут справа
            room.players[0].becomeFirst()
            room.restart()
            return
        }
    })
}



module.exports = {
    addPlayer,
    getPlayer,
    removePlayer,
    updateRooms,
    dimensions,
    findFreeRoom
}