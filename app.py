# Import the Flask class from the flask module
from flask import Flask, render_template
import random

app = Flask(__name__)
app.secret_key = "supersecretkey"

GRID_SIZE = 5


def create_grid():
    return [[' ' for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]


def place_ships():
    grid = create_grid()
    ships = 0
    while ships < GRID_SIZE // 2:
        x = random.randint(0, GRID_SIZE - 1)
        y = random.randint(0, GRID_SIZE - 1)
        if grid[x][y] == '~':
            grid[x][y] = 'S'
            ships += 1
    return grid


@app.route("/")
def index():
    if "game_state" not in session:
        session["game_state"] = "Initialized"
    return session["game_state"]


if __name__ == '__main__':
    app.run(debug=True)
