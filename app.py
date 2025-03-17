# Import the Flask class from the flask module
from flask import Flask, render_template

app = Flask(__name__)

GRID_SIZE = 5


def create_grid():
    return [[' ' for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]


@app.route('/')
def index():
    grid = create_grid()
    return render_template('index.html', grid=grid)


if __name__ == '__main__':
    app.run(debug=True)
