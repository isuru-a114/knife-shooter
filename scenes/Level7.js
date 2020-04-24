// PlayGame scene
class Level7 extends Phaser.Scene {

    // constructor
    constructor() {
        super("Level7");
    }

    // method to be executed when the scene preloads
    preload() {

        // loading assets
        this.load.image("playBG", "assets/img/Gameplay.png")
        this.load.image("rock", "assets/img/rock.png");
        this.load.image("knife", "assets/img/knife.png");
        this.load.image("score", "assets/img/Score-Button.png")
        this.load.spritesheet("apple", "assets/img/apple.png", {
            frameWidth: 70,
            frameHeight: 96
        });
        this.load.spritesheet('target', 'assets/img/spritesheet.png', {
            frameWidth: 306,
            frameHeight: 306
        });
    }

    // method to be executed once the scene has been created
    create() {

        //background
        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'playBG');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        //score
        this.score_btn = this.add.image(game.config.width / 4, game.config.height / 15 + 5, 'score');
        this.score_btn.displayHeight = game.config.height / 10;;
        this.score_btn.displayWidth = game.config.width / 2.4;

        //LEVEL
        this.score_btn = this.add.image(game.config.width / 1.3, game.config.height / 15 + 5, 'score');
        this.score_btn.displayHeight = game.config.height / 10;;
        this.score_btn.displayWidth = game.config.width / 2.4;

        //score 
        this.score = score;
        scoreText = this.add.text(game.config.width / 16, game.config.height / 25, 'SCORE:' + this.score, { fontSize: '70px', fill: '#FFF' });

        //level
        levelText = this.add.text(game.config.width / 1.6, game.config.height / 25, 'LEVEL:2', { fontSize: '70px', fill: '#FFF' });

        // at the beginning of the game, both current rotation speed and new rotation speed are set to default rotation speed
        this.currentRotationSpeed = gameOptions.rotationSpeed;
        this.newRotationSpeed = gameOptions.rotationSpeed;

        // can the player throw a knife? Yes, at the beginning of the game
        this.canThrow = true;

        // group to store all rotating knives
        this.knifeGroup = this.add.group();

        // adding the knife
        this.knife = this.add.sprite(game.config.width / 2, game.config.height / 5 * 4, "knife");

        // adding the target
        this.target = this.add.sprite(game.config.width / 2, 400, "target");

        // moving the target to front
        this.target.depth = 1;

        // starting apple angle
        var appleAngle = Phaser.Math.Between(0, 360);
        var appleAngle2 = Phaser.Math.Between(0, 360);
        var rockAngle = Phaser.Math.Between(0, 360);

        // determing apple angle in radians
        var radians = Phaser.Math.DegToRad(appleAngle - 90);
        var radians2 = Phaser.Math.DegToRad(appleAngle - 90);

        // adding the apple
        this.apple = this.add.sprite(this.target.x + (this.target.width / 2) * Math.cos(radians), this.target.y + (this.target.width / 2) * Math.sin(radians), "apple");
        this.apple2 = this.add.sprite(this.target.x + (this.target.width / 2) * Math.cos(radians), this.target.y + (this.target.width / 2) * Math.sin(radians2), "apple");
        this.rock = this.physics.add.sprite(this.target.x + (this.target.width / 2) * Math.cos(radians), this.target.y + (this.target.width / 2) * Math.sin(radians), "rock");

        // setting apple's anchor point to bottom center
        this.apple.setOrigin(0.5, 1);
        this.apple2.setOrigin(0.5, 1);
        this.rock.setOrigin(0.5, 1);

        // setting apple sprite angle
        this.apple.angle = appleAngle;
        this.apple2.angle = appleAngle2;
        this.rock.angle = rockAngle;

        // saving apple start angle
        this.apple.startAngle = appleAngle;
        this.apple2.startAngle = appleAngle2;
        this.rock.startAngle = rockAngle;

        // apple depth is the same as target depth
        this.apple.depth = 1;
        this.apple2.depth = 1;
        this.rock.depth = 1;

        // has the apple been hit?
        this.apple.hit = false;
        this.apple2.hit = false;
        this.rock.hit = false;

        // waiting for player input to throw a knife
        this.input.keyboard.on("keyup_ENTER", this.throwKnife, this);
        // this.input.on("pointerdown", this.throwKnife, this);

        // this is how we create a looped timer event
        var timedEvent = this.time.addEvent({
            delay: gameOptions.changeTime,
            callback: this.changeSpeed,
            callbackScope: this,
            loop: true
        });
    }

    // method to change the rotation speed of the target
    changeSpeed() {

        // ternary operator to choose from +1 and -1
        var sign = Phaser.Math.Between(0, 1) == 0 ? -1 : 1;

        // random number between -gameOptions.rotationVariation and gameOptions.rotationVariation
        var variation = Phaser.Math.FloatBetween(-gameOptions.rotationVariation, gameOptions.rotationVariation);

        // new rotation speed
        this.newRotationSpeed = (this.currentRotationSpeed + variation) * sign;

        // setting new rotation speed limits
        this.newRotationSpeed = Phaser.Math.Clamp(this.newRotationSpeed, -gameOptions.maxRotationSpeed, gameOptions.maxRotationSpeed);
    }

    // method to throw a knife
    throwKnife() {

        // can the player throw?
        if (this.canThrow) {

            // player can't throw anymore
            this.canThrow = false;

            // tween to throw the knife
            this.tweens.add({

                // adding the knife to tween targets
                targets: [this.knife],

                // y destination
                y: this.target.y + this.target.width / 2,

                // tween duration
                duration: gameOptions.throwSpeed,

                // callback scope
                callbackScope: this,

                // function to be executed once the tween has been completed
                onComplete: function (tween) {

                    // at the moment, this is a legal hit
                    var legalHit = true;

                    // getting an array with all rotating knives
                    var children = this.knifeGroup.getChildren();

                    // looping through rotating knives
                    for (var i = 0; i < children.length; i++) {

                        // is the knife too close to the i-th knife?
                        if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, children[i].impactAngle)) < gameOptions.minAngle) {

                            // this is not a legal hit
                            legalHit = false;

                            // no need to continue with the loop
                            break;
                        }
                    }

                    //score
                    this.score += 10;
                    scoreText.setText('SCORE:' + this.score);
                    // is this a legal hit?
                    if (legalHit) {

                        // is the knife close enough to the apple? And the appls is still to be hit?
                        if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, 180 - this.apple.startAngle)) < gameOptions.minAngle && !this.apple.hit) {
                            console.log("he he he")
                            // apple has been hit
                            this.apple.hit = true;
                            this.score += 20;
                            scoreText.setText('SCORE:' + this.score);

                            // change apple frame to show one slice
                            this.apple.setFrame(1);

                            // add the other apple slice in the same apple posiiton
                            var slice = this.add.sprite(this.apple.x, this.apple.y, "apple", 2);

                            // same angle too.
                            slice.angle = this.apple.angle;

                            // and same origin
                            slice.setOrigin(0.5, 1);

                            // tween to make apple slices fall down
                            this.tweens.add({

                                // adding the knife to tween targets
                                targets: [this.apple, slice],

                                // y destination
                                y: game.config.height + this.apple.height,

                                // x destination
                                x: {

                                    // running a function to get different x ends for each slice according to frame number
                                    getEnd: function (target, key, value) {
                                        return Phaser.Math.Between(0, game.config.width / 2) + (game.config.width / 2 * (target.frame.name - 1));
                                    }
                                },

                                // rotation destination, in radians
                                angle: 45,

                                // tween duration
                                duration: gameOptions.throwSpeed * 6,

                                // callback scope
                                callbackScope: this,

                                // function to be executed once the tween has been completed
                                // onComplete: function (tween) {

                                //     // restart the game
                                //     this.scene.start("EasyPlayGame")
                                // }
                            });
                        }

                        //for apple 2
                        // is the knife close enough to the apple? And the appls is still to be hit?
                        if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, 180 - this.apple2.startAngle)) < gameOptions.minAngle && !this.apple2.hit) {

                            // apple has been hit
                            this.apple2.hit = true;
                            this.score += 20;
                            scoreText.setText('SCORE:' + this.score);

                            // change apple frame to show one slice
                            this.apple2.setFrame(1);

                            // add the other apple slice in the same apple posiiton
                            var slice2 = this.add.sprite(this.apple2.x, this.apple2.y, "apple", 2);

                            // same angle too.
                            slice2.angle = this.apple2.angle;

                            // and same origin
                            slice2.setOrigin(0.5, 1);

                            // tween to make apple slices fall down
                            this.tweens.add({

                                // adding the knife to tween targets
                                targets: [this.apple2, slice2],

                                // y destination
                                y: game.config.height + this.apple2.height,

                                // x destination
                                x: {

                                    // running a function to get different x ends for each slice according to frame number
                                    getEnd: function (target, key, value) {
                                        return Phaser.Math.Between(0, game.config.width / 2) + (game.config.width / 2 * (target.frame.name - 1));
                                    }
                                },

                                // rotation destination, in radians
                                angle: 45,

                                // tween duration
                                duration: gameOptions.throwSpeed * 6,

                                // callback scope
                                callbackScope: this,

                                // function to be executed once the tween has been completed
                                // onComplete: function (tween) {

                                //     // restart the game
                                //     this.scene.start("EasyPlayGame")
                                // }
                            });
                        }

                        // player can now throw again
                        this.canThrow = true;

                        // adding the rotating knife in the same place of the knife just landed on target
                        var knife = this.add.sprite(this.knife.x, this.knife.y, "knife");

                        // impactAngle property saves the target angle when the knife hits the target
                        knife.impactAngle = this.target.angle;

                        // adding the rotating knife to knifeGroup group
                        this.knifeGroup.add(knife);

                        // bringing back the knife to its starting position
                        this.knife.y = game.config.height / 5 * 4;
                    }
                    // in case this is not a legal hit
                    else {

                        // tween to make the knife fall down
                        this.tweens.add({

                            // adding the knife to tween targets
                            targets: [this.knife],

                            // y destination
                            y: game.config.height + this.knife.height,

                            // rotation destination, in radians
                            rotation: 5,

                            // tween duration
                            duration: gameOptions.throwSpeed * 4,

                            // callback scope
                            callbackScope: this,

                            // function to be executed once the tween has been completed
                            onComplete: function (tween) {

                                // restart the game
                                this.scene.start("GameOver")
                            }
                        });
                    }
                    score = this.score;
                    if (this.score >= 900) {
                        this.target.setFrame(1, 2);
                        var slice2 = this.add.sprite(this.target.x, this.target.y, "target", 5);
                        slice2.displayHeight = 153;
                        slice2.displayWidth = 153;
                        slice2.angle = this.target.angle;
                        slice2.setOrigin(0.5, 1)

                        // break board
                        this.tweens.add({

                            // adding the knife to tween targets
                            targets: [this.target, slice2],

                            // y destination
                            y: game.config.height + this.target.height,

                            // x destination
                            x: {

                                // running a function to get different x ends for each slice according to frame number
                                getEnd: function (target, key, value) {
                                    return Phaser.Math.Between(0, game.config.width / 2) + (game.config.width / 2 * (target.frame.name - 1));
                                }
                            },

                            // rotation destination, in radians
                            angle: 45,

                            // tween duration
                            duration: gameOptions.throwSpeed * 6,

                            // callback scope
                            callbackScope: this,

                            // function to be executed once the tween has been completed
                            onComplete: function (tween) {

                                // restart the game
                                this.scene.start("GameOver")
                            }
                        });
                        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
                    }
                }
            });
        }
    }

    onEvent() {
        this.scene.start("Level8")
    }

    // method to be executed at each frame. Please notice the arguments.
    update(time, delta) {

        // rotating the target
        this.target.angle += this.currentRotationSpeed;

        // getting an array with all rotating knives
        var children = this.knifeGroup.getChildren();

        // looping through rotating knives
        for (var i = 0; i < children.length; i++) {

            // rotating the knife
            children[i].angle += this.currentRotationSpeed;

            // turning knife angle in radians
            var radians = Phaser.Math.DegToRad(children[i].angle + 90);

            // trigonometry to make the knife rotate around target center
            children[i].x = this.target.x + (this.target.width / 2) * Math.cos(radians);
            children[i].y = this.target.y + (this.target.width / 2) * Math.sin(radians);
        }

        // if the apple has not been hit...
        if (!this.apple.hit) {

            // adjusting apple rotation
            this.apple.angle += this.currentRotationSpeed;

            // turning apple angle in radians
            var radians = Phaser.Math.DegToRad(this.apple.angle - 90);

            // adjusting apple position
            this.apple.x = this.target.x + (this.target.width / 2) * Math.cos(radians);
            this.apple.y = this.target.y + (this.target.width / 2) * Math.sin(radians);
        }

        // if the apple2 has not been hit...
        if (!this.apple2.hit) {

            // adjusting apple rotation
            this.apple2.angle += this.currentRotationSpeed;

            // turning apple angle in radians
            var radians = Phaser.Math.DegToRad(this.apple2.angle - 90);

            // adjusting apple position
            this.apple2.x = this.target.x + (this.target.width / 2) * Math.cos(radians);
            this.apple2.y = this.target.y + (this.target.width / 2) * Math.sin(radians);
        }

        // if the rock has not been hit...
        if (!this.rock.hit) {

            // adjusting apple rotation
            this.rock.angle += this.currentRotationSpeed;

            // turning apple angle in radians
            var radians = Phaser.Math.DegToRad(this.rock.angle - 90);

            // adjusting apple position
            this.rock.x = this.target.x + (this.target.width / 2) * Math.cos(radians);
            this.rock.y = this.target.y + (this.target.width / 2) * Math.sin(radians);
        }

        // adjusting current rotation speed using linear interpolation
        this.currentRotationSpeed = Phaser.Math.Linear(this.currentRotationSpeed, this.newRotationSpeed, delta / 1000);
    }
}

// pure javascript to scale the game
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}