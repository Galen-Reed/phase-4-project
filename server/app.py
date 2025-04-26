#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Device, Ticket, UserTicket

# Views go here!

@app.route('/')
def index():
    return "<h1>Phase 4 Project!</h1>"

@app.route('/users')
def get_users():
    users = [user.to_dict() for user in User.query.all()]
    return make_response(users, 200)

@app.route('/users/<int:id>', methods=['GET', 'DELETE'])
def users_by_id(id):
    user = User.query.filter_by(id=id).first()

    if request.method == 'GET':
        if user:
            return make_response(user, 200)
        else:
            return {'error': 'User not found'}, 404
        
    elif request.method == 'DELETE':
        if not user:
            return {'error': 'User not found'}, 404
        
        db.session.delete(user)
        db.session.commit()

        return make_response({}, 204)

@app.route('/devices')
def get_devices():
    devices = [device.to_dict() for device in Device.query.all()]
    return make_response(devices, 200)

@app.route('/devices/<int:id>')
def index():
    pass

@app.route('/tickets', methods=['GET', 'POST'])
def get_tickets():

    if request.method == 'GET':
        tickets = [ticket.to_dict() for ticket in Ticket.query.all()]
        return make_response(tickets, 200)
    
    elif request.method == 'POST':
        data = request.get_json()

        required_fields = ['title', 'description', 'user_id', 'technician_id']
        if not all(field in data for field in required_fields):
            return {'errors': ['validation errors']}
        
        try: 
            new_ticket = Ticket(
                title=data['title'],
                description=data['description'],
                status=data['status'],
                user_id=data['user_id'],
                technician_id=data['technician_id'],
                device_id=data['device_id']
            )

            db.session.add(new_ticket)
            db.session.commit()

            return make_response(new_ticket.to_dict(), 201)
        except Exception:
            return {'errors': ['validation errors']}

@app.route('/tickets/<int:id>')
def index():
    pass




if __name__ == '__main__':
    app.run(port=5555, debug=True)

