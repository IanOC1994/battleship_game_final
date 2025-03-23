let gameEnded = false;  // Track if the game has ended

function shoot(x, y) {
    if (gameEnded) return;  // Stop the game if it's over

    let cell = document.getElementById(`cell-${x}-${y}`);

    // Prevent clicking the same cell twice
    if (cell.classList.contains("hit") || cell.classList.contains("miss")) {
        showNotification("You've already shot here!");
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
            updateGameStatus("🔥 Direct Hit!");
            updateScore("hits", data.hits);
            updateProgressBar(data.hits, data.total_ships);

        // Check for win condition
        if (data.hits == data.total_ships) {
        
            updateScore("hits", data.hits);  // Ensure hit counter updates
            updateProgressBar(data.hits, data.total_ships);  // Ensure progress bar updates
        
            setTimeout(() => {
                revealShips();  //  Show the second ship
                endGame(data.attempts);  // Then lock the game
            }, 1000);  // 1 second delay ensures UI updates before game locks
        }

        } else if (data.status === "miss") {
            cell.innerText = "O";
            cell.classList.add("miss");
            updateGameStatus("💦 Miss! Try again.");

        } else if (data.status === "win") {
            revealShips();
            endGame(data.attempts);
        }

        updateScore("attempts", data.attempts);
    });
}

// Function to update Hits and Attempts dynamically
function updateScore(type, value) {
    let element = document.getElementById(type);
    if (element) {
        element.innerText = value;

        element.style.color = "red";
        setTimeout(() => {
            element.style.color = "";
        }, 100);
    }
}

// Update Progress Bar
function updateProgressBar(hits, totalShips) {
    let progressBar = document.getElementById("hit-progress");
    if (!progressBar) return;

    let progressPercentage = (hits / totalShips) * 100;
    progressPercentage = Math.min(progressPercentage, 100);

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
        if (data.status === "hit") {
            cell.innerText = "X";
            cell.classList.add("hit");
            updateGameStatus("🔥 Direct Hit!");
            updateScore("hits", data.hits);
            updateProgressBar(data.hits, data.total_ships);
   
            // Check for win condition
            if (data.hits == data.total_ships) {
                updateScore("hits", data.hits);  // Ensure hit counter updates
                updateProgressBar(data.hits, data.total_ships);  // Ensure progress bar updates
   
                setTimeout(() => {
                    revealShips();  // Show the second ship
                    endGame(data.attempts);  // Then lock the game
                }, 1000);  // 1 second delay ensures UI updates before game locks
            }
   
        } else if (data.status === "miss") {
            cell.innerText = "O";
            cell.classList.add("miss");
            updateGameStatus("💦 Miss! Try again.");
        } else if (data.status === "win") {
            revealShips();
            endGame(data.attempts);
        }
   
        updateScore("attempts", data.attempts);
    });
}

function endGame(attempts) {
    gameEnded = true;  // Prevent further clicks
    updateGameStatus(`🎉 Victory! You won in ${attempts} attempts!`);

    // Disable all cells
    setTimeout(() => {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.classList.add("disabled");
            cell.onclick = null;
        });
    }, 500);
}

// Restart Game Function
function restartGame() {
    fetch("/restart")
    .then(() => location.reload());
}

// Custom Notification Function
function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", () => {
            const x = cell.dataset.x;
            const y = cell.dataset.y;
            shoot(x, y);
        });
    });

    const restartButton = document.getElementById("restart-btn");
    if (restartButton) {
        restartButton.addEventListener("click", restartGame);
    }
});