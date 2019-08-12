const rooms = []
const dimensions = {
    virtualWidth: 160,
    virtualHeight: 100,
    playerWidth: 10,
    playerHeight: 30,
}
dimensions.player1_x = dimensions.playerWidth/2,
dimensions.player2_x = dimensions.virtualWidth - (dimensions.playerWidth + dimensions.playerWidth/2)


function Player(id, y){
    this.id = id
    this.y = y //"виртуальный y", т.к. в бэкэнде я представляю, что canvas 160/100
    this.move = (key)=>{
        if(key==='w') this.y-= 3
        else this.y += 3
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
        room.players.push(new Player(id, 50))
        console.log('Player 2 added to room', roomName)
    }
    else{
        //комната не найдена => создаю комнату с этим юзером и именем
        room = { roomName: roomName, players: [] }
        room.players.push(new Player(id, 50))
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
        callback(room)
    })
}

const removePlayer = (id)=>{
    rooms.forEach((room)=>{
        let index = room.players.findIndex((player)=> player.id === id)
        if(index !== -1){
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