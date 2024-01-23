from game import Game
from Flashcard import Flashcard
from FlashcardSet import FlashcardSet

#Ended up redundant/unnecessary
class StudyGame(Game):
    """
    Game class for study mode
    """

    numQuestions: int   # Variable to track number of questions used in the game

    def __init__(self, numQuestions, chosenSet, playerResponses=None):
        """
        Initializes StudyGame object on startup

        :param numQuestions: number of questions in the session
        :param chosenSet: FlashcardSet player chooses to play game
        :param playerResponses: list containing player's responses - default value is None
        """
        super().__init__(playerResponses, chosenSet)
        self.numQuestions = numQuestions

    def displayQuestion(self):
        """
        Displays the next question for the game
        """
        index = self.chosenSet[self.chooseNextQuestion()]