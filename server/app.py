from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import sudoku_solve
import numpy

app = Flask(__name__)
CORS(app)


@app.route('/api/generate')
def generate():
    response = requests.get(
        'http://www.cs.utep.edu/cheon/ws/sudoku/new?size=9&level=1')
    newBoard = numpy.zeros((9, 9)).tolist()
    for cell in response.json()['squares']:
        newBoard[cell['y']][cell['x']] = cell['value']
    return jsonify(newBoard)


@app.route('/api/solve', methods=['GET', 'POST'])
def solve():
    board = request.json.get('board')
    sudoku_solve.solve(board)
    return jsonify(board)
