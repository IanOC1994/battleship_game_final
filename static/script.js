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
        console.log("Server Response:", data);  // ✅ Debugging

        if (data.hits !== undefined) {
            console.log(`Updating hits: ${data.hits}`);  // ✅ Check if value is correct
        }

        if (data.status === "hit" || data.status === "win") {
            cell.innerText = "X";
            cell.classList.add("hit");
            updateGameStatus("🔥 Hit! Keep going!");
            updateScore("hits", data.hits);  // ✅ Ensure hits update
            updateProgressBar(data.hits, data.total_ships);
        }

        if (data.status === "win") {
            updateGameStatus(`🎉 You won in ${data.attempts} attempts!`);
            revealShips();
        }

        if (data.status === "miss") {
            cell.innerText = "O";
            cell.classList.add("miss");
            updateGameStatus("💦 Miss! Try again.");
        }

        updateScore("attempts", data.attempts);
    });
}

// Function to update Hits and Attempts dynamically
function updateScore(type, value) {
    let element = document.getElementById(type);
    if (element) {
        console.log(`Updating ${type}: ${value}`);  // ✅ Debugging
        element.innerText = value;

        // ✅ Force UI refresh (fix for some browsers)
        element.style.color = "red";
        setTimeout(() => {
            element.style.color = "";
        }, 100);
    }
}

// Update Progress Bar
function updateProgressBar(hits, totalShips) {
    if (totalShips === 0) return;  // Prevent division by zero

    let progressPercentage = (hits / totalShips) * 100;
    progressPercentage = Math.min(progressPercentage, 100);  // Ensure it doesn't exceed 100%

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