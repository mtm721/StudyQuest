
export class StudyModeScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'STUDY_MODE'
        })
    }
    init(){

    }
    preload(){
        //Add any images/assets here
        //Ex. this.load.image('scrollBackground', 'static/assets/background/scroll background.png');
    }
    create(){
        //Add background and images
        //Ex. const scrollBackground = this.add.sprite(0,0, 'scrollBackground');

        //For buttons, it's best to use an image of a button.
        //Then do:
        //button.setInteractive();
        //button.on('pointerdown', function() {
            //Fill in
        //}, this);


        //Example for text:
        // const playerPrompt = this.add.text(300, 500, 'Please answer the following question:', {
        //     color: 'black',
        //     fontSize: '20px'
        // });

        //You can also use text as a button.
        //Using the previous examples, replace button.on... with playerPrompt.on...
    }
}
let config = {
    type: Phaser.AUTO,
    width: 640,//Width and height may change later jsyk
    height: 360,
    parent: 'phaser-game',
    scene: [StudyModeScene]
}
let game = new Phaser.Game(config);

