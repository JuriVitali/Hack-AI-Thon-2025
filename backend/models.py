from config import db 
from pgvector.sqlalchemy import Vector

class KnowBase(db.Model):
    __tablename__ = 'knowbase'
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<KnowBase {self.path}>"

