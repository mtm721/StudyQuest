import hashlib


class Player:
    """
    Player: composed of a username, email address, and amount of points (initially set to 0) (passwords handled by DB)
    """
    username: str
    email: str
    points: int

    def __init__(self, user: str, eml: str, points=0):
        """
        Creates a new Player object with username user, email eml, and a point value (if specified)
        :param user: username for the player
        :param eml: email for the player
        :param points: point value for the player (default 0)
        """
        self.username = user
        self.email = eml
        self.points = points
