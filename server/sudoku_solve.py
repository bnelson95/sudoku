import math

oneThroughNine = [1,2,3,4,5,6,7,8,9]

def solve(board):
	# find next empty space
	(x, y) = find_empty(board)

	# board is complete
	if x == -1:
		return True

	# test all numbers 1 through 9
	for n in range(1, 10):
		board[x][y] = n
		if valid(board, x, y) and solve(board):
				return True
		board[x][y] = 0 # backtrack

	return False

def find_empty(board):
	for i in range(len(board)):
		for j in range(len(board[0])):
			if board[i][j] == 0:
				return (i, j)
	return (-1, -1)

def valid(board, x, y):
	row = getRowSeq(board, x)
	col = getColumnSeq(board, y)
	square = getSquareSeq(board, x, y)
	valid = isSeqValid(row) and isSeqValid(col) and isSeqValid(square)
	return valid

def isSeqValid(seq):
	return not hasDuplicates(seq) and set(seq).issubset(oneThroughNine)
def hasDuplicates(listOfElems):
	if len(listOfElems) == len(set(listOfElems)):
		return False
	else:
		return True

def isSeqComplete(seq):
	seq.sort()
	return seq == oneThroughNine

def getColumnSeq(board, x):
	col = [board[y][x] for y in range(9)]
	col = [i for i in col if i != 0]
	#print("col:", col)
	return col

def getRowSeq(board, y):
	row = board[y][:]
	row = [i for i in row if i != 0]
	#print("row:", row)
	return row

def getSquareSeq(board, x, y):
	x = x - (x%3)
	y = y - (y%3)
	a = board[x+0][y:y+3]
	b = board[x+1][y:y+3]
	c = board[x+2][y:y+3]
	square = a + b + c
	square = [i for i in square if i != 0]
	#print("square:", square)
	return square
