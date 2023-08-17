"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


