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

    # Make sure total ships is correctly calculated
    total_ships = sum(row.count("S") for row in session["computer_grid"])

    return render_template(
        "index.html",
        grid=session["game_state"],
        hits=session["hits"],
        attempts=session["attempts"],
        total_ships=total_ships
    )


@app.route("/shoot", methods=["POST"])
def shoot():
    x, y = int(request.form["x"]), int(request.form["y"])

    if session["game_state"][x][y] != '~':
        total_ships = sum(row.count("S") for row in session["computer_grid"])
        return jsonify({
            "status": "duplicate",
            "attempts": session["attempts"],
            "hits": session["hits"],
            "total_ships": total_ships
        })

    session["attempts"] += 1
    total_ships = sum(row.count("S") for row in session["computer_grid"])

    if session["computer_grid"][x][y] == 'S':
        session["game_state"][x][y] = 'X'
        session["hits"] += 1
        session.modified = True  # ✅ Ensure session is saved

        print(
            f"✅ Flask: Hits updated to "
            f"{session['hits']}"  # ✅ Debugging in Flask logs
        )

        # ✅ Check if all ships are hit and end the game
        if session["hits"] == total_ships:
            return jsonify({
                "status": "win",
                "attempts": session["attempts"],
                "hits": session["hits"],
                "total_ships": total_ships
            })

        return jsonify({
            "status": "hit",
            "attempts": session["attempts"],
            "hits": session["hits"],
            "total_ships": total_ships
        })

    else:
        session["game_state"][x][y] = 'O'
        session.modified = True

        return jsonify({
            "status": "miss",
            "attempts": session["attempts"],
            "hits": session["hits"],
            "total_ships": total_ships
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
