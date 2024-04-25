class Movement extends Phaser.Scene
{
    constructor()
    {
        super('movementScene');

        this.my = {sprite: {}};

        this.characterX = 400;
        this.characterY = 450;

        this.fireX = 400;
        this.fireY = 300;

        this.playerSpeed = 200;

        this.aKey = null;
        this.dKey = null;
        
        this.spacebar = null;

        this.isFireballActive = false;

    }

    preload()
    {
        this.load.setPath("./assets/");

        this.load.image("character", "alienPink_stand.png");

        this.load.image("fireball", "fireball.png");
    }

    create()
    {
        // character
        this.my.sprite.character = this.physics.add.sprite(this.characterX, this.characterY, "character");

        // removing gravity from character
        this.my.sprite.character.body.setAllowGravity(false);

        // allowing physics
        this.physics.world.enable(this.my.sprite.character);

        // keys
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.emittedFireball = this.physics.add.group();        
    }

    update()
    {

        let character = this.my.sprite.character;

        // Movement
        if (this.aKey.isDown) 
        {
            character.setVelocityX(-this.playerSpeed);
        } 
        else if (this.dKey.isDown) 
        {
            character.setVelocityX(this.playerSpeed);
        } 
        else 
        {
            character.setVelocityX(0);
        }

        // // Debugging console logs
        // console.log("Character X:", character.x);
        // console.log("Character Display Width:", character.displayWidth);
        // console.log("Scene Width:", this.sys.game.config.width);

        // left/right bounds
        if (character.x < character.displayWidth / 2) 
        {
            character.x = character.displayWidth / 2; 
        } 
        else if (character.x > this.sys.game.config.width - character.displayWidth / 2) 
        {
            character.x = this.sys.game.config.width - character.displayWidth / 2; 
        }

        // top/bottom bounds
        if (character.y < character.displayHeight / 2) 
        {
            character.y = character.displayHeight / 2; 
        } 
        else if (character.y > this.sys.game.config.height - character.displayHeight / 2) 
        {
            character.y = this.sys.game.config.height - character.displayHeight / 2;
        }

        // space shoot
        if (this.spacebar.isDown && !this.isFireballActive) 
        {
            let fireball = this.physics.add.sprite(character.x, character.y, 'fireball');
            fireball.setVelocity(character.body.velocity.x, -500);
            
            // wont let fireball fall (remove this if you want fireball to come back to character)
            fireball.body.setAllowGravity(false); 
            fireball.body.setBounce(0);

            this.isFireballActive = true;

            this.time.delayedCall(1000, () => 
            {
                this.isFireballActive = false;
            });
        }
    
    }

}

