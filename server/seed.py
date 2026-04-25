from random import choice, randint
from faker import Faker
from models import db, User, Character, Condition
from app import app

faker = Faker()

with app.app_context():
    print("Deleting existing data...")
    Condition.query.delete()
    Character.query.delete()
    User.query.delete()

    print('Creating users...')
    users = []
    usernames = []

    for i in range(10):
        username = faker.user_name()
        while username in usernames:
            username = faker.user_name()
        usernames.append(username)

        user = User(username=username)
        user.password_hash = 'password123'
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

    print('Creating characters...')
    characters = []
    for i in range(20):
        character = Character(
            name=faker.first_name(),
            ArmorClass=randint(10, 20),
            HitPoints=randint(20, 100),
            Initiative=randint(1, 20),
            user_id=choice(users).id
        )
        characters.append(character)
    db.session.add_all(characters)
    db.session.commit()

    print('Creating conditions...')
    conditions = []
    condition_names = ['Poisoned', 'Stunned', 'Invisible', 'Paralyzed', 'Charmed']
    for i in range(30):
        condition = Condition(
            name=choice(condition_names),
            character_id=choice(characters).id
        )
        conditions.append(condition)
    db.session.add_all(conditions)
    db.session.commit()
    print('Seeding complete!')