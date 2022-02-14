import os
import py.core


def start():
    try:
        import eel
    except:
        os.system("pip install eel")

    core = py.core.Core()

    eel.init('app')
    eel.start('index.html')

start()