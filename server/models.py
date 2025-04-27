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
    user_tickets = db.relationship('UserTicket', backref='user', lazy=True)

    serialize_rules = ('-devices.user', '-tickets.user', '-user_tickets.user')

    def __repr__(self):
        return f"<User {self.name}>"
    
class Device(db.Model, SerializerMixin):
    __tablename__ = "devices"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    serial_number = db.Column(db.String)
    status = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    #relationships
    user = db.relationship('User', back_populates='devices')
    tickets = db.relationship('Ticket', back_populates='device')

    serialize_rules = ('-user.device', '-tickets.device')

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
    device_id = db.Column(db.Integer, db.ForeignKey('devices.id'))

    #relationships
    user = db.relationship('User', back_populates='tickets')
    device = db.relationship('Device', back_populates='tickets')
    user_tickets = db.relationship('UserTicket', backref='ticket', lazy=True)

    serialize_rules = ('-user.tickets', '-device.tickets', '-user_tickets.ticket')

    def __repr__(self):
        return f"<Ticket {self.id}>"
    
class UserTicket(db.Model, SerializerMixin):
    __tablename__ = 'user_ticket'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('tickets.id'), primary_key=True)
    role = db.Column(db.String)
    assigned_date = db.Column(db.DateTime, server_default=db.func.now())

    #relationships
    user = db.relationship('User', backref=db.backref('user_tickets', lazy=True))
    ticket = db.relationship('Ticket', backref=db.backref('user_tickets', lazy=True))
    