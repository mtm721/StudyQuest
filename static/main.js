import { CreateFlashcardScene } from "./scenes/CreateFlashcardsScene";
import { DashboardScene } from "./scenes/DashboardScene";
import { LoginScene } from "./scenes/LoginScene";
import { ShopScene } from "./scenes/ShopScene";
import { StudyModeScene } from "./scenes/StudyModeScene";
import { TestingModeScene } from "./scenes/TestingModeScene";
//import { TestingModeQuestionScene } from "./scenes/TestingModeQuestionScene";

//create a new scene
let gameScene = new Phaser.Scene('Game');

//set the configuration of the game
let config = {
    type: Phaser.AUTO,//Phaser will render using WebGL if possible, Canvas API if not
    width: 640,
    height: 360,
    scene: [ //List of scenes
        CreateFlashcardScene,
        DashboardScene,
        LoginScene,
        ShopScene,
        StudyModeScene,
        TestingModeScene
//        TestingModeQuestionScene
    ]
}

//create a new game, pass the configuration
let game = new Phaser.Game(config);