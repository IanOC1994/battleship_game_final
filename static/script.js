function shoot(x, y) {
    let cell = document.getElementById(`cell-${x}-${y}`);

    if (cell.classList.contains("hit") || cell.classList.contains("miss")) {
        alert("You've already shot here!");
        return;
    }

    fetch("/shoot", {
        method: "POST",
        body: new URLSearchParams({ "x": x, "y": y }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "hit") {
            cell.innerText = "X";
            cell.classList.add("hit");
        } else if (data.status === "miss") {
            cell.innerText = "O";
            cell.classList.add("miss");
        } else if (data.status === "win") {
            alert(`You won in ${data.attempts} attempts!`);
            showShips();
        }
    });
}

function showShips() {
    fetch("/reveal-ships")
    .then(response => response.json())
    .then(data => {
        data.ships.forEach(([x, y]) => {
            let cell = document.getElementById(`cell-${x}-${y}`);
            cell.innerText = "S";
            cell.style.backgroundColor = "green";
        });
    });
}

function restartGame() {
    fetch("/restart")
    .then(() => location.reload());
}