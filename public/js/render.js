const canvas = document.createElement('canvas')
let scaleY, scaleX;
const player1ScaledDimention = {}
const player2ScaledDimention = {}
const ballScaledSize = {}
const scorePos = {}
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
    ballScaledSize.width = dimensions.ballR * scaleX
    ballScaledSize.height = dimensions.ballR * scaleY
    scorePos.x = canvas.width/2
    scorePos.y = canvas.height/11
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
    //console.log(room)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "blue"
    ctx.fillRect(room.players[0].x * scaleX, room.players[0].y * scaleY, player1ScaledDimention.width, player1ScaledDimention.height)
    if(!room.players[1]) return
    ctx.fillStyle = "red"
    ctx.fillRect(room.players[1].x * scaleX, room.players[1].y * scaleY, player2ScaledDimention.width, player2ScaledDimention.height)
    ctx.fillStyle = "black"
    drawEllipse(ctx, room.ball.ballRect.x * scaleX /*+ ballScaledSize.width*/, room.ball.ballRect.y * scaleY /*+ ballScaledSize.height*/, ballScaledSize.width, ballScaledSize.height)
    ctx.font = `${4 * scaleX}px Arial`;
    ctx.fillText(room.players[0].score + ' | ' + room.players[1].score, scorePos.x, scorePos.y);
})

function drawEllipse(ctx, x, y, a, b) {
   ctx.save();
   ctx.beginPath();

   ctx.translate(x, y);
   ctx.scale(a / b, 1);
   ctx.strokeStyle = 'black';

   ctx.arc(0, 0, b, 0, Math.PI * 2, true);
  

   ctx.restore();
   ctx.closePath();
   ctx.stroke();
 }