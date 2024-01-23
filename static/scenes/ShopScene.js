/**
 * Defines a ShopScene object, and displays its elements.
 *
 * @constructs  ShopScene
 * @augments    Phaser.Scene
 */

import { CST } from "../CST.js";
export class ShopScene extends Phaser.Scene {
    /**
     * Constructs a ShopScene game object and screen.
     *
     * @class    ShopScene
     * @augments Phaser.Scene
     */
    constructor(){
        super({
            key: CST.SCENES.SHOP
        })
    }

    /**
     * Initializes a ShopScene object
     */
    init(){

    }

    /**
     * Loads the scene's background and sprite images.
     */
    preload(){
        //load background
        this.load.image('background', 'static/assets/shop/background3.png');
        this.load.image('pointsbg', 'static/assets/shop/smallBanner.png');
        this.load.image('banner', 'static/assets/shop/shopBanner.png');
        this.load.image('itemFrame', 'static/assets/shop/itemBack.png');
        this.load.image('sampleItem', 'static/assets/shop/sample.png')
        this.load.image('purchase', 'static/assets/shop/purchase.png');
        this.load.image('unavailable', 'static/assets/shop/unavailable.png');
        this.load.image('inventory', 'static/assets/shop/inventory.png');
        this.load.image('continue', 'static/assets/shop/continue.png');
        this.load.image('info', 'static/assets/shop/info.png');

        this.load.image('frame', 'static/assets/shop/Ravenmore/frame.png');

        this.load.image('tome', 'static/assets/shop/Ravenmore/tome.png');
        this.load.image('glimmer', 'static/assets/shop/Ravenmore/coin.png');
        this.load.image('stone', 'static/assets/shop/Ravenmore/heart.png');
        this.load.image('test', 'static/assets/shop/Ravenmore/tools.png');
        this.load.image('expensive', 'static/assets/shop/Ravenmore/gemBlue.png');
        this.load.image('ruby', 'static/assets/shop/Ravenmore/gemRed.png');
        this.load.image('sapphire', 'static/assets/shop/Ravenmore/gemBlue.png');
        this.load.image('emerald', 'static/assets/shop/Ravenmore/gemGreen.png');
        this.load.image('woodSword', 'static/assets/shop/Ravenmore/swordWood.png');
        this.load.image('mageWand', 'static/assets/shop/Ravenmore/wand.png');
        this.load.image('wizardWand', 'static/assets/shop/Ravenmore/upg_wand.png');
        this.load.image('scroll', 'static/assets/shop/Ravenmore/scroll.png');
        this.load.image('unknown', 'static/assets/shop/Ravenmore/x.png');

        // Load font
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    }

    /**
     * Creates and navigates game window and the elements of the window.
     *
     * @see Phaser.Scene
     */
    create(){
        let pointsText;

        //create background sprite
        let bg = this.add.sprite(0,0, 'background');

        // resize for canvas
        bg.setScale(2, 2);

        //change the origin to top left corner
        bg.setOrigin(0,0);

        
        let shopBanner = this.add.image(640, 80, 'banner');
        shopBanner.setOrigin(0.5, 0.5);
        shopBanner.setScale(0.44);

        let pointsBackground = this.add.image(450, 20, 'pointsbg');
        pointsBackground.setScale(0.2, 0.15);
        pointsBackground.setOrigin(0.5, 0.5);
        let self = this;
        WebFont.load({
            custom: {
                families: [ 'Macondo' ]
            },
            active: function ()
            {
                pointsText = self.add.text(450, 20, `Points: ${player_points}`, {fontSize: '29px', fill: '#000000', fontFamily: 'Macondo'});
                pointsText.setOrigin(0.5, 0.5);
                let pointsContainer = self.add.container(700, 20, [pointsBackground, pointsText]);
            }
        });
        
        const shopItemSpacing = {x: 150, y: 144};
        const shopStartPosition = {x: 100, y: 120};

        shopItemsData.forEach((item, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;
            const x = shopStartPosition.x + col * shopItemSpacing.x;
            const y = shopStartPosition.y + row * shopItemSpacing.y;

            let spriteSize = 180;
            let itemBack = this.add.sprite(x, y, 'frame');
            itemBack.setScale(spriteSize/itemBack.width, spriteSize/itemBack.height);

            let itemImage = this.add.sprite(x, y, this.getItemImage(item));
            itemImage.setScale(spriteSize/itemImage.width);
            
            let itemInfo = this.add.sprite(x-64, y-64, 'info');
            itemInfo.setInteractive();
            itemInfo.setScale(6/16);
            itemInfo.on('pointerdown', () => this.showItemPopup(item, 'info'));

            let purchaseButton = null;
            if (playerInventoryData.some(function(playerItem) {
                return playerItem.name === item.name;
            })) {
                purchaseButton = this.add.sprite(x, y + 132, 'unavailable');
            } else {
                purchaseButton = this.add.sprite(x, y + 132, 'purchase');
            }
            purchaseButton.setInteractive();
            purchaseButton.on('pointerdown', () => this.onBuyClick(item, purchaseButton, pointsText));
            purchaseButton.setScale(0.7);

            let itemContainer = this.add.container(x, y, [itemBack, itemImage, itemInfo, purchaseButton]);
            itemContainer.setSize(itemBack.width, itemBack.height);

            // shopItems.add(itemContainer); // unnecessary (for now at least)
        });

        // let invBanner = this.add.image(100, 400, 'inventory');
        // invBanner.setScale(1);

        // // let invItems = this.add.group(); // unnecessary (for now at least)

        // const invItemSpacing = {x: 24, y: 24};
        // const invStartPosition = {x: 142, y: 267};

        // playerInventoryData.forEach((item, index) => {
        //     // this.addItemToInventory(item);

        //     // the above would be ideal, but it doesn't work correctly for some reason.
        //     // when multiple items are initially in the player's inventory,
        //     // only the last one gets displayed (in the correct position, oddly enough).
        //     // so for now, just use the below code, which is exactly what is in the above function.

        //     const row = Math.floor(index / 12);
        //     const col = index % 12;
        //     const x = invStartPosition.x + col * invItemSpacing.x;
        //     const y = invStartPosition.y + row * invItemSpacing.y;

        //     // let itemBack = this.add.sprite(x, y, 'itemFrame');
        //     // itemBack.setScale(0.50);
        //     let spriteSize = 64;
        //     let itemBack = this.add.sprite(x, y, 'frame');
        //     itemBack.setScale(spriteSize/itemBack.width, spriteSize/itemBack.height);
        //     itemBack.setInteractive();

        //     let itemImage = this.add.sprite(x, y, this.getItemImage(item));
        //     // itemImage.setScale(0.50);
        //     itemImage.setScale(spriteSize/itemImage.width);
        //     itemImage.setInteractive();
        //     itemImage.on('pointerdown', () => this.showItemPopup(item, 'info'));

        //     let itemContainer = this.add.container(x, y, [itemBack, itemImage]);
        //     itemContainer.setScale(0.50);
        //     itemContainer.setSize(itemBack.width, itemBack.height);

        //     // invItems.add(itemContainer); // unnecessary (for now at least)
        // });
    }

    /**
     * Calls shop.purchaseItem().
     *
     * @param item
     * @param purchaseButton
     * @param points
     *
     * @see purchaseItem
     */
    onBuyClick(item, purchaseButton, points) {
        // console.log(`Attempting to buy ${item.name} for ${item.cost} points`);
        purchaseItem(item, this.updateUIAfterPurchase.bind(this), this.showItemPopup.bind(this), purchaseButton, points);
    }

    /**
     * Updates UI elements after the player purchases an item.
     *
     * @param item
     * @param button
     * @param points
     *
     * @see addItemToInventory
     */
    updateUIAfterPurchase(item, button, points) {
        // console.log(`UI Update: Purchased ${item.name} for ${item.cost} points`);
        // update player points
        points.setText(`Points: ${player_points}`);
        // change purchase button to unavailable button
        button.setTexture('unavailable');
        // add item to player's inventory
        this.addItemToInventory(item);
        this.showItemPopup(item, 'purchase');
    }

    /**
     * Adds an item to the player's on-screen inventory.
     *
     * @param item
     */
    addItemToInventory(item) {
        const pos = playerInventoryData.length - 1;
        const invItemSpacing = {x: 24, y: 24};
        const invStartPosition = {x: 142, y: 267};
        const row = Math.floor(pos / 12);
        const col = pos % 12;
        const x = invStartPosition.x + col * invItemSpacing.x;
        const y = invStartPosition.y + row * invItemSpacing.y;

        // let itemBack = this.add.sprite(x, y, 'itemFrame');
        // itemBack.setScale(0.50);
        let spriteSize = 64;
        let itemBack = this.add.sprite(x, y, 'frame');
        itemBack.setScale(spriteSize/itemBack.width, spriteSize/itemBack.height);
        itemBack.setInteractive();

        let itemImage = this.add.sprite(x, y, this.getItemImage(item));
        // itemImage.setScale(0.50);
        itemImage.setScale(spriteSize/itemImage.width);
        itemImage.setInteractive();
        itemImage.on('pointerdown', () => this.showItemPopup(item, 'info'));

        let itemContainer = this.add.container(x, y, [itemBack, itemImage]);
        itemContainer.setScale(0.50);
        itemContainer.setSize(itemBack.width, itemBack.height);

        // inventory.add(itemContainer);
    }


    /**
     * Gets an item's name and returns its respective image.
     *
     * @param item
     * @returns {string}
     */
    getItemImage(item) {
        // would be better not to hard code like this, but it's fine for the scope of this project
        if (item.name.includes("Tome")) {
            return 'tome';
        } else if (item.name.includes("Glimmer")) {
            return 'glimmer';
        } else if (item.name.includes("Stone")) {
            return 'stone';
        } else if (item.name.includes("Test")) {
            return 'test';
        } else if (item.name.includes("Expensive")) {
            return 'expensive';
        } else if (item.name.includes("Ruby")) {
            return 'ruby';
        } else if (item.name.includes("Sapphire")) {
            return 'sapphire';
        } else if (item.name.includes("Emerald")) {
            return 'emerald';
        } else if (item.name.includes("Mage")) {
            return 'mageWand';
        } else if (item.name.includes("Wizard")) {
            return 'wizardWand';
        } else if (item.name.includes("Wooden")) {
            return 'woodSword';
        } else if (item.name.includes("Scroll")) {
            return 'scroll';
        } else {
            return 'unknown';
        }
    }

    showItemPopup(item, type) {
        let back = this.add.rectangle(384, 216, 768, 432, 0x000000, 0.45);
        back.setInteractive();
        let frame = this.add.sprite(384, 216, 'frame');
        frame.setScale(1.5);
        let closeButton = this.add.sprite(384, 375, 'continue');
        closeButton.setInteractive();
        closeButton.on('pointerdown', () => {
            popupContainer.destroy();
        });
        let content = [];
        if (type === 'info') {
            let name = this.add.text(384, 150, item.name, {fontSize: '22px', fill: '#000000'});
            name.setOrigin(0.5, 0.5);
            let cost = this.add.text(384, 180, `${item.cost} pts`, {fontSize: '20px', fill: '#000000'});
            cost.setOrigin(0.5, 0.5);
            let description = this.add.text(384, 220, item.description, {fontSize: '16px', fill: '#000000', wordWrap: { width: 350 }});
            description.setOrigin(0.5, 0.5);
            content.push(name, cost, description);
        } else if (type === 'purchase') {
            let message = this.add.text(384, 200, `You've purchased ${item.name} for ${item.cost} points.`, {fontSize: '16px', fill: '#000000', wordWrap: { width: 350 }});
            message.setOrigin(0.5, 0.5);
            content.push(message);
        } else if (type === 'alreadyowned') {
            let message = this.add.text(384, 200, "You already own this item.", {fontSize: '16px', fill: '#000000'});
            message.setOrigin(0.5, 0.5);
            content.push(message);
        } else if (type === 'notenoughpoints') {
            let message = this.add.text(384, 200, "You don't have enough\npoints for this item.", {fontSize: '16px', fill: '#000000'});
            message.setOrigin(0.5, 0.5);
            content.push(message);
        } else {
            let message = this.add.text(384, 200, "Hi! This shouldn't be here.", {fontSize: '16px', fill: '#000000'});
            message.setOrigin(0.5, 0.5);
            content.push(message);
        }
        let popupContainer = this.add.container(0, 0, [back, frame, closeButton]);
        content.forEach((element) => popupContainer.add(element));
        popupContainer.setScale(1);
        popupContainer.setSize(768, 432);
        this.add.existing(popupContainer);
    }
}

let config = {
    type: Phaser.AUTO,//Phaser will render using WebGL if possible, Canvas API if not
    width: 1280,
    height: 720,
    scene: [ShopScene], //List of scenes
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

// create a new game, pass the configuration
let game = new Phaser.Game(config);
