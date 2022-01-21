function setupLevel (level: number) {
    if (level >= levelList.length) {
        return 0
    }
    tiles.loadMap(tiles.copyMap(levelList[level]))
    return 1
}
function chooseLevel () {
    chosenLevel = game.askForNumber("Choose level (1.." + convertToText(levelList.length) + ")", 1)
    if (chosenLevel) {
        currentLevel = Math.constrain(chosenLevel, 1, levelList.length)
        currentLevel = currentLevel - 1
        setupLevel(currentLevel)
        startLevel()
    }
}
function setupAnimations () {
    animBoulderDownSrc = [myTiles.tile35, myTiles.tile33, myTiles.tile31, myTiles.transparency16]
    animBoulderDownDst = [myTiles.tile34, myTiles.tile32, myTiles.tile30, myTiles.tile3]
    animBoulderLeftSrc = [myTiles.tile29, myTiles.tile27, myTiles.tile25, myTiles.transparency16]
    animBoulderLeftDst = [myTiles.tile28, myTiles.tile26, myTiles.tile24, myTiles.tile3]
    animBoulderRightSrc = [myTiles.tile24, myTiles.tile26, myTiles.tile28, myTiles.transparency16]
    animBoulderRightDst = [myTiles.tile25, myTiles.tile27, myTiles.tile29, myTiles.tile3]
    animBoulderUpSrc = [myTiles.tile30, myTiles.tile32, myTiles.tile34, myTiles.transparency16]
    animBoulderUpDst = [myTiles.tile31, myTiles.tile33, myTiles.tile35, myTiles.tile3]
    animBoulderDownLeftSrc = [myTiles.tile27, myTiles.tile42, myTiles.transparency16, myTiles.transparency16]
    animBoulderDownLeftMid = [myTiles.tile26, myTiles.tile43, myTiles.tile33, myTiles.transparency16]
    animBoulderDownLeftDst = [myTiles.transparency16, myTiles.tile44, myTiles.tile32, myTiles.tile3]
    animBoulderDownRightSrc = [myTiles.tile26, myTiles.tile36, myTiles.transparency16, myTiles.transparency16]
    animBoulderDownRightMid = [myTiles.tile27, myTiles.tile37, myTiles.tile33, myTiles.transparency16]
    animBoulderDownRightDst = [myTiles.transparency16, myTiles.tile38, myTiles.tile32, myTiles.tile3]
    animGemDownSrc = [myTiles.tile20, myTiles.tile18, myTiles.tile22, myTiles.transparency16]
    animGemDownDst = [myTiles.tile21, myTiles.tile19, myTiles.tile23, myTiles.tile4]
    animGemDownLeftSrc = [myTiles.tile12, myTiles.tile39, myTiles.transparency16, myTiles.transparency16]
    animGemDownLeftMid = [myTiles.tile11, myTiles.tile40, myTiles.tile18, myTiles.transparency16]
    animGemDownLeftDst = [myTiles.transparency16, myTiles.tile41, myTiles.tile19, myTiles.tile4]
    animGemDownRightSrc = [myTiles.tile11, myTiles.tile15, myTiles.transparency16, myTiles.transparency16]
    animGemDownRightMid = [myTiles.tile12, myTiles.tile16, myTiles.tile18, myTiles.transparency16]
    animGemDownRightDst = [myTiles.transparency16, myTiles.tile17, myTiles.tile19, myTiles.tile4]
}
function createLevelList () {
    levelList = []
    levelList.push(tiles.createMap(tilemap`level_18`))
    levelList.push(tiles.createMap(tilemap`level_19`))
    levelList.push(tiles.createMap(tilemap`level_20`))
    levelList.push(tiles.createMap(tilemap`level_21`))
    levelList.push(tiles.createMap(tilemap`level_22`))
    levelList.push(tiles.createMap(tilemap`level_23`))
    levelList.push(tiles.createMap(tilemap`level_24`))
    levelList.push(tiles.createMap(tilemap`level_25`))
}
function moveRocks () {
    rocksMoving = 0
    ty = tilemapHeight - 1
    while (ty >= 1) {
        tx = 1
        while (tx < tilemapWidth - 1) {
            canDropRock = 0
            if (!(isTileOccupied(tx, ty))) {
                rockUpTile = tiles.getTileLocation(tx, ty - 1)
                if (tiles.tileAtLocationEquals(rockUpTile, myTiles.tile3)) {
                    addAnimation(tx, ty - 1, animBoulderDownSrc)
addAnimation(tx, ty, animBoulderDownDst)
canDropRock = 1
                } else if (tiles.tileAtLocationEquals(rockUpTile, myTiles.tile4)) {
                    addAnimation(tx, ty - 1, animGemDownSrc)
addAnimation(tx, ty, animGemDownDst)
canDropRock = 1
                } else {
                    if (!(isTileOccupied(tx, ty - 1))) {
                        rockRightTile = tiles.getTileLocation(tx + 1, ty)
                        if (tiles.tileAtLocationEquals(rockRightTile, myTiles.tile3) || tiles.tileAtLocationEquals(rockRightTile, myTiles.tile4)) {
                            rockUpRightTile = tiles.getTileLocation(tx + 1, ty - 1)
                            if (tiles.tileAtLocationEquals(rockUpRightTile, myTiles.tile3)) {
                                addAnimation(tx + 1, ty - 1, animBoulderDownLeftSrc)
addAnimation(tx, ty - 1, animBoulderDownLeftMid)
addAnimation(tx, ty, animBoulderDownLeftDst)
canDropRock = 1
                            } else if (tiles.tileAtLocationEquals(rockUpRightTile, myTiles.tile4)) {
                                addAnimation(tx + 1, ty - 1, animGemDownLeftSrc)
addAnimation(tx, ty - 1, animGemDownLeftMid)
addAnimation(tx, ty, animGemDownLeftDst)
canDropRock = 1
                            }
                        }
                        if (!(canDropRock)) {
                            rockLeftTile = tiles.getTileLocation(tx - 1, ty)
                            if (tiles.tileAtLocationEquals(rockLeftTile, myTiles.tile3) || tiles.tileAtLocationEquals(rockLeftTile, myTiles.tile4)) {
                                rockUpLeftTile = tiles.getTileLocation(tx - 1, ty - 1)
                                if (tiles.tileAtLocationEquals(rockUpLeftTile, myTiles.tile3)) {
                                    addAnimation(tx - 1, ty - 1, animBoulderDownRightSrc)
addAnimation(tx, ty - 1, animBoulderDownRightMid)
addAnimation(tx, ty, animBoulderDownRightDst)
canDropRock = 1
                                } else if (tiles.tileAtLocationEquals(rockUpLeftTile, myTiles.tile4)) {
                                    addAnimation(tx - 1, ty - 1, animGemDownRightSrc)
addAnimation(tx, ty - 1, animGemDownRightMid)
addAnimation(tx, ty, animGemDownRightDst)
canDropRock = 1
                                }
                            }
                        }
                    }
                }
                if (canDropRock == 1) {
                    rocksMoving = 1
                    if (isPlayerAt(tx, ty + 1)) {
                        hitByRock()
                    }
                }
            }
            tx += 1
        }
        ty += -1
    }
}
function finishedLevel () {
    music.magicWand.play()
    currentLevel += 1
    if (!(setupLevel(currentLevel))) {
        info.changeScoreBy(info.life() * 30)
        game.over(true, effects.confetti)
    }
    startLevel()
    // Block movement for a short time on level transitions.
    updateInputTime = game.runtime() + 1000
}
function runAnimationTick () {
    // console.log("runAnimationTick " + animNextTick + " from " + oldX + "," + oldY + " to " + newX + "," + newY)
    if (newX != oldX || newY != oldY) {
        mySprite.x = (oldX + (newX - oldX) * (1 + animNextTick) / 4 + 0.5) * tilePixels
        mySprite.y = (oldY + (newY - oldY) * (1 + animNextTick) / 4 + 0.5) * tilePixels
    }
    for (let i = 0; i < animCount; i += 1) {
        let seq = animGridSeq[i]
        let x2 = animGridX[i]
        let y2 = animGridY[i]
        //console.log("  set x=" + x + " y=" + y)
        tiles.setTileAt(tiles.getTileLocation(x2, y2), seq[animNextTick])
        //tiles.setTileAt(tiles.getTileLocation(x, y), myTiles.tile8)
    }
animNextTick += 1
    if (animNextTick == 4) {
        animNextTick = 0
        animCount = 0
        oldX = newX
        oldY = newY
    }
}
function hitByRock () {
    if (waitForRevive == 0) {
        info.changeLifeBy(-1)
        music.wawawawaa.play()
        scene.cameraShake(4, 1000)
        waitForRevive = 20
        mySprite.startEffect(effects.disintegrate, 1000)
        // Delay world updates to avoid double life loss if holding B button a long time.
        updateInputTime = game.runtime() + 2000
    }
}
controller.B.onEvent(ControllerButtonEvent.Repeated, function () {
    if (game.runtime() >= updateInputTime) {
        hitByRock()
    }
})
info.onLifeZero(function () {
    game.over(false, effects.melt)
})
function isTileOccupied (x: number, y: number) {
    if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(x, y), myTiles.transparency16))) {
        return 1
    }
    if (isPlayerAt(x, y)) {
        return 1
    }
    return 0
}
function movePlayer () {
    playerMoving = 1
    oldX = Math.floor(mySprite.x / tilePixels)
    oldY = Math.floor(mySprite.y / tilePixels)
    newX = oldX + moveX
    newY = oldY + moveY
    // console.log("movePlayer by " + moveX + ", " + moveY + " from " + oldX + "," + oldY + " to " + newX + "," + newY)
    newTile = tiles.getTileLocation(newX, newY)
    if (tiles.tileAtLocationEquals(newTile, myTiles.tile1)) {
        playerMoving = 0
    }
    if (tiles.tileAtLocationEquals(newTile, myTiles.tile3)) {
        // If pushing against a rock, move it if there's empty space behind it.
        rockDestTile = tiles.getTileLocation(newX + moveX, newY + moveY)
        if (tiles.tileAtLocationEquals(rockDestTile, myTiles.transparency16)) {
            if (moveX == 1) {
                addAnimation(newX, newY, animBoulderRightSrc)
addAnimation(newX + moveX, newY + moveY, animBoulderRightDst)
            } else if (moveX == -1) {
                addAnimation(newX, newY, animBoulderLeftSrc)
addAnimation(newX + moveX, newY + moveY, animBoulderLeftDst)
            } else if (moveY == -1) {
                addAnimation(newX , newY, animBoulderUpSrc)
addAnimation(newX + moveX, newY + moveY, animBoulderUpDst)
            }
            tiles.setTileAt(rockDestTile, myTiles.tile3)
        } else {
            playerMoving = 0
        }
    }
    if (tiles.tileAtLocationEquals(newTile, myTiles.tile6)) {
        playerMoving = 0
    }
    if (tiles.tileAtLocationEquals(newTile, myTiles.tile4)) {
        info.changeScoreBy(1)
        if (tiles.getTilesByType(myTiles.tile4).length == 1) {
            music.baDing.play()
            effects.smiles.startScreenEffect(500)
            tiles.setTileAt(tiles.getTilesByType(myTiles.tile6).shift(), myTiles.tile7)
        } else {
            soundGetGem.play()
        }
    }
    // console.log("  playerMoving=" + playerMoving)
    if (playerMoving) {
        if (tiles.tileAtLocationEquals(newTile, myTiles.tile7)) {
            finishedLevel()
        }
        if (tiles.tileAtLocationEquals(newTile, myTiles.tile8)) {
            chooseLevel()
        }
        tiles.setTileAt(tiles.getTileLocation(newX, newY), myTiles.transparency16)
    } else {
        newX = oldX
        newY = oldY
    }
}
function startLevel () {
    tilePixels = tiles.tileWidth()
    tilemapWidth = tiles.tilemapColumns()
    tilemapHeight = tiles.tilemapColumns()
    // console.log("tilePixels=" + tilePixels + " tilemapWidth=" + tilemapWidth + " tilemapHeight=" + tilemapHeight)
    tiles.placeOnRandomTile(mySprite, myTiles.tile5)
    oldX = Math.floor(mySprite.x / tilePixels)
    oldY = Math.floor(mySprite.y / tilePixels)
    newX = oldX
    newY = oldY
    startTile = tiles.getTileLocation(newX, newY)
    tiles.setTileAt(startTile, myTiles.transparency16)
    playerMoving = 0
    animGridSeq = []
    animGridX = []
    animGridY = []
    animCount = 0
    for (let y = 0; y < tilemapHeight; y += 1) {
        for (let x = 0; x < tilemapWidth; x += 1) {
            animGridSeq[y * tilemapWidth + x] = null
            animGridX[y * tilemapWidth + x] = 0
            animGridY[y * tilemapWidth + x] = 0
        }
    }
// In case the level starts with loose rocks, move them now
    moveRocks()
}
function isPlayerAt (x: number, y: number) {
    if (waitForRevive > 0) {
        return 0
    }
    if (x == newX && y == newY) {
        return 1
    }
    return 0
}
function setPlayerSprite () {
    mySprite.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 5 5 5 5 5 . . . . . . 
        . . . . . 4 4 4 4 4 . . . . . . 
        . . . . . 4 7 4 7 4 . . . . . . 
        . . . . . 4 4 4 4 4 . . . . . . 
        . . . . . . . 4 . . . . . . . . 
        . . . . . 2 2 2 2 2 . . . . . . 
        . . . 4 2 2 2 2 2 2 2 4 . . . . 
        . . . . . . 8 8 8 . . . . . . . 
        . . . . . . 8 . 8 . . . . . . . 
        . . . . . . 8 . 8 . . . . . . . 
        . . . . . e e . e e . . . . . . 
        `)
}
let updateWorldTime = 0
let startTile: tiles.Location = null
let rockDestTile: tiles.Location = null
let newTile: tiles.Location = null
let playerMoving = 0
let waitForRevive = 0
let tilePixels = 0
let oldY = 0
let oldX = 0
let updateInputTime = 0
let rockUpLeftTile: tiles.Location = null
let rockLeftTile: tiles.Location = null
let rockUpRightTile: tiles.Location = null
let rockRightTile: tiles.Location = null
let rockUpTile: tiles.Location = null
let canDropRock = 0
let rocksMoving = 0
let chosenLevel = 0
let levelList: tiles.WorldMap[] = []
let currentLevel = 0
let mySprite: Sprite = null
let animNextTick = 0
let animGridY: number[] = []
let animGridX: number[] = []
let animGridSeq: Image[][] = []
let animCount = 0
let animBoulderUpSrc: Image[] = []
let animBoulderUpDst: Image[] = []
let animBoulderDownSrc: Image[] = []
let animBoulderDownDst: Image[] = []
let animBoulderLeftSrc: Image[] = []
let animBoulderLeftDst: Image[] = []
let animBoulderRightSrc: Image[] = []
let animBoulderRightDst: Image[] = []
let animBoulderDownLeftSrc: Image[] = []
let animBoulderDownLeftMid: Image[] = []
let animBoulderDownLeftDst: Image[] = []
let animBoulderDownRightSrc: Image[] = []
let animBoulderDownRightMid: Image[] = []
let animBoulderDownRightDst: Image[] = []
let animGemDownSrc: Image[] = []
let animGemDownDst: Image[] = []
let animGemDownLeftSrc: Image[] = []
let animGemDownLeftMid: Image[] = []
let animGemDownLeftDst: Image[] = []
let animGemDownRightSrc: Image[] = []
let animGemDownRightMid: Image[] = []
let animGemDownRightDst: Image[] = []
let ty = 0
let tilemapHeight = 0
let tx = 0
let tilemapWidth = 0
let rockSrcTile = null
let newX = 0
let moveX = 0
let newY = 0
let moveY = 0
function addAnimation (x: number, y: number, seq: Image[]) {
    animGridSeq[animCount] = seq
    animGridX[animCount] = x
    animGridY[animCount] = y
    animCount += 1
}
createLevelList()
setupAnimations()
let soundDrop = new music.Melody("~4 @0,0,255,150 !100,1")
let soundFootstep = new music.Melody("~4 @0,0,60,50 !200,1")
let soundGetGem = new music.Melody("~1 @20,20,60,50 !440,20")
mySprite = sprites.create(img`
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
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
setPlayerSprite()
scene.cameraFollowSprite(mySprite)
info.setLife(5)
info.setScore(0)
let updateInterval = 200
currentLevel = 0
setupLevel(currentLevel)
startLevel()
game.splash("Collect all gems!", "Stuck? Hold B to restart level")
// controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
// if (!playerMoving) {
// moveX = -1
// playerMoving = 1
// }
// })
// controller.left.onEvent(ControllerButtonEvent.Repeated, function() {
// if (!playerMoving) {
// moveX = -1
// playerMoving = 1
// }
// })
// controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
// if (!playerMoving) {
// moveX = 1
// playerMoving = 1
// }
// })
// controller.right.onEvent(ControllerButtonEvent.Repeated, function() {
// if (!playerMoving) {
// moveX = 1
// playerMoving = 1
// }
// })
// controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
// if (!playerMoving) {
// moveY = -1
// playerMoving = 1
// }
// })
// controller.up.onEvent(ControllerButtonEvent.Repeated, function() {
// if (!playerMoving) {
// moveY = -1
// playerMoving = 1
// }
// })
// controller.down.onEvent(ControllerButtonEvent.Pressed, function() {
// if (!playerMoving) {
// moveY = 1
// playerMoving = 1
// }
// })
// controller.down.onEvent(ControllerButtonEvent.Repeated, function() {
// if (!playerMoving) {
// moveY = 1
// playerMoving = 1
// }
// })
game.onUpdate(function () {
    // The update logic is a bit tricky. We want the game to be very responsive to input, reliably detecting even a short button press. However, the world updates happen at a slower rate, so the movement may not take effect until a bit later.
    // 
    // If the player is actively moving, or if rocks are falling, update the game world every updateInterval milliseconds. If nothing is moving, pause world updates until the next movement input, and handle this first step immediately.
    if (!(playerMoving)) {
        // Holding down a movement direction moves the player continuously, one step per updateInterval. The updateInputTime ensures the player doesn't move twice in case the movement started right before a world update and the direction was still held down on the next game update.
        if (game.runtime() >= updateInputTime) {
            if (controller.right.isPressed()) {
                moveX = 1
            } else if (controller.left.isPressed()) {
                moveX = -1
            } else if (controller.down.isPressed()) {
                moveY = 1
            } else if (controller.up.isPressed()) {
                moveY = -1
            }
            if (moveX != 0 || moveY != 0) {
                playerMoving = 1
            }
        }
    }
    // console.log("onUpdate playerMoving=" + playerMoving)
    if (animNextTick > 0) {
        runAnimationTick()
        return
    }
    // assert(animNextTick == 0)
    if (game.runtime() >= updateWorldTime) {
        // If the player is alive, check for new inputs.
        if (waitForRevive > 0) {
            waitForRevive += -1
            if (waitForRevive == 0) {
                effects.clearParticles(mySprite)
                setPlayerSprite()
                setupLevel(currentLevel)
                startLevel()
            }
        } else {
            if (moveX != 0 || moveY != 0) {
                updateInputTime = game.runtime() + updateInterval
                movePlayer()
                moveX = 0
                moveY = 0
            }
            if (playerMoving) {
                soundFootstep.play()
            }
            if (playerMoving || rocksMoving) {
                moveRocks()
            }
            // console.log("onUpdate#2 playerMoving=" + playerMoving + " rocksMoving=" + rocksMoving)
            if (rocksMoving) {
                soundDrop.play()
            }
            if (playerMoving || rocksMoving) {
                // assert(animNextTick == 0)
                runAnimationTick()
                // assert(animNextTick == 1)
                updateWorldTime = game.runtime() + updateInterval
            }
            playerMoving = 0
        }
    }
})

