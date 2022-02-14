import eel

Core = None

class Functions:

    def __init__(self, core) -> None:
        global Core
        
        self.Core = core
        Core = core
        print("MODULE -> Functions loaded")

    
    def session_connect(self, host, port, user, pwd):
        self.Core.Session.connect(host, port, user, pwd)

@eel.expose()
def session_connect(host, port, user, pwd):
    Core.Functions.session_connect(host, port, user, pwd)