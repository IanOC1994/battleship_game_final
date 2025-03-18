function shoot(x, y) {
    let cell = document.getElementById(`cell-${x}-${y}`);

    // Prevent clicking the same cell twice
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
            updateGameStatus("🔥 Hit! Keep going!");
            updateScore("hits", data.hits);
            updateProgressBar(data.hits, data.total_ships);  // ✅ Ensure progress bar updates

        } else if (data.status === "miss") {
            cell.innerText = "O";
            cell.classList.add("miss");
            updateGameStatus("💦 Miss! Try again.");
        } else if (data.status === "duplicate") {
            alert("You already fired here!");
            return;
        } else if (data.status === "win") {
            updateGameStatus(`🎉 You won in ${data.attempts} attempts!`);
            revealShips();
            updateProgressBar(data.hits, data.total_ships);  // ✅ Ensure final hit updates progress
        }

        // Always update attempts
        updateScore("attempts", data.attempts);
    });
}

// Function to update Hits and Attempts dynamically
function updateScore(type, value) {
    let scoreElement = document.getElementById(type);
    scoreElement.innerText = value;
}

// Update Progress Bar
function updateProgressBar(hits, totalShips) {
    // Prevent progress bar from going above 100%
    let progressPercentage = Math.min((hits / totalShips) * 100, 100);

    // ✅ Update progress bar width
    let progressBar = document.getElementById("hit-progress");
    progressBar.style.width = progressPercentage + "%";
    progressBar.setAttribute("aria-valuenow", hits);
}

// Update Game Status Message
function updateGameStatus(message) {
    document.getElementById("game-status").innerText = message;
}

// Reveal Ships When Game Ends
function revealShips() {
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

// Restart Game Function
function restartGame() {
    fetch("/restart")
    .then(() => location.reload());
}