class SelectLevel extends Phaser.Scene {
    constructor() {

        super({ key: 'SelectLevel', active: false });

    }

    init() {
        this.CONFIG = this.sys.game.CONFIG;

    }


    preload() {


        this.load.image("btn_play", "assets/img/btn_play_new.png");
        this.load.image("btn_score", "assets/img/btn_score_new.png");
        this.load.image("btn_help", "assets/img/btn_help_new.png");
        this.load.image("btn_exit", "assets/img/btn_exit_new.png");
        this.load.image("btn_score_hover", "assets/img/btn_score_hover_new.png");
        this.load.image("btn_help_hover", "assets/img/btn_help_hover_new.png");

        this.load.image("bgselectLevel", "assets/img/selectLevelBg.png");
        this.load.image("btn_play_hover", "assets/img/btn_play_hover_new.png");

        // this.load.audio('bgMusic', ['assets/Game_Menu.mp3']);
        //this.load.audio('bgMusic', ['assets/TownTheme.mp3']);

    }

    create() {

        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'bgselectLevel');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        // this.logo = this.add.image(game.config.width / 2, this.CONFIG.centerY / 2.5, 'logo');
        // this.logo.displayHeight = game.config.height / 4;
        // this.logo.displayWidth = game.config.width / 3;
        this.Level1 = this.add.text(game.config.width / 2, game.config.height / 5.5, "SELECT LEVEL", {
            fontFamily: 'Courier',
            fontSize: 90,
            fontStyle: 'bold',
            color: '#00ff00',
            shadow: {
                offsetX: 0,
                offsetY: 0,
                color: '#000',
                blur: 0,
                stroke: false,
                fill: false
            },
            wordWrap: {
                width: null,
                callback: null,
                callbackScope: null,
                useAdvancedWrap: false
            },
        }).setOrigin(0.5);

        this.Level1Text = this.add.text(game.config.width / 2.3, game.config.height / 3, "01. LEVEL 1 ").setFontSize(70).setFontFamily("Courier").setOrigin(0.5);
        this.Level2Text = this.add.text(game.config.width / 2.3, game.config.height / 2.3, "02. LEVEL 2 ").setFontSize(70).setFontFamily("Courier").setOrigin(0.5);
        this.Level3Text = this.add.text(game.config.width / 2.3, game.config.height / 1.87, "03. LEVEL 3 ").setFontSize(70).setFontFamily("Courier").setOrigin(0.5);
        this.Level4Text = this.add.text(game.config.width / 2.3, game.config.height / 1.6, "04. LEVEL 4 ").setFontSize(70).setFontFamily("Courier").setOrigin(0.5);
        this.Level5Text = this.add.text(game.config.width / 2.3, game.config.height / 1.4, "05. LEVEL 5 ").setFontSize(70).setFontFamily("Courier").setOrigin(0.5);
        this.Level6Text = this.add.text(game.config.width / 2.3, game.config.height / 1.25, "06. LEVEL 6 ").setFontSize(70).setFontFamily("Courier").setOrigin(0.5);

        this.selected_button = 'Level1';

        this.upArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.back_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.key_home = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.HOME);


        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "SoftRight") {
                //console.log("soft right key");
                this.goToContactScene();

            }
        }, this);

        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "Enter") {
                //console.log("soft left key");
                this.callMenuButton();
            } else if (e.key == "SoftRight" || e.key == "Backspace") {
                //console.log("soft right key");
                //this.goToContactScene();
                this.scene.start("Menu");
            }
        }, this);

        // Game title

        //this.text_title = this.add.text(this.CONFIG.centerX / 3, this.CONFIG.centerY - 600, 'Color Jump');
        //this.text_title.setColor('#FFF');
        //this.text_title.setFontSize('80px');


        // Click to play text
        // this.text_click_to_play = this.add.text(this.CONFIG.centerX/4, this.CONFIG.centerY+80, 'Click to Play');
        // this.text_click_to_play.setColor('#FFF');
        // this.text_click_to_play.setFontSize('80px');

        // Button PLay
        this.btn_play = this.add.sprite(game.config.width / 1.3, game.config.height / 3, 'btn_play_hover', 0).setInteractive();
        this.btn_play.displayHeight = game.config.height / 17.8;
        this.btn_play.displayWidth = game.config.width / 5.6;

        // Button Score
        this.btn_score = this.add.sprite(game.config.width / 1.3, game.config.height / 2.3, 'btn_play', 0).setInteractive();
        this.btn_score.displayHeight = game.config.height / 17.8;
        this.btn_score.displayWidth = game.config.width / 5.6;


        //Button Help
        this.btn_help = this.add.sprite(game.config.width / 1.3, game.config.height / 1.87, 'btn_play', 0).setInteractive();
        this.btn_help.displayHeight = game.config.height / 17.8;
        this.btn_help.displayWidth = game.config.width / 5.6;

        // Button exit
        this.btn_exit = this.add.sprite(game.config.width / 1.3, game.config.height / 1.6, 'btn_play', 0).setInteractive();
        this.btn_exit.displayHeight = game.config.height / 17.8;
        this.btn_exit.displayWidth = game.config.width / 5.6;

        // Button Level5
        this.btn_Level5 = this.add.sprite(game.config.width / 1.3, game.config.height / 1.4, 'btn_play', 0).setInteractive();
        this.btn_Level5.displayHeight = game.config.height / 17.8;
        this.btn_Level5.displayWidth = game.config.width / 5.6;

        // Button Level5
        this.btn_Level6 = this.add.sprite(game.config.width / 1.3, game.config.height / 1.25, 'btn_play', 0).setInteractive();
        this.btn_Level6.displayHeight = game.config.height / 17.8;
        this.btn_Level6.displayWidth = game.config.width / 5.6;


        this.about = this.add.text(game.config.width - game.config.width * 10 / 100, game.config.height - game.config.height * 5 / 100, "Back").setFontSize(60).setFontFamily("Arial").setOrigin(0.5);

        //this.option = this.add.text(game.config.width - game.config.width * 90 / 100, game.config.height - game.config.height * 5 / 100, "Option").setFontSize(50).setFontFamily("Arial").setOrigin(0.5);

        // create mouse input
        // this.createMouseInput();

        // create keyboard input
        // this.createKeyboardInput();

        // press the enter button on the keyboard then play the game
        // then we can move to the "menu scene" to the "play scene"

        // this.model = this.game.globals.model;
        // if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
        //     this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
        //     this.bgMusic.play();
        //     this.model.bgMusicPlaying = true;
        //     this.game.globals.bgMusic = this.bgMusic;
        // }

        // this.input.keyboard.on('keydown', function (event) {
        //     console.log(event.code);
        // });

    }



    update() {

        if (Phaser.Input.Keyboard.JustDown(this.upArrow)) {
            // console.log("UP CLICK");
            this.changeMenuButtonWithArrowUp();
        }

        if (Phaser.Input.Keyboard.JustDown(this.downArrow)) {
            // console.log("DOWN CLICK");
            this.changeMenuButtonWithArrowDown();
        }
        // if (Phaser.Input.Keyboard.JustDown(this.key_home)) {
        //     console.log("home CLICK");
        //      this.goToOptionScene();
        // }

    }

    goToContactScene() {
        this.scene.start('ContactScene');
    }


    goToOptionScene() {
        this.scene.start('OptionScene');
    }

    changeMenuButtonWithArrowDown() {

        switch (this.selected_button) {
            case "Level1":
                this.btn_play.destroy();
                this.btn_play = this.add.sprite(game.config.width / 1.3, game.config.height / 3, 'btn_play', 0).setInteractive();
                this.btn_play.displayHeight = game.config.height / 17.8;
                this.btn_play.displayWidth = game.config.width / 5.6;

                this.btn_score.destroy();
                this.btn_score = this.add.sprite(game.config.width / 1.3, game.config.height / 2.3, 'btn_play_hover', 0).setInteractive();
                this.btn_score.displayHeight = game.config.height / 17.8;
                this.btn_score.displayWidth = game.config.width / 5.6;

                this.selected_button = "Level2"
                break;
            case "Level2":
                this.btn_score.destroy();
                this.btn_score = this.add.sprite(game.config.width / 1.3, game.config.height / 2.3, 'btn_play', 0).setInteractive();
                this.btn_score.displayHeight = game.config.height / 17.8;
                this.btn_score.displayWidth = game.config.width / 5.6;

                this.btn_help.destroy();
                this.btn_help = this.add.sprite(game.config.width / 1.3, game.config.height / 1.87, 'btn_play_hover', 0).setInteractive();
                this.btn_help.displayHeight = game.config.height / 17.8;
                this.btn_help.displayWidth = game.config.width / 5.6;

                this.selected_button = "Level3"
                break;
            case "Level3":
                this.btn_help.destroy();
                this.btn_help = this.add.sprite(game.config.width / 1.3, game.config.height / 1.87, 'btn_play', 0).setInteractive();
                this.btn_help.displayHeight = game.config.height / 17.8;
                this.btn_help.displayWidth = game.config.width / 5.6;

                this.btn_exit.destroy();
                this.btn_exit = this.add.sprite(game.config.width / 1.3, game.config.height / 1.6, 'btn_play_hover', 0).setInteractive();
                this.btn_exit.displayHeight = game.config.height / 17.8;
                this.btn_exit.displayWidth = game.config.width / 5.6;

                this.selected_button = "Level4"
                break;
            case "Level4":

                this.btn_exit.destroy();
                this.btn_exit = this.add.sprite(game.config.width / 1.3, game.config.height / 1.6, 'btn_play', 0).setInteractive();
                this.btn_exit.displayHeight = game.config.height / 17.8;
                this.btn_exit.displayWidth = game.config.width / 5.6;

                this.btn_Level5.destroy();
                this.btn_Level5 = this.add.sprite(game.config.width / 1.3, game.config.height / 1.4, 'btn_play_hover', 0).setInteractive();
                this.btn_Level5.displayHeight = game.config.height / 17.8;
                this.btn_Level5.displayWidth = game.config.width / 5.6;

                this.selected_button = "Level5"
                break;
            case "Level5":

                this.btn_Level5.destroy();
                this.btn_Level5 = this.add.sprite(game.config.width / 1.3, game.config.height / 1.4, 'btn_play', 0).setInteractive();
                this.btn_Level5.displayHeight = game.config.height / 17.8;
                this.btn_Level5.displayWidth = game.config.width / 5.6;

                this.btn_Level6.destroy();
                this.btn_Level6 = this.add.sprite(game.config.width / 1.3, game.config.height / 1.25, 'btn_play_hover', 0).setInteractive();
                this.btn_Level6.displayHeight = game.config.height / 17.8;
                this.btn_Level6.displayWidth = game.config.width / 5.6;

                this.selected_button = "Level6"
                break;
            case "Level6":

                this.btn_Level6.destroy();
                this.btn_Level6 = this.add.sprite(game.config.width / 1.3, game.config.height / 1.25, 'btn_play', 0).setInteractive();
                this.btn_Level6.displayHeight = game.config.height / 17.8;
                this.btn_Level6.displayWidth = game.config.width / 5.6;

                this.btn_play.destroy();
                this.btn_play = this.add.sprite(game.config.width / 1.3, game.config.height / 3, 'btn_play_hover', 0).setInteractive();
                this.btn_play.displayHeight = game.config.height / 17.8;
                this.btn_play.displayWidth = game.config.width / 5.6;

                this.selected_button = "Level1"
                break;
            default:

        }
    }


    changeMenuButtonWithArrowUp() {

        switch (this.selected_button) {
            case "Level1":
                this.btn_play.destroy();
                this.btn_play = this.add.sprite(game.config.width / 1.3, game.config.height / 3, 'btn_play', 0).setInteractive();
                this.btn_play.displayHeight = game.config.height / 17.8;
                this.btn_play.displayWidth = game.config.width / 5.6;

                this.btn_exit.destroy();
                this.btn_exit = this.add.sprite(game.config.width / 2, game.config.height / 1.6, 'btn_play_hover', 0).setInteractive();
                this.btn_exit.displayHeight = game.config.height / 17.8;
                this.btn_exit.displayWidth = game.config.width / 5.6;

                this.btn_help.destroy();
                this.btn_help = this.add.sprite(game.config.width / 1.3, game.config.height / 1.87, 'btn_play_hover', 0).setInteractive();
                this.btn_help.displayHeight = game.config.height / 17.8;
                this.btn_help.displayWidth = game.config.width / 5.6;

                this.selected_button = "Level3"
                break;
            case "Level2":
                this.btn_score.destroy();
                this.btn_score = this.add.sprite(game.config.width / 1.3, game.config.height / 2.3, 'btn_play', 0).setInteractive();
                this.btn_score.displayHeight = game.config.height / 17.8;
                this.btn_score.displayWidth = game.config.width / 5.6;

                this.btn_play.destroy();
                this.btn_play = this.add.sprite(game.config.width / 1.3, game.config.height / 3, 'btn_play_hover', 0).setInteractive();
                this.btn_play.displayHeight = game.config.height / 17.8;
                this.btn_play.displayWidth = game.config.width / 5.6;

                this.selected_button = "Level1"
                break;
            case "Level3":
                this.btn_help.destroy();
                this.btn_help = this.add.sprite(game.config.width / 1.3, game.config.height / 1.87, 'btn_play', 0).setInteractive();
                this.btn_help.displayHeight = game.config.height / 17.8;
                this.btn_help.displayWidth = game.config.width / 5.6;

                this.btn_score.destroy();
                this.btn_score = this.add.sprite(game.config.width / 1.3, game.config.height / 2.3, 'btn_play_hover', 0).setInteractive();
                this.btn_score.displayHeight = game.config.height / 17.8;
                this.btn_score.displayWidth = game.config.width / 5.6;

                this.selected_button = "Level2"
                break;
            case "Level4":
                this.btn_exit.destroy();
                this.btn_exit = this.add.sprite(game.config.width / 2, game.config.height / 1.6, 'btn_play', 0).setInteractive();
                this.btn_exit.displayHeight = game.config.height / 17.8;
                this.btn_exit.displayWidth = game.config.width / 5.6;

                this.btn_help.destroy();
                this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 4.2, 'btn_play_hover', 0).setInteractive();
                this.btn_help.displayHeight = game.config.height / 17.8;
                this.btn_help.displayWidth = game.config.width / 5.6;
                this.selected_button = "Level3"
                break;
            default:

        }
    }

    callMenuButton() {
        switch (this.selected_button) {
            case "Level1":
                //console.log("Play SELECT");
                this.scene.start("Level1")
                break;
            case "Level2":
                //console.log("ScoreScene SELECT");
                this.scene.start("Level2")
                break;
            case "Level3":
                //console.log("Option SELECT");
                this.scene.start("Level3")
                break;
            case "Level4":
                //console.log("Exit SELECT");
                //this.scene.stop();
                this.scene.start("Level4")
                break;
            case "Level5":
                //console.log("Exit SELECT");
                //this.scene.stop();
                this.scene.start("Level5")
                break;
            case "Level6":
                //console.log("Exit SELECT");
                //this.scene.stop();
                this.scene.start("Level6")
                break;
            default:

        }
    }
}
