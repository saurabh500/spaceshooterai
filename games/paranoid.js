namespace SpriteKind {
    export const blocker = SpriteKind.create()
    export const win = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.vy = 0 - sprite.vy
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.win, function (sprite, otherSprite) {
    game.gameOver(true)
    game.setGameOverMessage(true, "YOU WON!!!")
})
tiles.setCurrentTilemap(tilemap`level`)
let paddle = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 f f 1 1 1 1 1 1 1 1 2 1 f f 1 
    1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 1 
    `, SpriteKind.Player)
controller.moveSprite(paddle, 75, 0)
paddle.setStayInScreen(true)
paddle.setPosition(80, 105)
let ball = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . 1 1 1 1 1 . . . . . . 
    . . . . . 1 1 1 1 1 . . . . . . 
    . . . . . 1 1 1 1 1 . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Projectile)
ball.setPosition(randint(scene.screenWidth(), 10), randint(scene.screenWidth(), 10))
ball.setVelocity(50, -50)
ball.setStayInScreen(true)
ball.setBounceOnWall(true)
tiles.setWallAt(tiles.getTileLocation(0, 0), false)
game.onUpdate(function () {
    if (ball.isHittingTile(CollisionDirection.Bottom)) {
        ball.setPosition(randint(0, scene.screenWidth()), randint(0, 20))
        info.changeLifeBy(-1)
    }
})
game.onUpdate(function () {
    if (ball.isHittingTile(CollisionDirection.Bottom)) {
        ball.setPosition(randint(scene.screenWidth(), 10), randint(scene.screenWidth(), 10))
        ball.setVelocity(50, 50)
        ball.setStayInScreen(true)
        ball.setBounceOnWall(true)
    }
})
