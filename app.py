# Import the Flask class from the flask module
from flask import Flask, render_template, request, session, jsonify
import random
import os

app = Flask(__name__)
app.secret_key = "supersecretkey"  # Required for session storage

GRID_SIZE = 5
NUM_SHIPS = GRID_SIZE // 2


def create_grid():
    return [['~' for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]


def place_ships():
    grid = create_grid()
    ships = 0
    while ships < NUM_SHIPS:
        x = random.randint(0, GRID_SIZE - 1)
        y = random.randint(0, GRID_SIZE - 1)
        if grid[x][y] == '~':
            grid[x][y] = 'S'
            ships += 1
    return grid


@app.route("/")
def index():
    if "game_state" not in session:
        session["game_state"] = create_grid()
        session["computer_grid"] = place_ships()
        session["hits"] = 0
        session["attempts"] = 0
    return render_template(
        "index.html",
        grid=session["game_state"],
        hits=session["hits"],
        attempts=session["attempts"]
    )


@app.route("/shoot", methods=["POST"])
def shoot():
    x, y = int(request.form["x"]), int(request.form["y"])

    if session["game_state"][x][y] != '~':  # Prevent duplicate shots
        return jsonify({"status": "duplicate"})
    session["attempts"] += 1

    if session["computer_grid"][x][y] == 'S':
        session["game_state"][x][y] = 'X'
        session["hits"] += 1
    else:
        session["game_state"][x][y] = 'O'

    session.modified = True

    if session["hits"] == NUM_SHIPS:
        return jsonify({"status": "win", "attempts": session["attempts"]})
    return jsonify({
        "status": "hit" if session['game_state'][x][y] == 'X' else "miss"
    })


@app.route("/reveal-ships")
def reveal_ships():
    ships = []
    for x in range(GRID_SIZE):
        for y in range(GRID_SIZE):
            if session["computer_grid"][x][y] == "S":
                ships.append((x, y))
    return jsonify({"ships": ships})


@app.route("/restart")
def restart():
    session.clear()  # Reset game state
    return "", 204


if __name__ == "__main__":
    if os.name == "nt":  # If running on Windows
        from waitress import serve
        print("Running with Waitress on Windows...")
        serve(app, host="0.0.0.0", port=5000)
    else:  # If running on Linux/Mac (e.g., in a server)
        print("Running with Flask's built-in server...")
        app.run(debug=False)
