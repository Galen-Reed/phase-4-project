from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    role = db.Column(db.String)

    #relationships
    devices = db.relationship('Device', back_populates='user')
    tickets = db.relationship('Ticket', back_populates='user')

    def __repr__(self):
        return f"<User {self.name}>"
    
class Device(db.Model, SerializerMixin):
    __tablename__ = "devices"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    serial_number = db.Column(db.Integer)
    status = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    #relationships
    users = db.relationship('User', back_populates='device')
    tickets = db.relationship('Ticket', back_populates='device')

    def __repr__(self):
        return f"<Device {self.name}, asset {self.id}>"
    
class Ticket(db.Model, SerializerMixin):
    __tablename__ = "tickets"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    status = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    technician_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    device_id = db.Column(db.Integer, db.ForeignKey('device.id'))

    #relationships
    user = db.relationship('User', back_populates='tickets', overlaps='devices, users')
    device = db.relationship('Device', back_populates='tickets', overlaps='devices, users')

    def __repr__(self):
        return f"<Ticket {self.id}>"
    