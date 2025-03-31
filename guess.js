const gameData = {
    "JAVASCRIPT": "A popular programming language used for web development.",
    "CSS": "A stylesheet language used to describe the presentation of a web page.",
    "HTML": "The standard markup language for creating web pages.",
    "PYTHON": "A high-level programming language often used for data analysis and web development.",
    "REACT": "A JavaScript library used for building user interfaces, especially for single-page applications.",
    "DATABASE": "A structured collection of data stored and accessed electronically.",
    "ALGORITHM": "A set of instructions designed to perform a specific task or solve a problem.",
    "GITHUB": "A platform for version control and collaboration, mainly used for code repositories.",
    "MACHINELEARNING": "A subset of AI where systems learn from data to improve over time.",
    "ARTIFICIALINTELLIGENCE": "The simulation of human intelligence in machines to perform tasks like reasoning and problem-solving."
};

let gameplace = document.getElementById("gameplace");
let gameword = "";
let leftspan = document.getElementById("leftspan");
let hint = document.getElementById("hint");
let left = 3;
let decrease;
let wordcount = 0;


const gamewordlist = Object.keys(gameData);
const randomIndex = Math.floor(Math.random() * gamewordlist.length);
gameword = gamewordlist[randomIndex];

let gamewordos = gameword.split("");
let gamewordoscount = gameword.split("").length;

wordcount = gamewordoscount;

hint.innerText = gameData[gameword];

console.log("Selected word:", gameword);
console.log("Hint:", gameData[gameword]);

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


let letterDivs = document.querySelectorAll(".letterbox");

document.getElementById("wordinput").addEventListener("input", function() {
    this.value = this.value.toUpperCase();
  });

  document.getElementById("wordinput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {  // Enter tuşuna basıldıysa
        let guess = document.getElementById("wordinput").value.toUpperCase(); // Kullanıcının tahminini al
        updateWordDisplay(guess); // Doğru tahminleri güncelle
        document.getElementById("wordinput").value = "";
    }
  });

document.getElementById("submitwordo").addEventListener("click", checkLetter);

function checkLetter() {
    let guess = document.getElementById("wordinput").value.toUpperCase(); // Kullanıcının girdiği harfi al ve büyük harfe çevir
    updateWordDisplay(guess);
    document.getElementById("wordinput").value = "";
}

function updateWordDisplay(guess) {

    let correctGuess = false;

    for (let i = 0; i < gamewordos.length; i++) {
        if (gamewordos[i] === guess) {
            let pTag = letterDivs[i].querySelector("p"); // İlgili div içinde p etiketini seç
            pTag.textContent = guess; // Doğru tahmin edilen harfi p etiketine ekle
            correctGuess = true;
        }
    }

    if (!correctGuess) {
        let inputBox = document.getElementById("wordinput"); // Input alanını seç
        inputBox.style.border = "2px solid red"; // Kırmızı çerçeve ekle

        setTimeout(function() {
            inputBox.style.border = ""; // 2 saniye sonra çerçeveyi kaldır
        }, 2000);

         // Eğer yanlış tahmin yapıldıysa, tüm letterBox div'lerini salla
         letterDivs.forEach(box => box.classList.add("shake"));

         setTimeout(() => {
             letterDivs.forEach(box => box.classList.remove("shake")); // 0.3sn sonra kaldır
         }, 300);

         decrease = left--;

         leftspan.innerText = "You Have " + left + " Chances Left";
         
         if(left < 1){
            alert("Game Over");
         }
    }

}