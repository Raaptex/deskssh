import eel

Core = None

class Functions:

    def __init__(self, core) -> None:
        global Core
        
        Core = core
        print("MODULE -> Functions loaded")

@eel.expose()
def session_connect(host, port, user, pwd):
    return Core.Session.connect(host, port, user, pwd)

@eel.expose()
def terminal_exec(cmd):
    return Core.Terminal.exec(cmd)