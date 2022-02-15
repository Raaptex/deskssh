import spur

class Session:

    def __init__(self) -> None:

        self.host = None
        self.port = None 
        self.user = None

        self.shell = None

        print("MODULE -> Session loaded")

    def connect(self, host, port, user, pwd):

        self.host = host
        self.port = port
        self.user = user

        try:
            self.shell = spur.SshShell(hostname=host, port=port, username=user, password=pwd, missing_host_key=spur.ssh.MissingHostKey.accept, connect_timeout=5)

            self.shell.run(["ls"])

            print("SESSION -> Session connected !")

            return True
        except:
            print("SESSION -> Connection failed...")
            return False

    def exec(self, cmd):

        print("SESSION -> Run : " + cmd)

        return self.shell.run(cmd.split(" "), allow_error=True)