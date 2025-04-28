# seed.py

from faker import Faker
from config import app, db
from models import User, Device, Ticket, UserTicket
import random

fake = Faker()

def seed_data():
    with app.app_context():
        # Drop and recreate all tables
        db.drop_all()
        db.create_all()

        # Create Users
        users = []
        for _ in range(10):
            user = User(
                name=fake.name(),
                email=fake.email(),
                role=random.choice(['user', 'technician'])
            )
            users.append(user)
        db.session.add_all(users)
        db.session.commit()

        # Create Devices
        devices = []
        for _ in range(8):
            device = Device(
                name=fake.word().capitalize(),
                type=random.choice(['Laptop', 'Desktop', 'Tablet', 'Phone']),
                serial_number=fake.unique.random_number(digits=8),
                status=random.choice(['Active', 'Inactive', 'Maintenance']),
                user_id=random.choice(users).id
            )
            devices.append(device)
        db.session.add_all(devices)
        db.session.commit()

        # Create Tickets
        tickets = []
        for _ in range(12):
            user = random.choice([u for u in users if u.role == 'user'])
            technician = random.choice([u for u in users if u.role == 'technician'])
            device = random.choice(devices)

            ticket = Ticket(
                title=fake.sentence(nb_words=4),
                description=fake.text(max_nb_chars=200),
                status=random.choice(['Open', 'In Progress', 'Closed']),
                user_id=user.id,
                technician_id=technician.id,
                device_id=device.id
            )
            tickets.append(ticket)
        db.session.add_all(tickets)
        db.session.commit()

        # Create UserTickets (optional)
        user_tickets = []
        for _ in range(15):
            user = random.choice(users)
            ticket = random.choice(tickets)

            user_ticket = UserTicket(
                user_id=user.id,
                ticket_id=ticket.id,
                role=random.choice(['creator', 'assignee', 'observer'])
            )
            user_tickets.append(user_ticket)
        db.session.add_all(user_tickets)
        db.session.commit()

        print("🌱 Database seeded successfully!")

if __name__ == '__main__':
    seed_data()
