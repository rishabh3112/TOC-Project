from news import get_news
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/<string:query>/<int:offset>', methods=['GET'])
def news(query, offset):
  return jsonify(get_news(q=query, offset=offset))

@app.route('/')
def home():
  return 'News Reporter'
