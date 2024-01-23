var dragonSprite, player, cursors, facingLeft, movingPlatform, timedEvent;
var playerHealth, dragonHealth, dragonHealthDisplay, playerHealthDisplay, playerHealthBar, dragonHealthBar;
const projectileVelocity = 200;
const jumpVelocity = -700;
const lrVelocity = 150;
var dragonSpriteArray = [];
const tileWidth = 17;
const tileHeight = 18;
const level1Height = 250;
const level3Height = 140;
var platformGoingUp = true;
const platformYVelocity = 50;
const playerInput = document.createElement('input');

var questionCounter = 0;
var originalQuestionsLength = questionData.length;
var questions = [];
for (let i = 0; i < questionData.length; i++) {
    // boolean false at the end to keep track of whether the question was answered correctly
    questions.push([questionData[i]["term"], questionData[i]["definition"], false]);
}
// shuffle questions here
questions = shuffle(questions);

dragonHealth = Math.ceil(originalQuestionsLength * 0.8); // 80% of # of questions
playerHealth = originalQuestionsLength;
console.log(`dragonHealth: ${dragonHealth}`);
console.log(`playerHealth: ${playerHealth}`);


class TestingModeScene extends Phaser.Scene {
    redProjectilesGroup;
    blueProjectilesGroup;
    constructor(){
        super({
            key: 'TESTING_MODE'

        });
    }

    init(){
        
    }

    preload(){
        
        // Load background
        this.load.image('background', 'static/assets/background/0.png');
        
        // Load player
        this.load.spritesheet('player', 'static/assets/sprites/playerSpriteSheet.png', {frameWidth: 128, frameHeight: 128});
        
        // Load projectiles
        this.load.spritesheet('blueProjectile', 'static/assets/sprites/projectiles/blueProjectile.png', {frameWidth: 512, frameHeight: 197});
        this.load.spritesheet('redProjectile', 'static/assets/sprites/projectiles/redProjectile.png', {frameWidth: 512, frameHeight: 197});

        // Load dragon
        this.load.path = 'static/assets/sprites/dragon/dragonAttack/';
        this.load.multiatlas('dragonAttack', 'dragonAttack.json');
        this.load.path = '';

        // Load fullscreen icon
        this.load.spritesheet('fullscreen', 'static/assets/fullscreen.png', { frameWidth: 64, frameHeight: 64 });

        // Load platform images
        this.load.image('platform', 'static/assets/platform.png')
    
    }

    create(){

        // Pause scene while directions are showing
        this.scene.pause('TESTING_MODE');
        // Upon loading, show directions
        this.scene.launch('DIRECTIONS');
        
        this.physics.world.setBounds(0, -100, this.sys.game.config.width, this.sys.game.config.height + 100);


        this.bgSetup();

        // this.healthDisplaySetup();

        this.createPlayerSprite();

        this.createDragonSprite();

        this.enableDragonSpitFire();

        this.playerDragonCollision();

        cursors = this.input.keyboard.createCursorKeys();

        this.enableFullscreen();

        this.enablePlayerShootSpell();
      
        this.createPlatforms();

    }

    bgSetup() {
        // Create background sprite
        let bg = this.add.sprite(0,0, 'background');

        // Resize for canvas
        bg.setScale(this.sys.game.config.width / bg.width, this.sys.game.config.height / bg.height);

        // Change the origin to top left corner
        bg.setOrigin(0,0);
    }

    createPlatforms() {

        this.platforms = this.physics.add.staticGroup();        

        this.createSinglePlatform(30, 0, 360);
        this.createSinglePlatform(6, 100, level1Height);
        this.createSinglePlatform(1, 275, level1Height);
        this.createSinglePlatform(2, 350, level1Height);
        this.createSinglePlatform(4, 50, level3Height);
        this.createSinglePlatform(2, 200, level3Height);
        this.createSinglePlatform(4, 325, level3Height);

        this.physics.add.collider(player, this.platforms);
        
        this.createMovingPlatform();
    }

    createSinglePlatform(numberOfTiles, startX, y) {

        // Loop to create a platform with multiple tiles
        for (let i = 0; i < numberOfTiles; i++) {
            const platformTile = this.platforms.create(startX + i * tileWidth, y, 'platform');
            
            // For setSize():
            // First param sets the width of the collision box
            // Second param sets height of the collision box
            // Third param sets the horizontal position of the collision box
            // Fourth param sets the vertical position of the collision box
            platformTile.setSize(4, -42, 0, -100);
        }

        
    }
    
    createMovingPlatform(){
        movingPlatform = this.physics.add.group();
        const numTiles = 8;
        var startX = 510;
        for (let i = 0; i < numTiles; i++) {
            const tile = movingPlatform.create(startX + i * tileWidth, 359, 'platform');
            // Set up physics for each tile
            tile.setImmovable(true);
            tile.body.setAllowGravity(false);
        }
        this.physics.add.collider(player, movingPlatform);
        this.physics.add.collider(dragonSprite, movingPlatform);
    }

    createPlayerSprite() {
        
        // Player animations
        const playerAnimKeys = ['idle', 'run', 'jump', 'die', 'attack'];
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 15}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 16, end: 23}),
            frameRate: 16,
            repeat: -1
        });
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 27}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('player', { start: 28, end: 43}),
            frameRate: 13,
            repeat: -1
        });

        // Create player sprite
        player = this.physics.add.sprite(50,280,'player');
        player.setScale(0.8, 0.8);
        player.setCollideWorldBounds(true);
        player.setSize(player.width / 3, 0, player.width / 6, 0);
        facingLeft = false;

        // Set drag for the player
        player.setDamping(true);
        player.setDrag(0.99);
        
        // Add health bar
        var isPlayer = true;
        playerHealthBar = new HealthBar(this, isPlayer, player.x, player.y);
    }

    createDragonSprite() {
        // Create dragon animations
        this.anims.create({
            key: 'dragonAttack',
            frames: this.anims.generateFrameNames('dragonAttack', {
                start: 1,
                end: 201,
                zeroPad: 3,
                suffix: '.png'
            }),
            frameRate: 60,
            repeat: -1
        });

        // Add dragon sprite
        const dragonExtendedCollisionHeight = 58;
        dragonSprite = this.physics.add.sprite(600, 200, 'dragonAttack');
        dragonSprite.setSize(dragonSprite.width / 3, dragonSprite.height / 2, dragonSprite.width / 6, -dragonExtendedCollisionHeight);
        dragonSpriteArray.push(dragonSprite);
        // For setSize():
            // First param sets the width of the collision box
            // Second param sets height of the collision box
            // Third param sets the horizontal position of the collision box
            // Fourth param sets the vertical position of the collision box
        dragonSprite.setScale(0.5, 0.5);
        dragonSprite.setCollideWorldBounds(true);
        dragonSprite.play('dragonAttack', true);

        // Add health bar
        var isPlayer = false;
        dragonHealthBar = new HealthBar(this, isPlayer, dragonSprite.x, dragonSprite.y);
    }
    
    enableDragonSpitFire() {
        this.redProjectilesGroup = this.physics.add.group();
        
        this.anims.create({
            key: 'redProjectile',
            frames: this.anims.generateFrameNumbers('redProjectile'),
            frameRate: 16,
            repeat: -1
        });
        
        // Trigger dragon spitting fire
        dragonSprite.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, sprite, frameKey) {
            if (frameKey === '129.png') {
                var dragonLeftX = (dragonSprite.x - dragonSprite.displayWidth * dragonSprite.originX);
                const redProjectile = this.redProjectilesGroup.create(dragonLeftX + 68, dragonSprite.y + 30, 'redProjectile');
                redProjectile.setScale(.1, .1);
                redProjectile.anims.play('redProjectile', true);
                redProjectile.setVelocityX(-projectileVelocity);
                redProjectile.body.setAllowGravity(false);
            }
        }, this);

        // Create player + dragon collision
        this.physics.add.collider(player, this.redProjectilesGroup, this.handlePlayerRedProjectileCollision, null, this);
    }

    handlePlayerRedProjectileCollision(player, redProjectile) {
        // Remove the red projectile
        redProjectile.destroy();
    
        // Decrease player's health
        playerHealth -= 1; // Adjust the health decrease value as needed
        //playerHealthDisplay.setText(`Player Health: ${playerHealth}`);
        playerHealthBar.decrease(1);

        // Check if the player's health is zero and handle it accordingly
        if (playerHealth <= 0) {
            player.setFlipX(facingLeft);
            player.anims.play('die', true);
            // TODO: Handle game over or any other logic you want
        }
    }

    playerDragonCollision() {
        // Create player + dragon collision
        this.physics.add.collider(player, dragonSprite, function () {
            console.log('player/dragon collide');
            player.setVelocityX(0);
            playerHealth -= 1;
            // playerHealthDisplay.setText(`Player Health: ${playerHealth}`);
            playerHealthBar.decrease(1);
        });
    }

    createQuestionPopup() {

        this.scene.pause('TESTING_MODE');
        this.scene.launch('TEST_MODE_QUESTION');

        // the below low block fires one more time than the previous call
        this.events.on('resume', function(scene, data) {

            console.log("scene info ******");
            console.log(game.scene.keys);

            console.log('Resumed TESTING_MODE scene with data:', data);
            if (data.isCorrect){
                // dragonHealthDisplay.setText(`Dragon Health: ${dragonHealth}`);
                if (dragonHealth <= 0) {
                    // TODO: Player Wins (might not need this)
                    // this.scene.remove('TEST_MODE_QUESTION');
                }
            } if ((questionCounter) === questions.length) {  // +1 because of index offset by 1
                // logic for if the player answers enough questions incorrectly w/o dying
                console.log("*** shuffled questions ***");
                console.log(`questionCounter = ${questionCounter}`);
                console.log(`originalQuestionsLength = ${originalQuestionsLength}`)
                let i = 0;
                while (i < questions.length) {
                    if (questions[i][2] === true) {  // if it's true, remove it
                        questions = questions.slice(0, i).concat(questions.slice(i + 1));
                    } else {
                        i++;
                    }
                }
                questionCounter = 0;
                // shuffle questions here
                questions = shuffle(questions);
                console.log(`missed questions -> ${questions}`);
            } else {
                console.log('Incorrect answer!');
            }
        });
    }

    enableFullscreen() {
        const fullScreenButton = this.add.image(this.sys.game.config.width- 16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
        fullScreenButton.setDepth(2);
        fullScreenButton.setScale(0.4, 0.4);
        fullScreenButton.on('pointerup', function() {
            if(this.scale.isFullscreen) {
                fullScreenButton.setFrame(0);
                this.scale.stopFullscreen();
            } else {
                fullScreenButton.setFrame(1);
                this.scale.startFullscreen();
            }
        }, this);
        const FKey = this.input.keyboard.addKey('F');
        FKey.on('down', function() {
            if(this.scale.isFullscreen) {
                fullScreenButton.setFrame(0);
                this.scale.stopFullscreen();
            } else {
                fullScreenButton.setFrame(1);
                this.scale.startFullscreen();
            }
        }, this);
    }
    
    enablePlayerShootSpell() {
        this.blueProjectilesGroup = this.physics.add.group();
        
        this.anims.create({
            key: 'blueProjectile',
            frames: this.anims.generateFrameNumbers('blueProjectile'),
            frameRate: 16,
            repeat: -1
        });
        
        player.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, sprite, frameKey) {
            
            if (player.anims.getName() === 'attack') {
                const attackAnimation = this.anims.get('attack');
                if (frame.index === 14) {
                    const blueProjectile = this.blueProjectilesGroup.create(player.x + 25, player.y + 15, 'blueProjectile');
                blueProjectile.setScale(.1, .1);
                blueProjectile.setFlipX(true);
                blueProjectile.anims.play('blueProjectile', true);
                blueProjectile.setVelocityX(projectileVelocity);
                blueProjectile.body.setAllowGravity(false);
                }
            }
        }, this);

        // Create player + dragon collision
        this.physics.add.collider(dragonSprite, this.blueProjectilesGroup, this.handleDragonSpellCollision, null, this);
    }

    handleDragonSpellCollision(dragon, blueProjectile) {
        // Remove the blue projectile
        blueProjectile.destroy();
    
        //Activate question popup & processes
        this.createQuestionPopup();
    }

    update() {

        // Check if player won/lost
        if (playerHealth <= 0) {
            this.scene.pause('TESTING_MODE');
            this.scene.start('GAME_OVER', {isWin: false, playerHealth: playerHealth});
        } else if (dragonHealth <= 0) {
            this.scene.pause('TESTING_MODE');
            this.scene.start('GAME_OVER', {isWin: true, playerHealth: playerHealth});
        }

        // Player movement
        if (cursors.space.isDown) { //Attack
            console.log('spacebar');
            player.setVelocityX(0);
            player.setFlipX(false);
            player.anims.play('attack', true);
        }  else if (player.body.blocked.down && cursors.up.isDown) { //Jump
            player.setVelocityY(jumpVelocity);
            player.setFlipX(facingLeft);
            player.anims.play('jump', true);
        } else if (!player.body.blocked.down && cursors.left.isDown) { // Switch to left midair
            player.setVelocityX(-lrVelocity);
            facingLeft = true;
            player.setFlipX(facingLeft);
        } else if (!player.body.blocked.down && cursors.right.isDown) { // Switch to right midair
            player.setVelocityX(lrVelocity);
            facingLeft = false;
            player.setFlipX(facingLeft);
        } else if (player.body.blocked.down && cursors.right.isDown) { // Run right
            player.setVelocityX(lrVelocity);
            facingLeft = false;
            player.setFlipX(facingLeft);
            player.anims.play('run', true);
        } else if (player.body.blocked.down && cursors.left.isDown) { // Run left
            player.setVelocityX(-lrVelocity);
            facingLeft = true;
            player.setFlipX(facingLeft);
            player.anims.play('run', true);
        } else if (cursors.up.isUp && cursors.right.isUp && cursors.left.isUp && cursors.space.isUp && player.body.blocked.down) { // Idle
            player.setVelocityX(0);
            player.setFlipX(facingLeft);
            player.anims.play('idle', true);
        }
      
        // Update health bar positions
        playerHealthBar.updatePosition(player.x, player.y);
        dragonHealthBar.updatePosition(dragonSprite.x, dragonSprite.y);

        // Create fire projectiles
        if(this.shootRedProjectilesFlag) {
            this.shootRedProjectiles();
            this.shootRedProjectilesFlag = false;
        }
        

        // Move dragon's platform
        const platformY = movingPlatform.children.entries[0].y;
        if (platformGoingUp && platformY < level3Height) {
            platformGoingUp = false;
            movingPlatform.setVelocityY(platformYVelocity);
        } else if (!platformGoingUp && platformY > 360) {
            platformGoingUp = true;
            movingPlatform.setVelocityY(-platformYVelocity);
        } else if (platformGoingUp) {
            movingPlatform.setVelocityY(-platformYVelocity);
        } else {
            movingPlatform.setVelocityY(platformYVelocity);
        }
    }
}

class TestingModeQuestionScene extends Phaser.Scene {
    
    constructor(){
        super({
            key: 'TEST_MODE_QUESTION'
        });
    }

    init() {
        // Add stylesheet for font
        const cssElement = document.createElement('style');
        document.head.appendChild(cssElement);
        const sheet = cssElement.sheet;
        let styles = '@font-face { font-family: "Macondo"; src: url("static/assets/Macondo-Regular.ttf") format("truetype"); }\n';
        sheet.insertRule(styles, 0);
    }

    preload(){
        // Load background
        this.load.image('scrollBackground', 'static/assets/background/scroll background.png');

        // Load buttons
        this.load.image('submitButton', 'static/assets/buttons/submitButton.png');
        this.load.image('okayButton', 'static/assets/buttons/okayButton.png');
    
        // Load font
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create(){

        //Add background
        const scrollBackground = this.add.sprite(0,0, 'scrollBackground');
        scrollBackground.setOrigin(0,0);
        scrollBackground.setScale(this.game.config.width / scrollBackground.width, this.game.config.height / scrollBackground.height);

        this.currentState = 'playerInput'; //Initial state

        // Add font family
        const self = this; // Stores a reference to 'this' to use in the active function
        let playerPrompt, questionText; // Declare variables outside the active function

        WebFont.load({
            custom: {
                families: [ 'Macondo' ]
            },
            active: function ()
            {
                // Add prompt
                playerPrompt = self.add.text(300, 500, 'Please answer the following question:', {
                    fontFamily: 'Macondo',
                    color: 'black',
                    fontSize: '24px'
                });
                playerPrompt.setOrigin(0.5, 0.5);//Sets origin to center of the text
                playerPrompt.setX(self.sys.game.config.width / 2);
                playerPrompt.setY(self.sys.game.config.height / 4);

                // Add question (flashcard side 1)
                questionText = self.add.text(100, 100, questions[questionCounter][1], {
                    fontFamily: 'Macondo',
                    color: 'black',
                    fontSize: '24px'
                });
                questionText.setOrigin(0.5, 0.5);//Sets origin to center of the text
                questionText.setX(self.sys.game.config.width / 2);
                questionText.setY(self.sys.game.config.height / 2.5);
            }
        });

        // Add input box
        this.setUpInputBox();
 
        //Add a submit button
        const submitButton = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height * .72, 'submitButton').setInteractive();
        submitButton.setOrigin(0.5, 0.5);
        submitButton.setScale(0.5, 0.5);

        //When player clicks submit button
        submitButton.on('pointerdown', () => {
            const playerAnswer = playerInput.value;
            const correctAnswer = questions[questionCounter][0];
            let isCorrect = playerAnswer === correctAnswer;

            //Reset screen
            playerInput.value = "";
            playerInput.remove();
            questionText.destroy();
            playerPrompt.destroy();
            submitButton.destroy();

            //Show the right/wrong answer
            if (playerAnswer === correctAnswer){
                // decrease dragon's health
                dragonHealth -= 1;
                this.showCorrectResult();
                questions[questionCounter][2] = true;  // mark as correctly answered
            } else {
                this.showIncorrectResult(playerAnswer, correctAnswer);
            }
            questionCounter++;
            console.log(`questionCounter = ${questionCounter}`);

            const popupResult = {playerAnswer, correctAnswer, isCorrect};

            //Pass the result to TestingModeScene
            this.events.emit('answerSubmitted', popupResult);

            //Display OK button
            const okButton = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height * .71, 'okayButton').setInteractive();
            okButton.setOrigin(0.5, 0.5);
            okButton.setScale(0.5, 0.5);

            //After OK button is pressed
            okButton.on('pointerdown', () => {
                this.currentState = 'playerInput';
                this.scene.resume('TESTING_MODE', popupResult);
                this.scene.stop('TEST_MODE_QUESTION');
                // this.scene.remove('TEST_MODE_QUESTION');
            });
        });
    }

    setUpInputBox() {
        //Add a textbox
        
        playerInput.type = 'text';
        playerInput.style.width = '200px';
        playerInput.style.height = '30px';
        playerInput.style.fontSize = '18px';
        
        // Dynamically position the text input box
        const inputX = window.innerWidth / 2 - 110; // Center horizontally
        const inputY = window.innerHeight / 2; // Center vertically
        playerInput.style.position = 'absolute';
        playerInput.style.left = `${inputX}px`;
        playerInput.style.top = `${inputY}px`;

        //playerInput.style.display = 'flex';
        playerInput.style.justifyContent = 'center';
        const wrapperDiv = document.createElement('div');
        wrapperDiv.id = 'outer';
        wrapperDiv.appendChild(playerInput);
        this.game.canvas.parentElement.appendChild(wrapperDiv);
        
        
        // Listen for window resize event
        window.addEventListener('resize', () => {
            const inputX = window.innerWidth / 2 - 110; // Center horizontally
            const inputY = window.innerHeight / 2; // Center vertically
            playerInput.style.left = `${inputX}px`;
            playerInput.style.top = `${inputY}px`;
        });
    }

    showCorrectResult() {
        //Display "Correct!"
        const resultText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2.4, 'Correct!', {
            fontFamily: 'Macondo',
            color: 'black',
            fontSize: '50px'
        });
        resultText.setOrigin(0.5, 0.5);

        dragonHealthBar.decrease(1);
    }

    showIncorrectResult(userAnswer, correctAnswer) {
        //Display "Incorrect!" with user's answer and correct answer.
        const incorrect = this.add.text(300, 150, 'Incorrect!', {
            fontFamily: 'Macondo',
            color: 'black',
            fontSize: '45px'
        });
        incorrect.setOrigin(0.5, 0.5);
        incorrect.setX(this.sys.game.config.width / 2);
        incorrect.setY(this.sys.game.config.height / 3);

        const resultText = this.add.text(300, 150, `You answered ${userAnswer} but the correct answer is ${correctAnswer}`, {
            fontFamily: 'Macondo',
            color: 'black',
            fontSize: '20px'
        });
        resultText.setOrigin(0.5, 0.5);
        resultText.setX(this.sys.game.config.width / 2);
        resultText.setY(this.sys.game.config.height / 2);
    }
}

class GameOverScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'GAME_OVER'
        });
    }

    init(data) {

        // Add stylesheet for font
        const cssElement = document.createElement('style');
        document.head.appendChild(cssElement);
        const sheet = cssElement.sheet;
        let styles = '@font-face { font-family: "Macondo"; src: url("static/assets/Macondo-Regular.ttf") format("truetype"); }\n';
        sheet.insertRule(styles, 0);

        //Retreive data passed from TestingModeScene
        this.isWin = data.isWin;
        this.playerHealth = data.playerHealth;
    }

    preload(){
        //load background
        this.load.image('scrollBackground', 'static/assets/background/scroll background.png');

        // Load buttons
        this.load.image('homeButton', 'static/assets/buttons/homeButton.png');
    
        // Load font
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create (){
        
        //Add background
        const scrollBackground = this.add.sprite(0,0, 'scrollBackground');
        scrollBackground.setOrigin(0,0);
        scrollBackground.setScale(this.game.config.width / scrollBackground.width, this.game.config.height / scrollBackground.height);

        // sending playerHealth value as point value being added to the player's account
        let update_points = async function(earned_points) {
            let target_url = document.URL.slice(0, document.URL.lastIndexOf("/") + 1).concat("update_points");
            let data = {"earned_points": earned_points};
            let request = new Request(target_url, {method: "POST", body: JSON.stringify(data)});
            await fetch(request);
        }
        // only update player's points in backend if it's a win
        if (this.isWin) {
            update_points(Math.floor(playerHealth) * 10);  // Math.floor() in case it's not a whole number amount
        }

        // Display win/lose messages
        const self = this; // Stores a reference to 'this' to use in the active function
        WebFont.load({
            custom: {
                families: [ 'Macondo' ]
            }, active: function () {
                if (self.isWin) { // Player won
                    
                    const winMessageText = self.add.text(self.sys.game.config.width / 2, self.sys.game.config.height / 3, 'You Win!', {
                        fontFamily: 'Macondo',
                        color: 'black',
                        fontSize: '45px'
                    });
                    winMessageText.setOrigin(0.5, 0.5);
                    
                    // Display points earned
                    const playerPointsText = self.add.text(self.sys.game.config.width / 2, self.sys.game.config.height / 2, `Points Earned: ${Math.floor(playerHealth) * 10}`, {
                        fontFamily: 'Macondo',    
                        color: 'black',
                        fontSize: '25px'
                    });
                    playerPointsText.setOrigin(0.5, 0.5);

                } else { // Player lost
                    const loseMessageText = self.add.text(self.sys.game.config.width / 2, self.sys.game.config.height / 3, 'You Lost', {
                        fontFamily: 'Macondo',
                        color: 'black',
                        fontSize: '45px'
                    });
                    loseMessageText.setOrigin(0.5, 0.5);
                    
                    const loseMessageDescriptionText = self.add.text(self.sys.game.config.width / 2, self.sys.game.config.height / 2, 'Don\'t give up! Try again!', {
                        fontFamily: 'Macondo',    
                        color: 'black',
                        fontSize: '25px'
                    });
                    loseMessageDescriptionText.setOrigin(0.5, 0.5);
                }
            }
        });

        //this.isWin ? this.displayWinMessages() : this.displayLoseMessages();

        //Add a home button
        const homeButton = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height * .71, 'homeButton').setInteractive();
        homeButton.href = document.URL.slice(0, document.URL.lastIndexOf("/") + 1).concat("dashboard");
        homeButton.setOrigin(0.5, 0.5);
        homeButton.setScale(0.5, 0.5);
        //When player clicks back to home button
        homeButton.on('pointerdown', () => {
            //TODO: Go back to home, adding playerHealth to the player's points in the db
            window.location = document.URL.slice(0, document.URL.lastIndexOf("/") + 1).concat("dashboard");
        });
        
        
    }

    displayWinMessages () {
        const winMessageText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 3, 'You Win!', {
            fontFamily: 'Macondo',
            color: 'black',
            fontSize: '40px'
        });
        winMessageText.setOrigin(0.5, 0.5);
        
        // Display points earned
		const playerPointsText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, `Points Earned: ${playerHealth}`, {
            fontFamily: 'Macondo',    
            color: 'black',
            fontSize: '20px'
        });
    }

    displayLoseMessages () {
        const loseMessageText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 3, 'You Lost', {
            fontFamily: 'Macondo',
            color: 'black',
            fontSize: '40px'
        });
        loseMessageText.setOrigin(0.5, 0.5);
        
        // Display points earned
		const loseMessageDescriptionText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Don\'t give up! Try again!', {
            fontFamily: 'Macondo',    
            color: 'black',
            fontSize: '20px'
        });
        loseMessageDescriptionText.setOrigin(0.5, 0.5);
    }
}

class DirectionsScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'DIRECTIONS'
        });
    }

    init() {
        // Add stylesheet for font
        const cssElement = document.createElement('style');
        document.head.appendChild(cssElement);
        const sheet = cssElement.sheet;
        let styles = '@font-face { font-family: "Macondo"; src: url("static/assets/Macondo-Regular.ttf") format("truetype"); }\n';
        sheet.insertRule(styles, 0);
    }

    preload(){
        // Load background
        this.load.image('scrollBackground', 'static/assets/background/scroll background.png');

        // Load buttons
        this.load.image('okayButton', 'static/assets/buttons/okayButton.png');
    
        // Load font
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        // Load fullscreen icon
        this.load.spritesheet('fullscreen', 'static/assets/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
    }

    create (){

        //Add background
        const scrollBackground = this.add.sprite(0,0, 'scrollBackground');
        scrollBackground.setOrigin(0,0);
        scrollBackground.setScale(this.game.config.width / scrollBackground.width, this.game.config.height / scrollBackground.height);

        
        // Display win/lose messages
        const self = this; // Stores a reference to 'this' to use in the active function
        WebFont.load({
            custom: {
                families: [ 'Macondo' ]
            }, active: function () {

                const directionsHeading = self.add.text(self.sys.game.config.width / 2, self.sys.game.config.height / 4, 'Welcome to Testing Mode!', {
                    fontFamily: 'Macondo',
                    color: 'black',
                    fontSize: '40px'
                });
                directionsHeading.setOrigin(0.5, 0.5);

                const actualDirections = 'The object of this game is to defeat the dragon. ' + 
                'Use the arrow keys to move and hold the spacebar to cast a spell. ' +
                'If your spell hits the dragon, you\'ll be asked a study question. Get it right and the dragon\'s health will go down. ' +
                'But be sure to dodge the dragon\'s fire!\n\n' +
                'Now gather your courage, wit, and perseverence for the battle to come. ' +
                'Good luck!';
                
                const directionsBody = self.add.text(self.sys.game.config.width / 2, self.sys.game.config.height / 2 + 5, actualDirections, {
                    fontFamily: 'Macondo',
                    color: 'black',
                    fontSize: '15px',
                });
                directionsBody.setWordWrapWidth(500, true); // Adjust based on canvas width
                directionsBody.setOrigin(0.5, 0.5);
            }
        });

        //Add okay button
        const okayButton = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height * .78, 'okayButton').setInteractive();
        okayButton.setOrigin(0.5, 0.5);
        okayButton.setScale(0.4, 0.4);

        // When player clicks OK, start TestingModeScene
        okayButton.on('pointerdown', () => {
            this.scene.resume('TESTING_MODE');
            this.scene.remove('DIRECTIONS');
            
        });
    }
}

class HealthBar {
    constructor(scene, isPlayer, xPosition, yPosition) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.isPlayer = isPlayer;

        // // Sets initial health value
        // isPlayer ? this.value = 50 : this.value = 50;
        if (isPlayer) {
            this.value = playerHealth;
            this.originalHealthValue = playerHealth;
            this.x = xPosition - 30;
            this.y = yPosition;
        } else {
            this.value = dragonHealth;
            this.originalHealthValue = dragonHealth;
            this.x = xPosition - 90;
            this.y = yPosition;
        }
        // TODO: adjust value based on number of questions
        
        this.draw();

        scene.add.existing(this.bar);
    }

    draw() {
        
        this.bar.clear();

        //  Border
        this.bar.fillStyle(0x000000);
        var width;
        var height;
        if (this.isPlayer) { // Adjust size of bar for player vs dragon
            width = 60;
            height = 10;
        } else {
            width = 120;
            height = 10;
        }
        this.bar.fillRect(this.x, this.y, width, height);


        //  Red section
        this.bar.fillStyle(0xff0000);
        this.bar.fillRect(this.x + 2, this.y + 2, width - 4, height - 4);

        // Green section
        this.bar.fillStyle(0x00ff00);
        var filledWidth = Math.floor((this.value / this.originalHealthValue) * width - 4);
        this.bar.fillRect(this.x + 2, this.y + 2, filledWidth, height - 4);

    }

    decrease(amount) {

        this.value -= amount;

        if (this.value < 0) {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    updatePosition(x, y) {

        if (this.isPlayer) {
            this.x = x - 30;
            this.y = y - 15;
        } else {
            this.x = x - 70;
            this.y = y - 90;
        }

        this.draw();
    }
}

let config = {
    type: Phaser.AUTO,//Phaser will render using WebGL if possible, Canvas API if not
    width: 640,
    height: 360,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1900 }
        }
    },
    scene: [ // List of scenes
        TestingModeScene,
        TestingModeQuestionScene,
        GameOverScene,
        DirectionsScene
    ],

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

//create a new game, pass the configuration
let game = new Phaser.Game(config);

function shuffle(array) {
    /**
     *  Shuffle method for flashcards: written by Mike Miller for Study Mode, slight modification to return
     *  the array for purposes in TestingModeScene.js
     */
   let m = array.length, t, i;
   while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
   }
   return array;
}
