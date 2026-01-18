# 🟩 Wordle Clone

A **Wordle-style game** built using **React, Vite, and Tailwind CSS**.  
The game allows the player to guess a **5-letter word** in **5 attempts**, providing color-based feedback just like the original Wordle.

---

## ✨ Features

- 🎯 5×5 interactive grid (5 guesses × 5 letters)
- ⌨️ Keyboard-based input (no multiple input fields)
- 🟩🟨⬛ Real Wordle color logic:
  - 🟩 Green: correct letter & correct position  
  - 🟨 Yellow: correct letter but wrong position  
  - ⬛ Gray: letter not in the word
- 🔒 Submitted rows are locked and cannot be edited
- 🏆 Game ends immediately when the correct word is guessed
- ⚡ Fast development setup using Vite
- 🎨 Styled with Tailwind CSS

---

## 🛠 Tech Stack

- **React** (Hooks: `useState`, `useEffect`)
- **Vite**
- **Tailwind CSS**
- **JavaScript (ES6+)**

---

## 🧠 How It Works

- A random 5-letter word is fetched at the start of the game
- User types letters using the keyboard
- Letters fill the active row from left to right
- Pressing **Enter** submits a guess and locks the row
- Colors are applied based on Wordle rules
- The game stops when the word is guessed or attempts are exhausted

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/wordle-clone.git
