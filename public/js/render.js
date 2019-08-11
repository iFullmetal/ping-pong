const canvas = document.createElement('canvas')
canvas.width = document.documentElement.clientWidth - document.documentElement.clientWidth/10
canvas.height = document.documentElement.clientHeight - document.documentElement.clientHeight/10
document.body.insertBefore(canvas, document.body.childNodes[0]);
//высчитываю коэффициеты для масштабирования виртуальных координат из бэкэнда под размеры канваса
const scaleY = canvas.height / 100
const scaleX = canvas.width / 160

const ctx = canvas.getContext('2d')

window.onresize = ()=>{
    console.log('resize')
    //TODO: скэйлить канвас
}

socket.on('logMessage', (message)=>{
    console.log(message)
})

socket.on('update', (room)=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "blue"
    ctx.fillRect(5 * scaleX, room.players[0].y * scaleY, 10, 30)
    if(!room.players[1]) return
    ctx.fillStyle = "red"
    ctx.fillRect(150 * scaleX, room.players[1].y * scaleY, 10, 30)

})