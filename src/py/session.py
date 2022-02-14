import paramiko

class Session:

    def __init__(self) -> None:

        self.host = None
        self.port = None 
        self.user = None

        self.ssh = paramiko.SSHClient()
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        
        print("SESSION -> New session created")
        print("MODULE -> Session loaded")

    def connect(self, host, port, user, pwd):

        self.host = host
        self.port = port
        self.user = user

        self.ssh.connect(hostname=host, port=22, username=user, password=pwd)

        print("SESSION -> Session connected !")

    def exec(self, cmd):

        return self.ssh.exec_command(cmd)

