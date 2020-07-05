from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import sudoku_solve
import numpy
import os

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)


@app.route('/api/generate')
def generate():
    response = requests.get(
        'http://www.cs.utep.edu/cheon/ws/sudoku/new?size=9&level=3')
    newBoard = numpy.zeros((9, 9)).tolist()
    for cell in response.json()['squares']:
        newBoard[cell['y']][cell['x']] = cell['value']
    return jsonify(newBoard)


@app.route('/api/solve', methods=['GET', 'POST'])
def solve():
    board = request.json.get('board')
    sudoku_solve.solve(board)
    return jsonify(board)


@app.route('/api/hint', methods=['GET', 'POST'])
def hint():
    board = request.json.get('board')
    solvedBoard = [row[:] for row in board]
    sudoku_solve.solve(solvedBoard)
    (x, y) = sudoku_solve.find_empty(board)
    if x != -1:
        board[x][y] = solvedBoard[x][y]
    return jsonify(board)


@app.route('/')
def index():
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 3001))