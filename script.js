/* =================================
   MATH BRO CALCULATOR
================================= */


/* =================================
   VARIABLES
================================= */

let expression = "";

let answer = "0";

let history = [];


/* =================================
   FUNNY MESSAGES
================================= */

const messages = [

    {
        emoji: "🤨",
        text: "What are you calculating now?"
    },

    {
        emoji: "🧐",
        text: "Interesting... very interesting."
    },

    {
        emoji: "💀",
        text: "Bro really needs a calculator."
    },

    {
        emoji: "🧠",
        text: "Activating my last brain cell."
    },

    {
        emoji: "😭",
        text: "Math was a mistake."
    },

    {
        emoji: "🔥",
        text: "Okay Einstein, calm down."
    },

    {
        emoji: "👀",
        text: "I'm watching your mathematics."
    },

    {
        emoji: "🤖",
        text: "Beep boop. Numbers detected."
    }

];


/* =================================
   DOM ELEMENTS
================================= */

const expressionDisplay =
    document.getElementById("expression");

const answerDisplay =
    document.getElementById("answer");

const messageDisplay =
    document.getElementById("message");

const emojiDisplay =
    document.getElementById("emoji");

const historyList =
    document.getElementById("historyList");


/* =================================
   UPDATE DISPLAY
================================= */

function updateDisplay() {

    expressionDisplay.textContent =
        expression || "0";

    answerDisplay.textContent =
        answer;
}


/* =================================
   ADD NUMBER
================================= */

function appendNumber(number) {

    if (number === ".") {

        let parts =
            expression.split(/[\+\-\*\/%]/);

        let currentNumber =
            parts[parts.length - 1];

        if (currentNumber.includes(".")) {
            return;
        }
    }

    expression += number;

    answer = expression;

    updateDisplay();

    randomMessage();
}


/* =================================
   ADD OPERATOR
================================= */

function appendOperator(operator) {

    if (expression === "") {
        return;
    }

    const lastCharacter =
        expression[expression.length - 1];

    if ("+-*/%".includes(lastCharacter)) {

        expression =
            expression.slice(0, -1);

    }

    expression += operator;

    answer = expression;

    updateDisplay();

    randomMessage();
}


/* =================================
   CLEAR
================================= */

function clearCalculator() {

    expression = "";

    answer = "0";

    updateDisplay();

    setMessage(
        "🧹",
        "Everything is gone. Just like your homework."
    );
}


/* =================================
   DELETE
================================= */

function deleteLast() {

    expression =
        expression.slice(0, -1);

    answer =
        expression || "0";

    updateDisplay();
}


/* =================================
   CALCULATE
================================= */

function calculate() {

    if (!expression) {
        return;
    }

    try {

        const lastCharacter =
            expression[expression.length - 1];

        if ("+-*/%".includes(lastCharacter)) {

            expression =
                expression.slice(0, -1);
        }


        /*
            Function is used here to evaluate
            the mathematical expression.
        */

        let result =
            Function(
                `"use strict"; return (${expression})`
            )();


        if (!Number.isFinite(result)) {

            throw new Error(
                "Math broke."
            );
        }


        result =
            Math.round(
                result * 100000000
            ) / 100000000;


        addHistory(
            expression,
            result
        );


        answer =
            result.toString();


        setMessage(
            "🧠",
            getSuccessMessage(result)
        );


        expression =
            result.toString();


        updateDisplay();


    } catch (error) {

        answer = "ERROR 💀";

        setMessage(
            "💀",
            "BROKE MATHEMATICS."
        );

        shakeCalculator();
    }
}


/* =================================
   SUCCESS MESSAGES
================================= */

function getSuccessMessage(result) {

    const successMessages = [

        "Calculation survived 🫡",

        "Look at you doing mathematics.",

        "NASA has been notified 🚀",

        "The answer has been summoned.",

        "My last brain cell did it.",

        "Math successfully completed.",

        "Not bad, calculator user.",

        "Congratulations. Numbers survived."

    ];

    if (result === 69) {
        return "Nice. Very mature. 💀";
    }

    if (result === 420) {
        return "Bro... seriously? 🌿";
    }

    if (result === 0) {
        return "You calculated NOTHING. 😭";
    }

    return successMessages[
        Math.floor(
            Math.random() *
            successMessages.length
        )
    ];
}


/* =================================
   RANDOM MESSAGE
================================= */

function randomMessage() {

    if (Math.random() > 0.7) {

        const random =
            messages[
                Math.floor(
                    Math.random() *
                    messages.length
                )
            ];

        setMessage(
            random.emoji,
            random.text
        );
    }
}


/* =================================
   SET MESSAGE
================================= */

function setMessage(
    emoji,
    text
) {

    emojiDisplay.textContent =
        emoji;

    messageDisplay.textContent =
        text;
}


/* =================================
   ROAST
================================= */

function roastMe() {

    const roasts = [

        "Bro, you really needed technology for that? 💀",

        "My calculator is disappointed in you.",

        "Even Google would be confused by this.",

        "That's not mathematics. That's a cry for help.",

        "Your math teacher just felt a disturbance.",

        "Respectfully... what are you doing? 😭",

        "I calculated your calculation. Twice.",

        "This is why calculators were invented."

    ];


    const roast =
        roasts[
            Math.floor(
                Math.random() *
                roasts.length
            )
        ];


    setMessage(
        "🔥",
        roast
    );


    shakeCalculator();
}


/* =================================
   RANDOM CALCULATION
================================= */

function randomMath() {

    const a =
        Math.floor(
            Math.random() * 100
        ) + 1;

    const b =
        Math.floor(
            Math.random() * 100
        ) + 1;


    const operators = [
        "+",
        "-",
        "*"
    ];


    const operator =
        operators[
            Math.floor(
                Math.random() *
                operators.length
            )
        ];


    expression =
        `${a}${operator}${b}`;

    answer =
        expression;


    updateDisplay();


    setMessage(
        "🎲",
        "You didn't choose the math. The math chose you."
    );


    setTimeout(
        calculate,
        500
    );
}


/* =================================
   HISTORY
================================= */

function addHistory(
    equation,
    result
) {

    history.unshift({

        equation: equation,

        result: result

    });


    if (history.length > 5) {

        history.pop();

    }


    renderHistory();
}


/* =================================
   RENDER HISTORY
================================= */

function renderHistory() {

    if (history.length === 0) {

        historyList.innerHTML =
            `<p class="empty">
                No bad decisions yet...
            </p>`;

        return;
    }


    historyList.innerHTML =
        history.map(
            item => `

            <div class="history-item">

                <span>
                    ${item.equation}
                </span>

                <span class="result">
                    = ${item.result}
                </span>

            </div>

        `
        ).join("");
}


/* =================================
   CLEAR HISTORY
================================= */

function clearHistory() {

    history = [];

    renderHistory();

    setMessage(
        "🗑️",
        "Evidence successfully destroyed."
    );
}


/* =================================
   SHAKE
================================= */

function shakeCalculator() {

    const calculator =
        document.querySelector(
            ".calculator"
        );


    calculator.classList.remove(
        "shake"
    );


    void calculator.offsetWidth;


    calculator.classList.add(
        "shake"
    );
}


/* =================================
   KEYBOARD SUPPORT
================================= */

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key;


        if (
            key >= "0" &&
            key <= "9"
        ) {

            appendNumber(key);

        }


        else if (
            key === "."
        ) {

            appendNumber(".");

        }


        else if (
            ["+", "-", "*", "/", "%"]
            .includes(key)
        ) {

            appendOperator(key);

        }


        else if (
            key === "Enter" ||
            key === "="
        ) {

            calculate();

        }


        else if (
            key === "Backspace"
        ) {

            deleteLast();

        }


        else if (
            key === "Escape"
        ) {

            clearCalculator();

        }

    }
);


/* =================================
   START
================================= */

updateDisplay();

renderHistory();
