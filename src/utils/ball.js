//пересечение прямоугольника с кругом
const circleBox = require('intersects/circle-box');
const dimensions = require('./dimensions.js')

function randomNumber(min, max, except) {
    let value
    do{
        value = Math.floor(Math.random() * (max - min) ) + min;
    }while(value === except)
    return value
}

function intersects(circle, rect){
    const circleDistance = { x: Math.abs(circle.x - rect.x), y: Math.abs(circle.y - rect.y) }

    if (circleDistance.x > (rect.width/2 + circle.r)) { return false; }
    if (circleDistance.y > (rect.height/2 + circle.r)) { return false; }

    if (circleDistance.x <= (rect.width/2)) { return true; } 
    if (circleDistance.y <= (rect.height/2)) { return true; }

    const cornerDistance_sq = Math.pow((circleDistance.x - rect.width/2),2) +
                     Math.pow((circleDistance.y - rect.height/2),2);

    return (cornerDistance_sq <= Math.pow(circle.r,2));
}

function Ball(){
    this.ballRect = {
        x: dimensions.virtualWidth / 2,
        y: dimensions.virtualHeight / 2,
        r: dimensions.ballR
    }
    this.dirX = -1;//randomNumber(-1, 1, 0)
    this.dirY = -1;//randomNumber(-1, 1, 0)
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
                //console.log(0)
                if(i===0){
                    console.log(players[0].x, players[0].y, dimensions.playerWidth, dimensions.playerHeight)
                    console.log(this.ballRect.x, this.ballRect.y, this.ballRect.r)
                }
                //return 0;
            }
            // if(intersects(this.ballRect, { x: players[i].x, y: players[i].y, width: dimensions.playerWidth, height: dimensions.playerHeight })){
            //     this.dirX *= -1
            //     return 0;
            // }
        }
        if(this.ballRect.y <= 0 || this.ballRect.y + this.ballRect.r*2 >= dimensions.virtualHeight ){
            this.dirY *= -1
        }
        // if(this.ballRect.x <= dimensions.player1_x){
        //     this.dirX *= -1
        //     return 2
        // }
        // if(this.ballRect.x + this.ballRect.r*2 >= dimensions.player2_x){
        //     this.dirX *= -1
        //     return 1
        // }
        if(this.ballRect.x <= dimensions.player1_x){
            this.dirX *= -1
        }
        if(this.ballRect.x + this.ballRect.r*2 >= dimensions.player2_x){
            this.dirX *= -1
        }

    }
}

module.exports = { Ball, dimensions }