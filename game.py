from FlashcardSet import FlashcardSet
from Flashcard import Flashcard
import random

class Game:
    playerResponses: list
    chosenSet: list

    def __init__(self, chosenSet, playerResponses=None):
        #add chosen flashcard set when implemented
        self.chosenSet = chosenSet
        if playerResponses is None:
            playerResponses = []
        self.playerResponses = playerResponses

    def chooseNextQuestion(self):
        return random.randint(0, len(self.chosenSet))

listOfCards1 = [Flashcard("gustar", "to like", ), Flashcard("hablar", "to talk"), Flashcard("bailar", "to dance")]
listOfCards2 = [Flashcard("5x6", "30"), Flashcard("4x7", "28"), Flashcard("8x10", "80")]


SAMPLE_GAMES = [
    Game(listOfCards1),
    Game(listOfCards2, [["Question 1", "Correct"], ["Question 2", "Incorrect"], ["Question 3", "Correct"]])
]

print(SAMPLE_GAMES)