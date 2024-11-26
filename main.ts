function checkIfWon () {
    if (sprites2.length == 1) {
        if (sprites2[0] == mp.getPlayerSprite(mp.PlayerNumber.One)) {
            game.splash("Player 1 Wins!")
        } else if (sprites2[0] == mp.getPlayerSprite(mp.PlayerNumber.Two)) {
            game.splash("Player 2 Wins!")
        } else if (sprites2[0] == mp.getPlayerSprite(mp.PlayerNumber.Three)) {
            game.splash("Player 3 Wins!")
        } else {
            game.splash("Player 4 Wins!")
        }
        game.reset()
    }
}
mp.onLifeZero(function (player2) {
    mp.getPlayerSprite(player2).destroy(effects.fire, 500)
    sprites2.removeAt(sprites2.indexOf(mp.getPlayerSprite(player2)))
    if (it == mp.getPlayerSprite(player2)) {
        it.sayText("", 2000, false)
        it = sprites2._pickRandom()
        youreIt()
    }
    checkIfWon()
})
function youreIt () {
    it.sayText("It", 2000, false)
    it.setPosition(randint(5, 155), randint(15, 115))
    it.setKind(SpriteKind.Enemy)
    info.startCountdown(10)
}
info.onCountdownEnd(function () {
    it.setKind(SpriteKind.Player)
    reduceLife(it)
    it = sprites2._pickRandom()
    youreIt()
})
function reduceLife (sprite: Sprite) {
    if (sprite == mp.getPlayerSprite(mp.PlayerNumber.One)) {
        mp.changePlayerStateBy(mp.PlayerNumber.One, MultiplayerState.Lives, -1)
    } else if (sprite == mp.getPlayerSprite(mp.PlayerNumber.Two)) {
        mp.changePlayerStateBy(mp.PlayerNumber.Two, MultiplayerState.Lives, -1)
    } else if (sprite == mp.getPlayerSprite(mp.PlayerNumber.Three)) {
        mp.changePlayerStateBy(mp.PlayerNumber.Three, MultiplayerState.Lives, -1)
    } else {
        mp.changePlayerStateBy(mp.PlayerNumber.Four, MultiplayerState.Lives, -1)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.stopCountdown()
    it.sayText("", 2000, false)
    reduceLife(sprite)
    it = sprite
    otherSprite.setKind(SpriteKind.Player)
    youreIt()
})
let it: Sprite = null
let sprites2: Sprite[] = []
game.showLongText("avoid the monkey that is in", DialogLayout.Center)
game.showLongText("the loser will be trapped in a snake pit of sadness with NO bananas", DialogLayout.Center)
sprites2 = [
sprites.create(img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f . . . . . 
    . c d f d d f d e e f f . . . . 
    . c d f d d f d e e d d f . . . 
    c d e e d d d d e e b d c . . . 
    c d d d d c d d e e b d c . f f 
    c c c c c d d d e e f c . f e f 
    . f d d d d d e e f f . . f e f 
    . . f f f f f e e e e f . f e f 
    . . . . f e e e e e e e f f e f 
    . . . f e f f e f e e e e f f . 
    . . . f e f f e f e e e e f . . 
    . . . f d b f d b f f e f . . . 
    . . . f d d c d d b b d f . . . 
    . . . . f f f f f f f f f . . . 
    `, SpriteKind.Player),
sprites.create(img`
    . . . . f f f f f . . . . . . . 
    . . . f 6 6 6 6 6 f . . . . . . 
    . . f d d d d 6 6 6 f . . . . . 
    . c d f d d f d 6 6 f f . . . . 
    . c d f d d f d 6 6 d d f . . . 
    c d 6 6 d d d d 6 6 b d c . . . 
    c d d d d c d d 6 6 b d c . f f 
    c c c c c d d d 6 6 f c . f 6 f 
    . f d d d d d 6 6 6 f . . f 6 f 
    . . f f f f f 6 6 6 6 f . f 6 f 
    . . . . f 6 6 6 6 6 6 f f f 6 f 
    . . . f 6 f f 6 f 6 6 6 6 f f . 
    . . . f 6 f f 6 f 6 6 6 6 f . . 
    . . . f d b f d b f f 6 6 . . . 
    . . . f d d c d d b b d f . . . 
    . . . . f f f f f f f f f . . . 
    `, SpriteKind.Player),
sprites.create(img`
    . . . . f f f f f . . . . . . . 
    . . . f 7 7 7 7 7 f . . . . . . 
    . . f d d d d 7 7 7 f . . . . . 
    . c d f d d f d 7 7 f f . . . . 
    . c d f d d f d 7 7 d d f . . . 
    c d 7 7 d d d d 7 7 b d c . . . 
    c d d d d c d d 7 7 b d c . f f 
    c c c c c d d d 7 7 f c . f 7 f 
    . f d d d d d 7 7 f f . . f 7 f 
    . . f f f f f 7 7 7 7 f . f 7 f 
    . . . . f 7 7 7 7 7 7 7 f f 7 f 
    . . . f 7 f f 7 f 7 7 7 7 f f . 
    . . . f 7 f f 7 f 7 7 7 7 f . . 
    . . . f d b f d b f f 7 f . . . 
    . . . f d d c d d b b b f . . . 
    . . . . f f f f f f f f f . . . 
    `, SpriteKind.Player),
sprites.create(img`
    . . . . f f f f f . . . . . . . 
    . . . f 3 3 3 3 3 f . . . . . . 
    . . f d d d d 3 3 3 f . . . . . 
    . c d f d d f d 3 3 f f . . . . 
    . c d f d d f d 3 3 d d f . . . 
    c d 3 3 d d d d 3 3 b d c . . . 
    c d d d d c d d 3 3 b d c . f f 
    c c c c c d d d 3 3 f c . f 3 f 
    . f d d d d d 3 3 f f . . f 3 f 
    . . f f f f f 3 3 3 3 f . f 3 f 
    . . . . f 3 3 3 3 3 3 3 f f 3 f 
    . . . f 3 f f 3 f 3 3 3 3 f f . 
    . . . f 3 f f 3 f 3 3 3 3 f . . 
    . . . f d b f d b f f 3 f . . . 
    . . . f d d c d d b b d f . . . 
    . . . . f f f f f f f f f . . . 
    `, SpriteKind.Player)
]
for (let value of mp.allPlayers()) {
    mp.setPlayerSprite(value, sprites2[mp.playerToIndex(value)])
    mp.moveWithButtons(value, mp.getPlayerSprite(value))
    mp.getPlayerSprite(value).setStayInScreen(true)
    mp.setPlayerState(value, MultiplayerState.Lives, 3)
}
mp.getPlayerSprite(mp.PlayerNumber.One).setPosition(5, 15)
mp.getPlayerSprite(mp.PlayerNumber.Two).setPosition(155, 15)
mp.getPlayerSprite(mp.PlayerNumber.Three).setPosition(5, 105)
mp.getPlayerSprite(mp.PlayerNumber.Four).setPosition(155, 105)
it = sprites2._pickRandom()
youreIt()
