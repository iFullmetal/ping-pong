const dimensions = {
    virtualWidth: 160,
    virtualHeight: 100,
    playerWidth: 10,
    playerHeight: 30,
}
dimensions.player1_x = dimensions.playerWidth/2,
dimensions.player2_x = dimensions.virtualWidth - (dimensions.playerWidth + dimensions.playerWidth/2)
dimensions.ballR = 5
module.exports = dimensions