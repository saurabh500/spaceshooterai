// -----------------------------------------------
// 7. Collision: Projectile vs. Enemy
// If a projectile overlaps an enemy, destroy both and
// increase score by 1.
// -----------------------------------------------
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (projectile, enemy) {
    projectile.destroy()
    enemy.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
// -----------------------------------------------
// 5. Handle Shooting Projectiles
// When the A button is pressed, create a projectile
// that travels upward from the player.
// -----------------------------------------------
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . 2 2 . . 
        . 2 2 2 2 . 
        2 2 2 2 2 2 
        2 2 2 2 2 2 
        . 2 2 2 2 . 
        . . 2 2 . . 
        `, player, 0, -100)
    projectile.setKind(SpriteKind.Projectile)
})
// -----------------------------------------------
// 8. Collision: Enemy vs. Player
// If an enemy overlaps the player, reduce life by 1
// and destroy the enemy.
// -----------------------------------------------
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (enemy, player) {
    enemy.destroy(effects.fire, 100)
    info.changeLifeBy(-1)
})
let enemy: Sprite = null
let projectile: Sprite = null
let player: Sprite = null
// -----------------------------------------------
// 2. Create the Player Sprite
// -----------------------------------------------
player = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . 9 . . . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . 9 9 9 9 9 9 9 . . . . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . . . . 9 . . . . . . . . 
    . . . . . . . 9 . . . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . 9 9 9 9 9 9 9 . . . . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . . . . 9 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
// -----------------------------------------------
// 3. Player Configuration
// -----------------------------------------------
// Allow the player to move using the controller
controller.moveSprite(player, 100, 0)
// Keep the player from leaving the screen edges
player.setStayInScreen(true)
// Move the player towards the bottom of the screen
player.y = 110
// -----------------------------------------------
// 4. Display Score and Lives
// -----------------------------------------------
info.setScore(0)
info.setLife(3)
// -----------------------------------------------
// 6. Create and Spawn Enemies
// We'll use an onUpdateInterval() block to spawn
// a new enemy every second.
// -----------------------------------------------
game.onUpdateInterval(1000, function () {
    enemy = sprites.create(img`
        . . . 4 4 4 . . . 
        . . 4 5 5 5 4 . . 
        . 4 5 5 5 5 5 4 . 
        4 5 5 5 5 5 5 5 4 
        4 5 5 5 5 5 5 5 4 
        . 4 5 5 5 5 5 4 . 
        . . 4 5 5 5 4 . . 
        . . . 4 4 4 . . . 
        `, SpriteKind.Enemy)
    // Position the enemy somewhere random at the top
    enemy.setPosition(randint(10, 150), 0)
    // Set the enemy to move downward
    enemy.setVelocity(0, 30)
})
