//пересечение прямоугольника с кругом
const circleBox = require('intersects/circle-box');
const dimensions = require('./dimensions.js')
const random = require('random')

function randomNumber(min, max, except) {
    let value
    do{
        value = Math.floor(min + Math.random() * (max + 1 - min)) + min;
    }while(except !== undefined && value === except)
    return value
}


function intersects(ball, rect){
    const circle = ball.ballRect
    const circleDistance = { x: Math.abs(circle.x - rect.x), y: Math.abs(circle.y - rect.y) }

    if (circleDistance.x > (rect.width/2 + circle.r)){ 
        return false;
    }
    if (circleDistance.y > (rect.height/2 + circle.r)){
         return false; 
    }

    if (circleDistance.x <= (rect.width/2)){
        ball.dirX *= -1
        //return true;
    } 
    if (circleDistance.y <= (rect.height/2)){
        ball.dirX *= -1
        //return true; 
    }

    const cornerDistance_sq = Math.pow((circleDistance.x - rect.width/2),2) +
                     Math.pow((circleDistance.y - rect.height/2),2);


    if(cornerDistance_sq <= Math.pow(circle.r,2)){
        ball.dirX *= -1
        //ball.dirY *= -1
        //return true
    }
}

function Ball(){
    this.ballRect = {
        x: dimensions.virtualWidth / 2,
        y: dimensions.virtualHeight / 2,
        r: dimensions.ballR
    }
    this.dirX = random.int(0, 1)? 1 : -1
    this.dirY = random.int(0, 1)? 1 : -1
    this.speed = 1

    this.move = function(){
        this.ballRect.x += this.dirX * this.speed
        this.ballRect.y += this.dirY * this.speed
    }

    this.update = (players)=>{
        this.move()

        for(let i = 0; i < players.length; i++){

            if(circleBox(this.ballRect.x, this.ballRect.y, this.ballRect.r, players[i].x, players[i].y, dimensions.playerWidth, dimensions.playerHeight )){
                this.dirX *= -1
            }
            //intersects(this, { x: players[i].x, y: players[i].y, width: dimensions.playerWidth, height: dimensions.playerHeight })
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