import py.functions
import py.session
import py.terminal

class Core:

    def __init__(self) -> None:
        
        self.Session = py.session.Session()
        self.Functions = py.functions.Functions(self)
        self.Terminal = py.terminal.Terminal(self)