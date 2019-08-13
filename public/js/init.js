const socket = io()

const { room } = Qs.parse(location.search, { ignoreQueryPrefix: true })
let dimensions
let gotDimensions = false
socket.emit('join', room, (error) => {
    if(error){
        location.href = '/error.html'
    }
})

socket.on('gameDimensions', (dimensions_)=>{
    dimensions = dimensions_
    gotDimensions = true //виртуальные размеры игровых объектов пришли с сервера
    calculateDimentions()//теперь можно их масштабировать под размеры экрана
})


