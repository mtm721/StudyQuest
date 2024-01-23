import { CST } from "../CST";
export class CreateFlashcardScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.CREATE_FLASHCARD
        })
    }
    init(){

    }
    preload(){
        
    }
    create(){
        
    }
}
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    parent: "phaser-game",
    scene: [CreateFlashcardScene]
};

let game = new Phaser.Game(config);