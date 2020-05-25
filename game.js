// the game itself
var game;



// global game options
var gameOptions = {

    // target rotation speed, in degrees per frame
    rotationSpeed: 5,

    // knife throwing duration, in milliseconds
    throwSpeed: 150,

    // minimum angle between two knives
    minAngle: 15,

    // max rotation speed variation, in degrees per frame
    rotationVariation: 3,

    // interval before next rotation speed variation, in milliseconds
    changeTime: 2000,

    // maximum rotation speed, in degrees per frame
    maxRotationSpeed: 6,

    ///////////////////////////////////////////////////////
    // world gravity
    gravity: 4,

    // ball horizontal speed
    ballSpeed: 4,

    // jump force
    jumpForce: 25,

    // amount of bars each wall is divided in
    bars: 2,

    // array with the colors to pick from
    barColors: [0x1abc9c, 0x2980b9, 0x9b59b6, 0xf1c40f, 0xc0392b, 0xecf0f1]
}

// constants used to pass "LEFT" and "RIGHT" as arguments rather than "0" and "1"
const LEFT = 0;
const RIGHT = 1;
var score = 0;
var scoreText;
var isLevelAchieved = false;
var levelText;
var level = 1;

// function to be executed when the windows has loaded
window.onload = function () {

    // getKaiAd({
    //     publisher: 'ca24f2d0-de89-4c1a-80c4-51e14d317000',
    //     app: 'Pelota',
    //     slot: 'Pelota',
    //     onerror: err => console.error('Custom catch:', err),
    //     onready: ad => {
    //         // Ad is ready to be displayed
    //         // calling 'display' will display the ad
    //         ad.call('display')
    //     }
    // })

    // object containing configuration options
    var gameConfig = {

        // render type: let the game decide if CANVAS of WEBGL
        type: Phaser.AUTO,

        // width of the game, in pixels
        width: 480,

        // height of the game, in pixels
        height: 640,

        // background color (black)
        backgroundColor: 0x10073c,


        // scene to play
        // scene: playGame,

        // physics settings
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
                gravity: {
                    y: 0 //the game gravity
                }
            }
        },
        url: '',
        pixelArt: true,

        scene: [Boot,
            ScoreScene,
            Preloader,
            Options,
            Level1,
            Menu,
            GameOver,
            LevelCompleted,
            HelpScene,
            ContactScene,
            CountDown,
            SelectLevel,
            Level2,
            Level3,
            Level4,
            Level5,
            Level6,
            Level7,
            Level8,
            Level9,
            Level10,
            Level11,
            Level12,
            Level13,
            Level14,
            Level15,
            GameComplete,
            IntroductionScene]
    }

    // game creation
    game = new Phaser.Game(gameConfig);

    game.URL = '';

    game.CONFIG = {
        width: gameConfig.width,
        height: gameConfig.height,
        centerX: Math.round(0.5 * gameConfig.width),
        centerY: Math.round(0.5 * gameConfig.height)
    };


    game.globals = {
        model: new Model(),
        bgMusic: null,
        score: null,
        gameDiffculty: null,
        level: 1,
        ballXposition: game.config.width / 4,
        ballYposition: game.config.height / 2,
    }

    // giving focus to the frame (if any) where the game is running in
    window.focus();

    // pure javascript to scale the canvas
    resize();
    window.addEventListener("resize", resize, false);
}

