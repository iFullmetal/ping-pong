//пересечение прямоугольника с кругом
//const circleBox = require('intersects/circle-box');
const dimensions = require('./dimensions.js')
const random = require('random')

function circleBox(xc, yc, rc, xb, yb, wb, hb)
{
    var hw = wb / 2
    var hh = hb / 2
    var distX = Math.abs(xc - (xb + wb / 2))
    var distY = Math.abs(yc - (yb + hb / 2))

    if (distX > hw + rc || distY > hh + rc)
    {
        return false
    }

    if (distX <= hw || distY <= hh)
    {
        return 1
    }

    var x = distX - hw
    var y = distY - hh
    if(x * x + y * y <= rc * rc)
    {
        return 2
    }
    else return false
}

function Ball(){
    this.ballRect = {
        x: dimensions.virtualWidth / 2,
        y: dimensions.virtualHeight / 2,
        r: dimensions.ballR
    }
    this.dirX = random.int(0, 1)? 1 : -1
    this.dirY = random.int(0, 1)? 1 : -1
    this.speed = 0.3

    this.move = function(){
        this.ballRect.x += this.dirX * this.speed
        this.ballRect.y += this.dirY * this.speed
    }

    this.update = (players)=>{
        this.move()

        for(let i = 0; i < players.length; i++){
            const intersection = circleBox(this.ballRect.x, this.ballRect.y, this.ballRect.r, players[i].x, players[i].y, dimensions.playerWidth, dimensions.playerHeight )
            if(intersection === 1){
                this.dirX *= -1
            }
            if(intersection === 2){
                this.dirX *= -1
                this.dirY *= -1
            }
        }
        if(this.ballRect.y <= 0 || this.ballRect.y + this.ballRect.r*2 >= dimensions.virtualHeight ){
            this.dirY *= -1
        }
        if(this.ballRect.x <= dimensions.player1_x){
            players[1].score++
            return 1
        }
        if(this.ballRect.x + this.ballRect.r*2 >= dimensions.player2_x + dimensions.playerWidth){
            players[0].score++
            return 1
        }

    }
}

module.exports = { Ball, dimensions }