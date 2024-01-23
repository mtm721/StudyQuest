/**
 * Defines a Study mode object, and it's display elements.
 *
 * @constructs  Study
 * @augments    Phaser.Scene
 */
class Study extends Phaser.Scene
{

    /**
    * Constructs a Study mode game object and screen.
    *
    * @class    Study
    * @augments Phaser.Scene
    */
   constructor(){
        super({
            key:'STUDY_MODE'
        })
    }

    /**
     * Initializes a Study object.
     */
    init(){
        this.questionArray = [];
        for (let i = 0; i < questionData.length; i++) {
            this.questionArray.push([questionData[i]['term'], questionData[i]['definition']]);
        }
        this.gameLength = this.questionArray.length;
        this.usedQuestions = [];
    }

    /**
     * Loads background images and sprites used for the mode.
     */
    preload() {
               //load background
        this.load.image('background', 'static/assets/background/scroll background.png');
    }

    /**
     * Creates and navigates game window and the elements of the window.
     *
     * @see Phaser.Scene
     * @see shuffle
     * @see getRandomIndex
     * @see correctAnswer
     */
    create() {

        let bg = this.add.sprite(0,0, 'background');

        // resize for canvas
        bg.setScale(this.sys.game.config.width / bg.width, this.sys.game.config.height / bg.height);

        //change the origin to top left corner
        bg.setOrigin(0,0);

        if (this.usedQuestions.length < this.gameLength) {      // Check if there are elements in the questions list that haven't been used yet.

            this.shuffle(this.questionArray)
            while (this.usedQuestions.includes(this.questionArray[0][0])){      // Randomize order of array for random question and answers
                this.shuffle(this.questionArray);
            }
            let randIndex1 = this.getRandomIndex(3);
            let randIndex2 = this.getRandomIndex(3);
            while (randIndex2 === randIndex1) {
                randIndex2 = this.getRandomIndex(3);                     // Decides which order answers will show on buttons
            }
            let randIndex3 = this.getRandomIndex(3);
            while (randIndex3 === randIndex2 || randIndex3 === randIndex1) {
                randIndex3 = this.getRandomIndex(3);
            }

            const q_prompt = this.add.text(300, 500, 'Please choose the correct definition for the following term:', {
                color: 'black',
                fontSize: '20px'
            });

            q_prompt.setOrigin(0.5, 0.5);
            q_prompt.setX(this.game.config.width / 2);
            q_prompt.setY(this.game.config.height / 4);

            const question = this.add.text(650, 200,
                this.questionArray[0][0],               // First element in array is the question
                {fontSize: 32, color: "Black"}).setPadding(32).setOrigin(0.5);

            question.setOrigin(0.5, 0.5);//Sets origin to center of the text
            question.setX(this.sys.game.config.width / 2);
            question.setY(this.sys.game.config.height / 2.5);


            const button1 = this.add.text(300, 400,
                this.questionArray[randIndex1][1], {
                    fontSize: '32px',
                    color: 'black',
                    align: 'center',
                    verticalAlign: 'center',
                    fixedWidth: 300
                }).setPadding(32).setOrigin(0.5);

            button1.setInteractive();

            button1.setOrigin(0.5,0.5);
            button1.setX(this.sys.game.config.width / 4);
            button1.setY(this.sys.game.config.height / 1.5);

            button1.on('pointerover', () => {
                button1.setColor('teal');
            })

            button1.on('pointerout', () => {
                button1.setColor('black');
            })

            button1.on('pointerdown', () => {
                q_prompt.destroy()
                question.destroy();
                button1.destroy();
                button2.destroy();
                button3.destroy();
                this.correctAnswer(this.questionArray[randIndex1][1],
                    this.questionArray[0][1]);
                this.usedQuestions.push(this.questionArray[0][0]);
            })

            const button2 = this.add.text(650, 400,
                this.questionArray[randIndex2][1], {
                    fontSize: '32px',
                    color: 'black',
                    align: 'center',
                    verticalAlign: 'center',
                    fixedWidth: 300
                }).setPadding(32).setOrigin(0.5);

            button2.setInteractive();

            button2.setOrigin(0.5,0.5);
            button2.setX(this.sys.game.config.width / 2);
            button2.setY(this.sys.game.config.height / 1.5);

            button2.on('pointerover', () => {
                button2.setColor('teal');
            })

            button2.on('pointerout', () => {
                button2.setColor('black');
            })

            button2.on('pointerdown', () => {
                q_prompt.destroy()
                question.destroy();
                button1.destroy();
                button2.destroy();
                button3.destroy();
                this.correctAnswer(this.questionArray[randIndex2][1],
                    this.questionArray[0][1]);
                this.usedQuestions.push(this.questionArray[0][0]);
            })

            const button3 = this.add.text(1000, 400,
                this.questionArray[randIndex3][1], {
                    fontSize: '32px',
                    color: 'black',
                    align: 'center',
                    verticalAlign: 'center',
                    fixedWidth: 300
                }).setPadding(32).setOrigin(0.5);

            button3.setInteractive();

            button3.setOrigin(0.5,0.5);
            button3.setX(this.sys.game.config.width / 1.33);
            button3.setY(this.sys.game.config.height / 1.5);

            button3.on('pointerover', () => {
                button3.setColor('teal');
            })

            button3.on('pointerout', () => {
                button3.setColor('black');
            })

            button3.on('pointerdown', () => {
                q_prompt.destroy()
                question.destroy();
                button1.destroy();
                button2.destroy();
                button3.destroy();
                this.correctAnswer(this.questionArray[randIndex3][1],
                    this.questionArray[0][1]);
                this.usedQuestions.push(this.questionArray[0][0]);
            })
        } else {
            const prompt = this.add.text(650, 200,
                'The game has ended \n\nWould you like to play again with the same set?',                       // If all elements of question list are used, end game
                {fontSize: 32, color: "Black", align:'center'}).setPadding(32).setOrigin(0.5, 0.5);

            prompt.setX(this.sys.game.config.width / 2);
            prompt.setY(this.sys.game.config.height / 2);

            const playAgain = this.add.text(300, 400,
                'PLAY AGAIN', {
                    fontSize: '32px',
                    color: 'black',
                    align: 'center',
                    verticalAlign: 'center',
                    fixedWidth: 300
                }).setPadding(32).setOrigin(0.5,0.5);

            playAgain.setInteractive();

            playAgain.setX(this.sys.game.config.width / 3);
            playAgain.setY(this.sys.game.config.height / 1.5);

            playAgain.on('pointerover', () => {
                playAgain.setColor('teal');
            })

            playAgain.on('pointerout', () => {
                playAgain.setColor('black');
            })

            playAgain.on('pointerdown', () => {
                this.usedQuestions = [];
                this.create()
            })

            const returnButton = this.add.text(1000, 400,
                'DASHBOARD', {
                    fontSize: '32px',
                    color: 'black',
                    align: 'center',
                    verticalAlign: 'center',
                    fixedWidth: 300
                }).setPadding(32).setOrigin(0.5);

            returnButton.setInteractive();

            returnButton.setX(this.sys.game.config.width / 1.5);
            returnButton.setY(this.sys.game.config.height / 1.5);

            returnButton.on('pointerover', () => {
                returnButton.setColor('teal');
            })

            returnButton.on('pointerout', () => {
                returnButton.setColor('black');
            })

            returnButton.on('pointerdown', () => {                  // Return to dashboard on button click
                window.location.href = document.URL.slice(0, document.URL.lastIndexOf("/") + 1).concat("dashboard");
            })
        }
    }

    /**
     * Displays feedback for a correct user answer.
     */
    showCorrectResult() {
        const resultText = this.add.text(300, 150, 'Correct!', {
            color: 'black',
            fontSize: '40px'
        });

        resultText.setOrigin(0.5, 0.5);
        resultText.setX(this.sys.game.config.width / 2);
        resultText.setY(this.sys.game.config.height / 2);
    }

    /**
     * Displays feedback for an incorrect user answer.
     *
     * @param {string}  userAnswer      User's chosen answer.
     * @param {string}  correctAnswer   Correct answer to display.
     */
    showIncorrectResult(userAnswer, correctAnswer) {
        const incorrect = this.add.text(300, 150, 'Incorrect!', {
            color: 'red',
            fontSize: '35px'
        });

        incorrect.setOrigin(0.5, 0.5);
        incorrect.setX(this.sys.game.config.width / 2);
        incorrect.setY(this.sys.game.config.height / 3);

        const resultText = this.add.text(300, 150, `You answered ${userAnswer} but the correct answer is ${correctAnswer}`, {
            color: 'black',
            fontSize: '20px'
        });

        resultText.setOrigin(0.5, 0.5);
        resultText.setX(this.sys.game.config.width / 2);
        resultText.setY(this.sys.game.config.height / 2);
    }

    /**
     * Determines if a user's answer is correct and calls the correct function to display feedback.
     *
     * @see     showCorrectResult
     * @see     showIncorrectResult
     *
     * @param   {string}  chosenAnswer    User's chosen answer.
     * @param   {string}  correctAnswer   Correct answer for comparison.
     */
    correctAnswer(chosenAnswer, correctAnswer) {
        if (chosenAnswer === correctAnswer) {
            this.showCorrectResult();
        } else {
            this.showIncorrectResult(chosenAnswer, correctAnswer);
        }

        const okButton = this.add.text(300, 250, 'Ok', {
            fontSize: '32px',
            color: 'black',
            align: 'center',
            verticalAlign: 'center',
            fixedWidth: 300
            }).setPadding(32);

        okButton.setInteractive();
        okButton.setOrigin(0.5, 0.5);
        okButton.setX(this.sys.game.config.width / 2);
        okButton.setY(this.sys.game.config.height * .7);        // Move on to next question when OK button is clicked.

        okButton.on('pointerover', () => {
            okButton.setColor('teal');
        })

        okButton.on('pointerout', () => {
            okButton.setColor('black');
        })

        okButton.on('pointerdown', () => {
            this.create()
        });
}

    /**
     * Randomly shuffles an array.
     *
     * @see     Math
     *
     * @param   {array}   array   Array of questions for the game.
     *
     * @yield   {array}   array   Edited array in new, shuffled order.
     */
    shuffle(array) {
       let m = array.length, t, i;
       while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
       }
    }

    /**
     * Returns a random integer used to choose answers to display.
     *
     * @see     Math
     *
     * @param   {number}    max                             Maximum value of index needed, not included in randomized order.
     *
     * @return  {number}    Math.floor(Math.random()*max)   Random integer between 0 and max, not including max.
     */

    getRandomIndex(max){
        return Math.floor(Math.random()*max);
    }
}

const config = {
    type: Phaser.AUTO,
    width: screen.width,
    height: screen.height,
    // Sets game scaling
    /*scale: {
        // Fill entire window
        mode: Phaser.Scale.ScaleModes.RESIZE,
        // Center vertically and horizontally
        autoCenter: Phaser.Scale.CENTER_BOTH
        },*/
    parent: 'phaser-game',
    scene: Study
};

const game = new Phaser.Game(config);