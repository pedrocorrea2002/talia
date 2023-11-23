class user:
    def __init__(self, username,password):
        self.username = username
        self.password = password

    def is_active(self): #? PODERIA SER MAIS COMPLEXO, MAS EU FORCEI COMO TRUE, ESSA FUNÇÃO É CHAMADA PELO PRÓPRIO LoginManager DO flask_login
        return True
    
    def get_id(self):
        return (self.username,self.password)
    
    def is_authenticated(self): #? PODERIA SER MAIS COMPLEXO, MAS EU FORCEI COMO TRUE, ESSA FUNÇÃO É CHAMADA PELO PRÓPRIO LoginManager DO flask_login
        return True