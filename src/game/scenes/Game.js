import { Scene } from 'phaser';

const SKIER_SPEED = 100; // pixels per second
const SKIER_HORIZONTAL_SPEED = 200; // pixels per second

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        console.log("Game Scene Created!");
        // INSTRUCTIONS:
        //
        // The Tiled map JSON file is expected at `public/assets/Tiled/Dilek\'s_Ski_Resort_Map.json`.
        // The tileset image is expected at `public/assets/Tilemap/tilemap.png`.
        // The skier sprite is expected at `public/assets/Tiles/tile_0083.png`.

        // Create the tilemap
        const map = this.make.tilemap({ key: 'map' });

        // Add the tileset to the map. The first parameter is the name of the tileset in Tiled
        // (which is 'tilemap' based on sampleSheet.tsx) and the second parameter is the key of the tileset image in Phaser.
        const tileset = map.addTilesetImage('tilemap', 'tiles');

        // Create the background layer. The parameter is the name of the layer in Tiled (e.g., 'Terrain').
        map.createLayer('Terrain', tileset, 0, 0);
        map.createLayer('Shadows', tileset, 0, 0);
        map.createLayer('Objects', tileset, 0, 0);

        // Create the skier sprite
        this.skier = this.physics.add.sprite(
            this.cameras.main.width / 2, 
            100, 
            'skier'
        );

        // Set the skier to move straight down
        this.skier.setVelocityY(SKIER_SPEED);

        map.createLayer('Lift', tileset, 0, 0);

        // Enable keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update ()
    {
        // Loop the skier when they go off the bottom of the screen
        if (this.skier.y > this.cameras.main.height)
        {
            this.skier.y = 0;
        }

        // Horizontal movement control
        if (this.cursors.left.isDown)
        {
            this.skier.setVelocityX(-SKIER_HORIZONTAL_SPEED);
        }
        else if (this.cursors.right.isDown)
        {
            this.skier.setVelocityX(SKIER_HORIZONTAL_SPEED);
        }
        else
        {
            this.skier.setVelocityX(0);
        }
    }
}
