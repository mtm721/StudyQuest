class FlashcardSet:
    name: str

    def __init__(self, name: str):
        self.name = name

    def __repr__(self):
        return f"{self.name}"

# testing variables
sample_flashcardSet = [
    FlashcardSet("Animal Baby Names"),
    FlashcardSet("Italian Vocab"),
    FlashcardSet("Calc II Test")
]

print(sample_flashcardSet)