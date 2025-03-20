let gameEnded = false;  // Track if the game has ended

function shoot(x, y) {
    if (gameEnded) return;  // Stop the game if it's over

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
        console.log("Server Response:", data);  // Debugging

        if (data.status === "hit") {
            cell.innerText = "X";
            cell.classList.add("hit");
            updateGameStatus("🔥 Direct Hit!");
            updateScore("hits", data.hits);
            updateProgressBar(data.hits, data.total_ships);

        // Check for win condition
        if (data.hits == data.total_ships) {
            updateScore("hits", data.hits);
            updateProgressBar(data.hits, data.total_ships);
        
            setTimeout(() => {
                revealShips(); 
                endGame(data.attempts);
            }, 500); 
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
    let progressBar = document.getElementById("hit-progress");
    if (!progressBar) return;

    let progressPercentage = (hits / totalShips) * 100;
    progressPercentage = Math.min(progressPercentage, 100);
    
    console.log(`Updating progress bar: ${hits}/${totalShips}`);  // Debugging

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