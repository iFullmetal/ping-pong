const canvas = document.createElement('canvas')
let scaleY, scaleX;
const player1ScaledDimention = {}
const player2ScaledDimention = {}

const calculateDimentions = ()=>{
    //масштабирую канвас под размеры окна
    canvas.width = document.documentElement.clientWidth - document.documentElement.clientWidth/10
    canvas.height = document.documentElement.clientHeight - document.documentElement.clientHeight/10
    //высчитываю коэффициеты для масштабирования виртуальных координат из бэкэнда под размеры канваса
    scaleY = canvas.height / dimensions.virtualHeight
    scaleX = canvas.width / dimensions.virtualWidth
    player1ScaledDimention.x = dimensions.player1_x * scaleX
    player2ScaledDimention.x = dimensions.player2_x * scaleX
    player1ScaledDimention.width = player2ScaledDimention.width = dimensions.playerWidth * scaleX
    player1ScaledDimention.height = player2ScaledDimention.height = dimensions.playerHeight * scaleY
}

document.body.insertBefore(canvas, document.body.childNodes[0]);

const ctx = canvas.getContext('2d')

window.onresize = ()=>{
    if(!gotDimensions) return
    calculateDimentions()
}

socket.on('logMessage', (message)=>{
    console.log(message)
})

socket.on('update', (room)=>{
    if(!gotDimensions) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "blue"
    ctx.fillRect(player1ScaledDimention.x, room.players[0].y * scaleY, player1ScaledDimention.width, player1ScaledDimention.height)
    if(!room.players[1]) return
    ctx.fillStyle = "red"
    ctx.fillRect(player2ScaledDimention.x, room.players[1].y * scaleY, player2ScaledDimention.width, player2ScaledDimention.height)

})