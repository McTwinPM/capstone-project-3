from flask import request
from flask_jwt_extended import create_access_token, get_jwt_identity, verify_jwt_in_request
from config import app, db, api
from models import User, Character, Condition, UserSchema, CharacterSchema, ConditionSchema
from marshmallow import ValidationError
from flask_restful import Resource

@app.before_request
def before_request():
    open_access_list = [
        'signup',
        'login',
        'static'
    ]

    if request.endpoint not in open_access_list:
        try:
            verify_jwt_in_request()
        except:
            return {"error": "Unauthorized access"}, 401

class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            user_schema = UserSchema()
            user_data = user_schema.load(data)
            if User.query.filter_by(username=user_data['username']).first():
                return {"error": "Username already exists"}, 400
            
            user = User(
                username=user_data['username']
            )
            user.password_hash = user_data['password']
            db.session.add(user)
            db.session.commit()

            access_token = create_access_token(identity=user.id)
            return {"message": "User created successfully", "access_token": access_token}, 201
        except ValidationError as err:
            return {"error": err.messages, "status": 400}

class WhoAmI(Resource):
    def get (self):
        user_id = get_jwt_identity()
        user = db.session.get(User, int(user_id))
        if not user:
            return {"error": "User not found"}, 404
        user_schema = UserSchema()
        return (user_schema.dump(user), 200)

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()
        if not user or not user.check_password(password):
            return {"error": "Invalid username or password"}, 401
        
        access_token = create_access_token(identity=user.id)
        return {"message": "Login successful", "access_token": access_token}, 200
    
class CharacterList(Resource):
    def get(self):
        user_id = get_jwt_identity()
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        characters = Character.query.filter_by(user_id=user_id).paginate(page=page, per_page=per_page, error_out=False)
        character_schema = CharacterSchema(many=True)
        return ({
            "characters": character_schema.dump(characters.items),
            "total": characters.total,
            "pages": characters.pages,
            "current_page": characters.page
        }), 200
    
    def post(self):
        user_id = get_jwt_identity()
        data = request.get_json()
        character_schema = CharacterSchema()
        try:
            character_data = character_schema.load(data)
            character = Character(
                name=character_data['name'],
                user_id=user_id,
                Initiative=character_data['Initiative'],
                ArmorClass=character_data['ArmorClass'],
                HitPoints=character_data['HitPoints'],
            )
            db.session.add(character)
            db.session.commit()
            return ({"message": "Character created successfully", "character": character_schema.dump(character)}), 201
        except ValidationError as err:
            return {"error": err.messages, "status": 400}
    
class CharacterDetail(Resource):
    def get(self, character_id):
        user_id = get_jwt_identity()
        character = Character.query.filter_by(id=character_id, user_id=user_id).first()
        if not character:
            return {"error": "Character not found"}, 404
        character_schema = CharacterSchema()
        return (character_schema.dump(character), 200)
    
    def patch(self, character_id):
        user_id = get_jwt_identity()
        character = Character.query.filter_by(id=character_id, user_id=user_id).first()
        if not character:
            return {"error": "Character not found"}, 404
        
        data = request.get_json()
        character_schema = CharacterSchema(partial=True)
        try:
            character_data = character_schema.load(data)
            for key, value in character_data.items():
                setattr(character, key, value)
            db.session.commit()
            return ({"message": "Character updated successfully", "character": character_schema.dump(character)}), 200
        except ValidationError as err:
            return {"error": err.messages, "status": 400}
    
    def delete(self, character_id):
        user_id = get_jwt_identity()
        character = Character.query.filter_by(id=character_id, user_id=user_id).first()
        if not character:
            return {"error": "Character not found"}, 404
        
        db.session.delete(character)
        db.session.commit()
        return {"message": "Character deleted successfully"}, 200

class ConditionList(Resource):
    def get(self, character_id):
        user_id = get_jwt_identity()
        character = Character.query.filter_by(id=character_id, user_id=user_id).first()
        if not character:
            return {"error": "Character not found"}, 404
        
        conditions = Condition.query.filter_by(character_id=character_id).all()
        condition_schema = ConditionSchema(many=True)
        return (condition_schema.dump(conditions), 200)
    
    def post(self, character_id):
        user_id = get_jwt_identity()
        character = Character.query.filter_by(id=character_id, user_id=user_id).first()
        if not character:
            return {"error": "Character not found"}, 404
        
        data = request.get_json()
        condition_schema = ConditionSchema()
        try:
            condition_data = condition_schema.load(data)
            condition = Condition(
                name=condition_data['name'],
                character_id=character_id
            )
            db.session.add(condition)
            db.session.commit()
            return ({"message": "Condition added successfully", "condition": condition_schema.dump(condition)}), 201
        except ValidationError as err:
            return {"error": err.messages, "status": 400}

class ConditionDetail(Resource):
    def delete(self, character_id, condition_id):
        user_id = get_jwt_identity()
        character = Character.query.filter_by(id=character_id, user_id=user_id).first()
        if not character:
            return {"error": "Character not found"}, 404
        
        condition = Condition.query.filter_by(id=condition_id, character_id=character_id).first()
        if not condition:
            return {"error": "Condition not found"}, 404
        
        db.session.delete(condition)
        db.session.commit()
        return {"message": "Condition removed successfully"}, 200
        

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(WhoAmI, '/me')
api.add_resource(CharacterList, '/characters')
api.add_resource(CharacterDetail, '/characters/<int:character_id>')
api.add_resource(ConditionList, '/characters/<int:character_id>/conditions')
api.add_resource(ConditionDetail, '/characters/<int:character_id>/conditions/<int:condition_id>')
if __name__ == '__main__':
    app.run(port=5555, debug=True)
