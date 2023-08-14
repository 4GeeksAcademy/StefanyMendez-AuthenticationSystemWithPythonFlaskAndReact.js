"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def add_user():
    request_body = request.get_json(force=True)
    
    username_exists = User.query.filter_by(username = request_body['username']).first()
    email_exists = User.query.filter_by(email = request_body['email']).first()
    
    if username_exists:
        raise APIException('Username already in use', status_code=404)
    
    if email_exists:
        raise APIException('Email already in use', status_code=404)
    
    if "username" not in request_body:
        raise APIException('The username is required')
    
    if "first_name" not in request_body:
        raise APIException('The first name is required')
    
    if "last_name" not in request_body:
        raise APIException('The last name is required')
    
    if "last_name" not in request_body:
        raise APIException('The last name is required')
    
    if "password" not in request_body:
        raise APIException('The password is required')
    
    user = User(
        username = request_body['username'],
        first_name = request_body['first_name'],
        last_name = request_body['last_name'],
        email = request_body['email'],
        password = request_body['password']
    )
    
    user.save()
    
    response_body = {
        "msg" : "ok",
        "user": request_body
    }
    
    return jsonify(response_body)


@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    
    if user is None:
        raise APIException('User not found', status_code=404)
    
    user.delete()
    
    response_body = {
        "msg": "ok"
    }

    return jsonify(response_body)


@api.route('/login', methods=['POST'])
def login():
    request_body = request.get_json(force=True)
    
    user = User.query.filter_by(
        username = request_body['username'], 
        email= request_body['email'], 
        password = request_body['password']
        ).first()
    
    if user is None:
        raise APIException ('Bad Username, email or password', status_code=401)
    
    access_token = create_access_token(identity = user.id)
    
    return jsonify({ "token": access_token, "user_id": user.id }), 200
    
    
@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    
    return jsonify({"id": user.id, "username": user.username }), 200