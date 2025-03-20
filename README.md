# 🚢 Battleship Game 🎯

Battleship Game is a fun and interactive single-player web-based game where players try to sink hidden enemy ships by clicking on grid cells. The goal is to locate and hit all ships before running out of attempts. 

The game features a **modern UI**, **real-time progress tracking**, and **a dynamic game status bar** that updates with every move.

🔹 **Built With:** Python (Flask), JavaScript, HTML, CSS (Bootstrap)  
🔹 **Live Demo:** [Play on Heroku](https://battleship-game-final-68704665b3e6.herokuapp.com/)  

---

## 📸 Screenshots
![Game Screenshot](documentation/screenshots/game-ui.png)

---

## **👤 User Stories for Battleship Game**

### **1. First-time Visitor**
- As a first-time visitor, I want to understand the game rules easily.
- As a first-time visitor, I want a visually appealing and easy-to-navigate interface.
- As a first-time visitor, I want to see feedback for my actions (hits, misses, and progress).

### **2. Returning Player**
- As a returning player, I want to play the game multiple times without reloading the page.
- As a returning player, I want to track my number of attempts.
- As a returning player, I want to see my progress towards victory.

### **3. Game Administrator (Developer)**
- As a developer, I want to ensure the game is **fully responsive**.
- As a developer, I want the game to be **error-free and user-friendly**.
- As a developer, I want to deploy and update the game **easily on Heroku**.

---

## **🎨 UX Design**

The game interface is designed to be **clean, minimalistic, and engaging**.  
Key elements include:
- **A dark theme with bright highlights** for contrast.
- **Interactive grid cells** with hover and click effects.
- **A responsive layout** to work on desktop and mobile.
- **Animated hit and miss markers** for visual feedback.

### **🔹 Color Scheme**
The colors used in the game are designed to provide clear visibility and engagement:
- `#1a1a2e` → Background color (dark navy)
- `#ffcc00` → Interactive elements (buttons, status updates)
- `#ff0000` → Hit marker (indicating a successful attack)
- `#007bff` → Miss marker (indicating a missed shot)
- `#28a745` → Progress bar (tracking successful hits)

### **🔹 Typography**
- **Montserrat** → Used for headers and status messages.
- **Lato** → Used for button text and grid numbers.

### **🔹 Wireframes**
| Page | Screenshot |
|---|---|
| Game Board (Mobile) | ![Game Mobile](documentation/wireframes/game-mobile.png) |
| Game Board (Desktop) | ![Game Desktop](documentation/wireframes/game-desktop.png) |

---

## **🛠 Features**

### **✅ Existing Features**
- **Grid-based Battleship Game:** Click on a grid cell to shoot.
- **Real-time Game Status:** Updates for hits, misses, and win conditions.
- **Progress Bar:** Tracks the number of successful hits.
- **End-Game Lock:** Prevents further moves after all ships are sunk.
- **Modern UI:** Clean Bootstrap design with animations.

### **🔜 Future Features**
- **AI Opponent Mode:** Play against an AI that fires back.
- **Difficulty Levels:** Adjust grid size and ship placement complexity.
- **Leaderboard:** Track scores and fastest completion times.
- **Sound Effects:** Add battle-themed sounds for hits and misses.

---