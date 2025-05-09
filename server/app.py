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
            return make_response(user.to_dict(), 200)
        else:
            return {'error': 'User not found'}, 404
        
    elif request.method == 'DELETE':
        if not user:
            return {'error': 'User not found'}, 404
        
        db.session.delete(user)
        db.session.commit()

        return make_response({}, 204)

@app.route('/devices', methods=['GET', 'POST'])
def get_devices():
    devices = [device.to_dict() for device in Device.query.all()]

    if request.method == 'GET':
        return make_response(devices, 200)
    
    elif request.method == 'POST':
        data = request.get_json()

        required_fields = ['name', 'type', 'serial_number', 'status', 'user_id']
        errors = []

        for field in required_fields:
            value = data.get(field)
            if not value:
                errors.append(f"{field.capitalize()} is required.")
        if errors:
            return make_response({'errors': errors}, 400)
        
        try: 
            new_device = Device(
                name=data['name'],
                type=data['type'],
                status=data['status'],
                serial_number=data['serial_number'],
                user_id=data['user_id'],
            )

            db.session.add(new_device)
            db.session.commit()

            return make_response(new_device.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({'errors': ['Failed to create device.']}, 500)
        

@app.route('/devices/<int:id>', methods=['GET', 'DELETE'])
def devices_by_id(id):
    device = Device.query.filter_by(id=id).first()

    if request.method == 'GET':
        if device:
            return make_response(device.to_dict(), 200)
        else:
            return {'error': 'Device not found'}, 404
        
    elif request.method == 'DELETE':
        if not device:
            return {'error': 'Device not found'}, 404
        
        db.session.delete(device)
        db.session.commit()

        return make_response({}, 204)

@app.route('/tickets', methods=['GET', 'POST'])
def get_tickets():

    if request.method == 'GET':
        tickets = [ticket.to_dict() for ticket in Ticket.query.all()]
        return make_response(tickets, 200)
    
    elif request.method == 'POST':
        data = request.get_json()

        required_fields = ['title', 'description', 'status', 'user_id', 'technician_id', 'device_id']
        errors = []
        
        for field in required_fields:
            value = data.get(field)
            if not value:
                errors.append(f"{field.capitalize()} is required.")

        if errors:
            return make_response({'errors': errors}, 400)
        
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
        except Exception as e:
            db.session.rollback()
            return make_response({'errors': ['Failed to create ticket.']}, 500)

@app.route('/tickets/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def ticket_by_id(id):
    ticket = Ticket.query.filter_by(id=id).first()

    if request.method == 'GET':
        if ticket:
            return make_response(ticket.to_dict(), 202)
        else:
            return {'error': 'Ticket not found'}, 404
        
    elif request.method == 'PATCH':
        if not ticket:
            return {'error': 'Ticket not found'}, 404
        
        data = request.get_json()

        required_fields = {
            'title': ticket.title,
            'description': ticket.description,
            'status': ticket.status,
            'user_id': ticket.user_id,
            'technician_id': ticket.technician_id,
            'device_id': ticket.device_id
        }

        for field, value in required_fields.items():
            new_value = data.get(field)

            if new_value == '':
                return {'error': f'{field.capitalize()} cannot be empty'}, 400
            
            elif new_value:
                setattr(ticket, field, new_value)

        db.session.commit()

        return make_response(ticket.to_dict(), 200)

    elif request.method == 'DELETE':
        if not ticket:
            return {'error': 'Ticket not found'}, 404

        db.session.delete(ticket)
        db.session.commit()

        return make_response({}, 204)
    
@app.route('/tickets/<int:ticket_id>/notes', methods=['GET', 'POST'])
def get_and_post_ticket_notes(ticket_id):
    user_tickets = UserTicket.query.filter_by(ticket_id=ticket_id).all()

    if request.method == 'GET':
        return make_response([ut.to_dict() for ut in user_tickets])
    
    elif request.method == 'POST':
        data = request.get_json()

        new_note = UserTicket(
            user_id=data['user_id'],
            ticket_id=ticket_id,
            notes=data['notes']
        )

        db.session.add(new_note)
        db.session.commit()
        
        return make_response(new_note.to_dict())
        
@app.route('/tickets/<int:ticket_id>/notes/<user_id>', methods=['PATCH', 'DELETE'])
def patch_and_del_ticket_notes(ticket_id, user_id):
    user_ticket = UserTicket.query.filter_by(ticket_id=ticket_id, user_id=user_id).first()

    if not user_ticket:
        return {"error": "Note not found"}, 404
    
    if request.method == 'PATCH':
        data = request.get_json()
        
        user_ticket.notes = data.get('notes', user_ticket.notes)
        db.session.commit()

        return make_response(user_ticket.to_dict())
    
    elif request.method == 'DELETE':

        db.session.delete(user_ticket)
        db.session.commit()

        return make_response({}, 204)

if __name__ == '__main__':
    app.run(port=5555, debug=True)

