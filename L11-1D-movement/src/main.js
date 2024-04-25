// Hasina Esteqlal
// Created: 4/24/2024
// Phaser: 3.70.0
//
// 1D Movement
//
// An example of putting sprites on the screen using Phaser
// 
// Art assets from Kenny Assets "Platformer Pack Redux" set:
// https://kenney.nl/assets/platformer-pack-redux 

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 800,
    height: 600,

    fps: { 
        forceSetTimeOut: 
        true, target: 30 
    },

    physics: {
        default: 'arcade', 
        arcade: {
            gravity: { y: 200 },
            debug: false 
        }
    },

    scene: [Movement]

}

const game = new Phaser.Game(config);