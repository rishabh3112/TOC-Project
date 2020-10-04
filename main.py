from news import get_news
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/<string:query>/<int:offset>', methods=['GET'])
def news(query, offset):
  print(query)
  return jsonify(get_news(q=query, offset=offset))

@app.route('/')
def home():
  return 'News Reporter'
