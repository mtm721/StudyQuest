import { CST } from "../CST";
export class DashboardScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.DASHBOARD
        })
    }
    init(){

    }
    preload(){
        this.load.image("flashcard", "static/assets/search.png");
        this.load.image("wizard", "static/assets/wizard.png");
        this.load.image("dragon", "static/assets/dragon.png");
        this.load.image("shop", "static/assets/shop.png");
        this.load.image("profile", "static/assets/profile.png");
        this.load.image("logout", "static/assets/logout.png");
    }
    create(){
        
    }
}
let config = {
        type: Phaser.AUTO,
        width: 550,
        height: 350,
        parent: "phaser-game",
        scene: [DashboardScene]
};
let game = new Phaser.Game(config);