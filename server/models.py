from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
from marshmallow import Schema, fields, validates_schema, ValidationError

class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, unique=True, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    _password_hash = Column("password_hash", String(128), nullable=False)

    @hybrid_property
    def password_hash(self):
        return AttributeError("Password is not meant to be readable.")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password)
        self._password_hash = password_hash.decode('utf-8')

    character = relationship('Character', back_populates='user', lazy=True)

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    def __repr__(self):
        return f"<User {self.id} username={self.username}>"
    
class Character(db.Model):
    __tablename__ = 'character'

    id = Column(Integer, unique=True, primary_key=True)
    name = Column(String(80), nullable=False)
    ArmorClass = Column(Integer, nullable=False)
    HitPoints = Column(Integer, nullable=False)
    Initiative = Column(Integer, nullable=True)

    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    user = relationship('User', back_populates='character', lazy=True)

    condition = relationship('Condition', back_populates='character', lazy=True)

    def __repr__(self):
        return f"<Character {self.id} name={self.name} user_id={self.user_id}>"


class Condition(db.Model):
    __tablename__ = 'condition'

    id = Column(Integer, unique=True, primary_key=True)
    name = Column(String(80), nullable=False)

    character_id = Column(Integer, ForeignKey('character.id'), nullable=False)
    character = relationship('Character', back_populates='condition', lazy=True)

    def __repr__(self):
        return f"<Condition {self.id} name={self.name}>"




class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    password = fields.Str(load_only=True, required=True)

    @validates_schema
    def validate_password(self, data, **kwargs):
        if 'password' in data and len(data['password']) < 6:
            raise ValidationError('Password must be at least 6 characters long.', field_name='password')
    
class CharacterSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    ArmorClass = fields.Int(required=True)
    HitPoints = fields.Int(required=True)
    Initiative = fields.Int(required=False, allow_none=True)
    user_id = fields.Int(required=True)
    user = fields.Nested(UserSchema, only=['id', 'username'])

    @validates_schema
    def validate_stats(self, data, **kwargs):
        if 'ArmorClass' in data and (data['ArmorClass'] < 0 ):
            raise ValidationError('Armor Class must be non-negative.', field_name='ArmorClass')
        if 'Initiative' in data and (data['Initiative'] is not None and data['Initiative'] < 0):
            raise ValidationError('Initiative must be non-negative.', field_name='Initiative')

class ConditionSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    character_id = fields.Int(required=True)
    character = fields.Nested(CharacterSchema, only=['id', 'name', 'ArmorClass', 'HitPoints', 'Initiative'])

    @validates_schema
    def validate_name(self, data, **kwargs):
        if 'name' in data and not data['name'].strip():
            raise ValidationError('Condition name cannot be empty.', field_name='name')