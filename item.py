class Item:
    # name, cost, description, image (to be added)
    name: str
    cost: int
    description: str

    def __init__(self, name: str, cost: int, description: str):
        self.name = name
        self.cost = cost
        self.description = description

    def __repr__(self):
        return "{0} - {1} pts\n{2}\n".format(self.name, self.cost, self.description)


def all_items():
    return [
        # Item("Tome of Knowledge", 100, "The Tome of Knowledge will reveal the answer to one problem."),
        # Item("Glimmer of Wisdom", 50, "The Glimmer of Wisdom will give a hint for one problem."),
        # Item("Test Item", 0, "This is a test item."),
        # Item("Expensive Item", 1000000, "This item is too expensive."),
        Item("Wooden Sword", 50, "A flimsy sword found outside the dragon's lair."),
        Item("Mage's Wand", 100, "A simple wand. It doesn't seem like it's as powerful as your staff."),
        Item("Scroll of Wisdom", 500, "A relic containing ancient wisdom."),
        Item("Wizard's Wand", 1000, "A powerful wand that any wizard would want in their collection."),
        Item("Ruby", 3000, "A shining red gem."),
        Item("Sapphire", 5000, "A glistering blue gem."),
        Item("Emerald", 7000, "A sparkling green gem."),
        Item("The Philosopher's Stone", 9999, "The most powerful of all magic items."),

    ]


# test_items = [
#     Item("Tome of Knowledge", 100, "The Tome of Knowledge will reveal the answer to one problem."),
#     Item("Glimmer of Wisdom", 50, "The Glimmer of Wisdom will give a hint for one problem."),
#     Item("The Philosopher's Stone", 9999, "The Philosopher's Stone will reveal the answers to all problems.")
# ]
#
# for test_item in test_items:
#     print(test_item)
