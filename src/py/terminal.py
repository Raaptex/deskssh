import eel

class Terminal:

    def __init__(self) -> None:
        
        self.linein = None

    def writeIn(self, string):

        self.linein += string