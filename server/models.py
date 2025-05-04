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
    tickets = db.relationship('Ticket', back_populates='user', foreign_keys='Ticket.user_id')
    user_tickets = db.relationship('UserTicket', back_populates='user')

    def to_dict(self, visited=None, full=True):
        if visited is None:
            visited = set()

        if self.id in visited:
            return {"id": self.id}  # Prevent recursion for the same user
        visited.add(self.id)

        # Always include devices and tickets related to this user
        data = {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
            "devices": [device.to_dict(visited, full=True) for device in self.devices],  # Pass full=True to ensure user is included
            "tickets": [ticket.to_dict(visited, full=True) for ticket in self.tickets],
            "user_tickets": [user_ticket.to_dict(visited, full=True) for user_ticket in self.user_tickets],
        }

        return data
    
    def __repr__(self):
        return f"<User {self.name}>"
    
class Device(db.Model):
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

    def to_dict(self, visited=None, full=True):
        if visited is None:
            visited = set()

        if self.id in visited:
            return {"id": self.id}  # Prevent recursion for the same device
        visited.add(self.id)

        # Ensure user data is serialized with every device
        user_dict = self.user.to_dict(visited, full=True) if self.user else None

        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "serial_number": self.serial_number,
            "status": self.status,
            "user": user_dict,  # Always include the full user details
            "tickets": [ticket.to_dict(visited, full=True) for ticket in self.tickets],
        }

    def __repr__(self):
        return f"<Device {self.name}, asset {self.id}>"
    
class Ticket(db.Model):
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
    user = db.relationship('User', back_populates='tickets', foreign_keys=[user_id])
    technician = db.relationship('User', foreign_keys=[technician_id])
    device = db.relationship('Device', back_populates='tickets')
    user_tickets = db.relationship('UserTicket', back_populates='ticket')

    def to_dict(self, visited=None, full=True):
        if visited is None:
            visited = set()

        if self.id in visited:
            return {"id": self.id}
        visited.add(self.id)

        data = {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

        if full:
            data["user"] = self.user.to_dict(visited, full=False) if self.user else None
            data["technician"] = self.technician.to_dict(visited, full=False) if self.technician else None
            data["device"] = self.device.to_dict(visited, full=False) if self.device else None
            data["user_tickets"] = [ut.to_dict(visited, full=False) for ut in self.user_tickets]

        return data

    def __repr__(self):
        return f"<Ticket {self.id}>"
    
class UserTicket(db.Model):
    __tablename__ = 'user_ticket'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('tickets.id'), primary_key=True)
    role = db.Column(db.String)
    assigned_date = db.Column(db.DateTime, server_default=db.func.now())

    #relationships
    user = db.relationship('User', back_populates='user_tickets')
    ticket = db.relationship('Ticket', back_populates='user_tickets')

    def to_dict(self, visited=None, full=True):
        if visited is None:
            visited = set()

        if (self.user_id, self.ticket_id) in visited:
            return {"user_id": self.user_id, "ticket_id": self.ticket_id}
        visited.add((self.user_id, self.ticket_id))

        data = {
            "user_id": self.user_id,
            "ticket_id": self.ticket_id,
            "role": self.role,
            "assigned_date": self.assigned_date
        }

        if full:
            data["user"] = self.user.to_dict(visited, full=False) if self.user else None
            data["ticket"] = self.ticket.to_dict(visited, full=False) if self.ticket else None

        return data