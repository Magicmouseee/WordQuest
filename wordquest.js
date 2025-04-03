const gameData = {
    "JAVASCRIPT": "A popular programming language used for web development.",
    "CSS": "A stylesheet language used to describe the presentation of a web page.",
    "HTML": "The standard markup language for creating web pages.",
    "PYTHON": "A high-level programming language often used for data analysis and web development.",
    "REACT": "A JavaScript library used for building user interfaces, especially for single-page applications.",
    "DATABASE": "A structured collection of data stored and accessed electronically.",
    "ALGORITHM": "A set of instructions designed to perform a specific task or solve a problem.",
    "GITHUB": "A platform for version control and collaboration, mainly used for code repositories.",
};

let knownWords = new Set();

function loadKnownWords() {
    let savedWords = localStorage.getItem("knownWords");
    if (savedWords) {
        knownWords = new Set(JSON.parse(savedWords));
    }
}

loadKnownWords();

function updateKnownWords() {
    localStorage.setItem("knownWords", JSON.stringify([...knownWords]));
}

let gameplace = document.getElementById("game-place");
let gameword = "";
let attemptsleft = document.getElementById("attempts-left");
let hint = document.getElementById("hint");
let left = 3;
let decrease;
let wordcount = 0;
let correctletter = 0;
let correctpanel = document.getElementById("nextpanel");
let finishpanel = document.getElementById("finishpanel");
let gameoverpanel = document.getElementById("gameoverpanel");


function randomword() {
    const gamewordlist = Object.keys(gameData).filter(word => !knownWords.has(word));

    if (gamewordlist.length === 0) {
        finishpanel.style.display = 'flex';
        return null;
    }

    const randomIndex = Math.floor(Math.random() * gamewordlist.length);
    gameword = gamewordlist[randomIndex];
}

console.log(knownWords)


randomword();

let gamewordos = gameword.split("");
let gamewordoscount = gameword.split("").length;

wordcount = gamewordoscount;

hint.innerText = gameData[gameword];

createdivs();

function createdivs() {
    for (let i = 0; i < wordcount; i++) {
        let gamediv = document.createElement('div');
        gameplace.appendChild(gamediv);
        gamediv.setAttribute("class", "letterbox")

        let gamep = document.createElement("p");
        gamediv.appendChild(gamep);

        let gamestick = document.createElement("div");
        gamediv.appendChild(gamestick);
        gamestick.setAttribute("class", "stickletter")
    }
}

let letterDivs = document.querySelectorAll(".letterbox");

/* Listeners *////////////////////////

document.getElementById("wordinput").addEventListener("input", function () {
    this.value = this.value.toUpperCase();

});

document.getElementById("wordinput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        let guess = document.getElementById("wordinput").value.toUpperCase();
        updateWordDisplay(guess);
        document.getElementById("wordinput").value = "";
    }
});

document.getElementById("submitwordo").addEventListener("click", checkLetter);

function checkLetter() {
    let guess = document.getElementById("wordinput").value.toUpperCase();
    updateWordDisplay(guess);
    document.getElementById("wordinput").value = "";
}

/* Listeners *////////////////////////

function updateWordDisplay(guess) {

    let correctGuess = false;

    for (let i = 0; i < gamewordos.length; i++) {
        let pTag = letterDivs[i].querySelector("p");

        if (gamewordos[i] === guess && pTag.textContent === "") {
            pTag.textContent = guess;
            correctGuess = true;
            correctletter++;

            if (Number(gamewordoscount) == Number(correctletter)) {
                correctpanel.style.display = 'flex';
                knownWords.add(gameword);
                updateKnownWords();
            }
        }
    }

    if (!correctGuess) {
        let inputBox = document.getElementById("wordinput");
        inputBox.style.border = "2px solid red";

        setTimeout(function () {
            inputBox.style.border = "";
        }, 2000);


        letterDivs.forEach(box => box.classList.add("shake"));

        setTimeout(() => {
            letterDivs.forEach(box => box.classList.remove("shake"));
        }, 300);

        decrease = left--;

        attemptsleft.innerText = "You Have " + left + " Chances Left";

        if (left < 1) {
            gameoverpanel.style.display = "flex";
        }
    }
}

function resetKnownWords() {
    localStorage.removeItem("knownWords");
    knownWords.clear();
}

function finishword() {
    resetKnownWords();
}


