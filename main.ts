/**
 * SPACE SHOOTER
 * 
 * FEATURES:
 * - Player ship moves left and right using the arrow keys or the D-pad.
 * - Press the A button to shoot projectiles.
 * - Enemies randomly spawn at the top and move downward.
 * - Score increases by destroying enemies.
 * - Player has 3 lives. When an enemy reaches the player, the player loses 1 life.
 */

//-----------------------------------------------
// 1. Setup Sprite Kinds
//-----------------------------------------------

//-----------------------------------------------
// 2. Create the Player Sprite
//-----------------------------------------------
let player = sprites.create(img`
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

//-----------------------------------------------
// 3. Player Configuration
//-----------------------------------------------
// Allow the player to move using the controller
controller.moveSprite(player, 100, 0)
// Keep the player from leaving the screen edges
player.setStayInScreen(true)
// Move the player towards the bottom of the screen
player.bottom = 110

//-----------------------------------------------
// 4. Display Score and Lives
//-----------------------------------------------
info.setScore(0)
info.setLife(3)

//-----------------------------------------------
// 5. Handle Shooting Projectiles
//    When the A button is pressed, create a projectile
//    that travels upward from the player.
//-----------------------------------------------
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let projectile = sprites.createProjectileFromSprite(img`
        . . 2 2 . . 
        . 2 2 2 2 . 
        2 2 2 2 2 2 
        2 2 2 2 2 2 
        . 2 2 2 2 . 
        . . 2 2 . . 
    `, player, 0, -100)
    projectile.setKind(SpriteKind.Projectile)
})

//-----------------------------------------------
// 6. Create and Spawn Enemies
//    We'll use an onUpdateInterval() block to spawn
//    a new enemy every second.
//-----------------------------------------------
game.onUpdateInterval(1000, function () {
    let enemy = sprites.create(img`
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

//-----------------------------------------------
// 7. Collision: Projectile vs. Enemy
//    If a projectile overlaps an enemy, destroy both and
//    increase score by 1.
//-----------------------------------------------
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (projectile: Sprite, enemy: Sprite) {
    projectile.destroy()
    enemy.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})

//-----------------------------------------------
// 8. Collision: Enemy vs. Player
//    If an enemy overlaps the player, reduce life by 1
//    and destroy the enemy.
//-----------------------------------------------
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (enemy: Sprite, player: Sprite) {
    enemy.destroy(effects.fire, 100)
    info.changeLifeBy(-1)
})

//-----------------------------------------------
// 9. Optional Improvements to Try:
//    - Increase enemy speed as score goes up.
//    - Track wave levels and spawn more enemies.
//    - Add animations or sound effects.
//    - Show a "Game Over" screen with final score.
//-----------------------------------------------

