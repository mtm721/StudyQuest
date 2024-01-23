from item import Item
from Flashcard import Flashcard
class TestingMode:
    def __init__(self, card_set, item_set):
        self.player_health = 50
        self.dragon_health = 50
        self.time_elapsed = 0
        self.card_set = card_set
        self.item_set = item_set
    
    
    def get_player_health(self):
        return self.player_health

    def set_player_health(self, new_player_health):
        self.player_health = new_player_health
    
    def get_dragon_health(self):
        return self.dragon.health

    def set_dragon_health(self, new_dragon_health):
        self.dragon_health = new_dragon_health

    def get_time_elapsed(self):
        return self.time_elapsed

    def set_time_elapsed(self, new_time_elapsed):
        self.time_elapsed = new_time_elapsed
    
    def get_item_set(self):
        return self.item_set

    def set_item_set(self, new_item_set):
        self.item_set = new_item_set

    def get_card_set(self):
        return self.card_set
    
    def set_card_set(self, new_card_set):
        self.card_set = new_card_set

sample_card_set_1 = [
        Flashcard("Hello", "Ciao"),
        Flashcard("Simple", "Easy to understand"),
        Flashcard("Carbon dioxide", "CO2")
    ]
sample_item_set_1 = [
    Item("Potion", 500, "Increase health by 25 points"),
    Item("Shield", 250, "No player health damage for the first hit"),
    Item("Crossbow", 300, "+5 dragon damage for every successful attack")
]
sample_card_set_2 = [
    Flashcard("To have", "Avere"),
    Flashcard("To want", "Volere")
]
sample_item_set_2 = [
    Item("Potion", 500, "Increase health by 25 points")
]
sample_card_set_3 = [
    Flashcard("4 x 8", "32"),
    Flashcard("2 x 36", "72"),
    Flashcard("18 x 3", "54"),
    Flashcard("1.5 x 3", "4.5")
]
sample_item_set_3 = []

sample_testing_modes = [
    TestingMode(sample_item_set_1, sample_card_set_1),
    TestingMode(sample_item_set_2, sample_card_set_2),
    TestingMode(sample_item_set_3, sample_card_set_3)
]

    