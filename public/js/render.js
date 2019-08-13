const canvas = document.createElement('canvas')
let scaleY, scaleX;
const player1ScaledDimention = {}
const player2ScaledDimention = {}
const ballScaledSize = {}

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
    console.log(ballScaledSize)
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
    ctx.fillStyle = "black"
    ctx.fillRect(room.ball.ballRect.x * scaleX, room.ball.ballRect.y * scaleY, room.ball.ballRect.r * 2 * scaleX, room.ball.ballRect.r * 2 * scaleY)
    //drawEllipse(ctx, room.ball.ballRect.x * scaleX, room.ball.ballRect.y * scaleY, ballScaledSize.width, ballScaledSize.height)
    // ctx.beginPath();
    // ctx.arc(room.ball.ballRect.x, room.ball.ballRect.y, ballScaledSize.width, ballScaledSize.width, 2 * Math.PI);
    // ctx.stroke();

})

// socket.on('update', (room)=>{
//     if(!gotDimensions) return

//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.fillStyle = "blue"
//     ctx.fillRect(room.players[0].x, room.players[0].y, dimensions.playerWidth, dimensions.playerHeight)
//     if(!room.players[1]) return
//     ctx.fillStyle = "red"
//     ctx.fillRect(room.players[1].x, room.players[1].y, dimensions.playerWidth, dimensions.playerHeight)
//     ctx.fillStyle = "black"
//     ctx.fillRect(room.ball.ballRect.x , room.ball.ballRect.y, room.ball.ballRect.r * 2, room.ball.ballRect.r * 2)

// })


function drawEllipse(ctx, x, y, a, b) {
    // Запоминаем положение системы координат (CК) и масштаб
   ctx.save();
   ctx.beginPath();
  
   // Переносим СК в центр будущего эллипса
   ctx.translate(x, y);
  
   /*
    * Масштабируем по х.
    * Теперь нарисованная окружность вытянется в a / b раз
    * и станет эллипсом
    */
  
   ctx.scale(a / b, 1);
  
   // Рисуем окружность, которая благодаря масштабированию станет эллипсом
   ctx.arc(0, 0, b, 0, Math.PI * 2, true);
  
   // Восстанавливаем СК и масштаб
   ctx.restore();
  
   ctx.closePath();
   ctx.stroke();
 }