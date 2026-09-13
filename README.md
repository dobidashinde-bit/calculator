🐍 Python Scientific Calculator

A clean and responsive scientific calculator built with HTML, CSS, and Python. The calculator uses Pyodide to run Python directly in the browser, while GitHub Pages is used to host the website.

🚀 Live Demo

Coming soon: Add your GitHub Pages link here.

[https://dobidashinde-bit.github.io/calculator/]
✨ Features
🧮 Basic arithmetic
Addition
Subtraction
Multiplication
Division
🔬 Scientific calculations
sin
cos
tan
√
ln
log
x!
EXP
xʸ
π and Euler's number e
Degrees / Radians mode
Ans for the previous answer
Parentheses
Percentage
Keyboard support
Responsive design
Dark calculator interface
White website background
Python-powered calculation engine
🛠️ Technologies
HTML — calculator structure
CSS — styling and responsive design
JavaScript — connects the webpage to the Python runtime
Python — calculator logic
Pyodide — runs Python in the browser
GitHub Pages — deployment
🐍 Python Logic

The main calculation logic is written in Python:

if operator == "+":
    result = num1 + num2
elif operator == "-":
    result = num1 - num2
elif operator == "*":
    result = num1 * num2
elif operator == "/":
    result = num1 / num2

Scientific functions are also handled by Python's math module.

📁 Project Structure
python-calculator/
│
├── index.html
├── style.css
├── script.js
└── README.md
💻 Run Locally

Clone the repository:

git clone (https://dobidashinde-bit.github.io/calculator/)

Open the project:

cd python-calculator

Then open index.html in your browser.

Because Pyodide is loaded from the internet, an internet connection is required for the Python runtime to load.

🌐 Deploy on GitHub Pages
Create a GitHub repository.
Upload:
index.html
style.css
script.js
README.md
Go to Settings → Pages.
Under Build and deployment, select:
Source: Deploy from a branch
Branch: main
Folder: / (root)
Save.
GitHub will provide your website URL.
🎯 Purpose

This project was built as a Python learning project to practice:

Variables
Data types
Operators
Type conversion
Functions
Conditional statements
Mathematical operations

It is based on the Python fundamentals covered in my learning notes, including variables, arithmetic operators, input(), and type casting.

📌 Future Improvements
Calculation history
Dark/light calculator themes
More scientific functions
Memory buttons (M+, M-, MR, MC)
Better error handling
Keyboard shortcuts
Mobile optimization
