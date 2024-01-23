class Flashcard:
    term: str
    definition: str

    def __init__(self, term: str, definition: str):
        self.term = term
        self.definition = definition

    def __repr__(self):
        return f"{self.term} : {self.definition}"

    def new_card(self):
        flashcard_set = []
        again = "y"

        while again == "y":
            term = input("Enter the front of card: ")
            definition = input("Enter the back of card: ")
            flashcard_set.append(Flashcard(term, definition))
            again = input("Do you want to add another card? (y/n) ")


# testing variables
#sample_flashcards = [
#    Flashcard("Baby cat", "Kitten"),
#    Flashcard("Baby dog", "Puppy"),
#    Flashcard("Baby bunny", "Kit")
#]

#print(sample_flashcards)
# print(flashcard_set)