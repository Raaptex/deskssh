import eel

class Terminal:

    def __init__(self, Core) -> None:

        self.Core = Core

    def exec(self, cmd):

        result = self.Core.Session.exec(cmd)

        return {
            "output": result.output.decode("utf-8") 
        }