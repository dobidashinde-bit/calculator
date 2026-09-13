/* =====================================
   PYTHON CALCULATOR
===================================== */

let pyodide = null;

let expression = "";

let lastAnswer = 0;

let degreeMode = true;


/* =====================================
   LOAD PYTHON
===================================== */

async function startPython() {

    const status = document.getElementById("status");

    try {

        pyodide = await loadPyodide();

        status.textContent = "Python ready ✓";

    } catch (error) {

        status.textContent = "Python failed to load";

        console.error(error);
    }
}

startPython();


/* =====================================
   DISPLAY
===================================== */

function updateDisplay() {

    const screen =
        document.getElementById("screen");

    if (expression === "") {

        screen.textContent = "0";

    } else {

        screen.textContent = expression;
    }
}


/* =====================================
   ADD VALUE
===================================== */

function addValue(value) {

    expression += value;

    updateDisplay();
}


/* =====================================
   NUMBER BUTTONS
===================================== */

document
    .querySelectorAll(".number")
    .forEach(button => {

        button.addEventListener("click", () => {

            addValue(button.dataset.value);

        });

    });


/* =====================================
   OPERATOR BUTTONS
===================================== */

document
    .querySelectorAll(".operator")
    .forEach(button => {

        button.addEventListener("click", () => {

            addValue(button.dataset.value);

        });

    });


/* =====================================
   SCIENTIFIC FUNCTIONS
===================================== */

document
    .querySelectorAll(".function")
    .forEach(button => {

        button.addEventListener("click", () => {

            const value =
                button.dataset.value;

            if (!value) {
                return;
            }


            switch (value) {

                case "sin":

                    addValue("sin(");

                    break;


                case "cos":

                    addValue("cos(");

                    break;


                case "tan":

                    addValue("tan(");

                    break;


                case "sqrt":

                    addValue("sqrt(");

                    break;


                case "ln":

                    addValue("ln(");

                    break;


                case "log":

                    addValue("log(");

                    break;


                case "factorial":

                    addValue("factorial(");

                    break;


                case "pi":

                    addValue("pi");

                    break;


                case "e":

                    addValue("e");

                    break;


                case "ans":

                    addValue(String(lastAnswer));

                    break;


                case "exp":

                    addValue("exp(");

                    break;


                case "power":

                    addValue("**");

                    break;


                case "inv":

                    addValue("1/(");

                    break;


                case "(":

                    addValue("(");

                    break;


                case ")":

                    addValue(")");

                    break;


                case "%":

                    addValue("%");

                    break;
            }

        });

    });


/* =====================================
   DEGREE MODE
===================================== */

document
    .getElementById("angle")
    .addEventListener("click", () => {

        degreeMode = true;

        document.getElementById("angle")
            .style.background = "#3478f6";

        document.getElementById("rad")
            .style.background = "#292c3a";

    });


/* =====================================
   RADIAN MODE
===================================== */

document
    .getElementById("rad")
    .addEventListener("click", () => {

        degreeMode = false;

        document.getElementById("rad")
            .style.background = "#3478f6";

        document.getElementById("angle")
            .style.background = "#292c3a";

    });


/* =====================================
   CLEAR
===================================== */

document
    .getElementById("clear")
    .addEventListener("click", () => {

        expression = "";

        document.getElementById("history")
            .textContent = "";

        updateDisplay();

    });


/* =====================================
   PYTHON CALCULATION
===================================== */

async function calculateWithPython() {

    const screen =
        document.getElementById("screen");

    const history =
        document.getElementById("history");


    /* Python hasn't loaded */

    if (!pyodide) {

        screen.textContent =
            "Python loading...";

        return;
    }


    /* Empty expression */

    if (expression.trim() === "") {

        return;
    }


    try {

        /*
         * Send expression to Python.
         */

        pyodide.globals.set(
            "python_expression",
            expression
        );


        pyodide.globals.set(
            "python_degree_mode",
            degreeMode
        );


        /*
         * PYTHON CODE
         */

        const pythonCode = `

import math


expression = python_expression

degree_mode = python_degree_mode


# -----------------------------
# Trigonometry
# -----------------------------

def sin(x):

    if degree_mode:

        x = math.radians(x)

    return math.sin(x)


def cos(x):

    if degree_mode:

        x = math.radians(x)

    return math.cos(x)


def tan(x):

    if degree_mode:

        x = math.radians(x)

    return math.tan(x)


# -----------------------------
# Scientific functions
# -----------------------------

def sqrt(x):

    return math.sqrt(x)


def ln(x):

    return math.log(x)


def log(x):

    return math.log10(x)


def factorial(x):

    return math.factorial(int(x))


def exp(x):

    return math.exp(x)


# -----------------------------
# Constants
# -----------------------------

pi = math.pi

e = math.e


# -----------------------------
# Calculate
# -----------------------------

result = eval(

    expression,

    {

        "__builtins__": {},

        "sin": sin,

        "cos": cos,

        "tan": tan,

        "sqrt": sqrt,

        "ln": ln,

        "log": log,

        "factorial": factorial,

        "exp": exp,

        "pi": pi,

        "e": e

    }

)


str(result)

`;


        /* Run Python */

        const result =
            await pyodide.runPythonAsync(
                pythonCode
            );


        /* Show calculation */

        history.textContent =
            expression + " =";


        /* Show answer */

        screen.textContent =
            result;


        /* Save answer */

        lastAnswer = result;


        /* Use answer for next calculation */

        expression = result;


    } catch (error) {

        screen.textContent =
            "Error";

        console.error(error);

    }

}


/* =====================================
   EQUALS BUTTON
===================================== */

document
    .getElementById("equals")
    .addEventListener(
        "click",
        calculateWithPython
    );


/* =====================================
   KEYBOARD SUPPORT
===================================== */

document.addEventListener(
    "keydown",
    event => {

        const key = event.key;


        /* Numbers/operators */

        if (
            "0123456789.+-*/%()"
                .includes(key)
        ) {

            addValue(key);

        }


        /* Enter */

        if (key === "Enter") {

            calculateWithPython();

        }


        /* Escape */

        if (key === "Escape") {

            expression = "";

            updateDisplay();

        }

    }
);