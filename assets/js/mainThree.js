let word = "";
let hiddenWord = [];
let wrongLetters = [];
const hangmanBodyParts = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg"];

const hiddenWordDisplay = document.querySelector("#hiddenWord");
const wrongLettersDisplay = document.querySelector("#wrongLetters");
const resultDisplay = document.querySelector("#result");

// Liste de mots français (pour éviter les problèmes d'API)
const frenchWords = [
    "ordinateur", "telephone", "maison", "jardin", "soleil", "musique", "voyage", "livre",
    "ecole", "famille", "ami", "bonheur", "nature", "ocean", "montagne", "cuisine",
    "voiture", "train", "avion", "bateau", "cheval", "chien", "chat", "oiseau",
    "fleur", "arbre", "fruit", "legume", "chocolat", "cafe", "the", "eau"
];

// Récup un mot aléatoire depuis l'API ou utiliser la liste locale
async function fetchWord() {
    try {
        const response = await fetch("https://random-word-api.herokuapp.com/word?lang=fr");
        const data = await response.json();
        word = data[0]; // L'API retourne un tableau avec un seul mot
    } catch (error) {
        // En cas de problème avec l'API, utiliser un mot de la liste locale
        console.log("Problème avec l'API, utilisation d'un mot local");
        word = getRandomWordFromList();
    }
    startGame();
}

// Récup un mot aléatoire de la liste locale
function getRandomWordFromList() {
    const randomIndex = Math.floor(Math.random() * frenchWords.length);
    return frenchWords[randomIndex];
}

// Le jeu commence avec un nouveau mot
function startGame() {
    hiddenWord = word.split("").map(() => "_"); //split : divise une chaîne de caractères en une liste ordonnée de sous-chaînes, place ces sous-chaînes dans un tableau et retourne le tableau.
    //map : crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
    wrongLetters = [];
    updateUI();
}

// MAJ l'interface
function updateUI() {
    hiddenWordDisplay.textContent = hiddenWord.join(" ");
    wrongLettersDisplay.textContent = wrongLetters.length > 0 ? 
        "Lettres incorrectes : " + wrongLetters.join(", ") : "";
}

// Lettre proposée + conséquences
function proposedLetter(letter) {
    if (word.includes(letter)) {
        // Affiche la lettre correcte dans le mot caché
        hiddenWord = hiddenWord.map((char, index) => (word[index] === letter ? letter : char));
    } else {
        // Lettre incorrecte sur l'écran si elle n'a pas déjà été ajoutée
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            revealHangmanPart(wrongLetters.length);
        }
    }

    updateUI();
    checkGameStatus();
}

// Affiche une partie du pendu
function revealHangmanPart(index) {
    if (index <= hangmanBodyParts.length) {
        const part = document.querySelector("#" + hangmanBodyParts[index - 1]);
        if (part) {
            part.style.display = "inline";
        }
    }
}

// Voir si gagné ou perdu
function checkGameStatus() {
    if (hiddenWord.join("") === word) {
        resultDisplay.textContent = "🎉 Félicitations! Tu as gagné! 🎉";
        resultDisplay.style.color = "#27ae60";
        disableAllButtons();
    } else if (wrongLetters.length >= hangmanBodyParts.length) {
        resultDisplay.textContent = `💀 Dommage! Tu as perdu! Le mot était : ${word} 💀`;
        resultDisplay.style.color = "#e74c3c";
        disableAllButtons();
    }
}

// Désactiver tous les boutons à la fin du jeu
function disableAllButtons() {
    document.querySelectorAll(".alphabetBtn").forEach(button => {
        button.disabled = true;
    });
}

// Les clics sur les boutons de l'alphabet
document.querySelectorAll(".alphabetBtn").forEach(button => {
    button.addEventListener("click", () => {
        proposedLetter(button.value);
        button.disabled = true;
    });
});

// Redémarre le jeu
document.querySelector("#restartBtn").addEventListener("click", () => {
    // Un nouveau mot depuis l'API
    fetchWord();

    // Affichage du pendu vide (cacher toutes les parties du corps)
    hangmanBodyParts.forEach(part => {
        const element = document.querySelector("#" + part);
        if (element) {
            element.style.display = "none";
        }
    });

    // Les boutons de l'alphabet réactivés
    document.querySelectorAll(".alphabetBtn").forEach(button => {
        button.disabled = false;
    });

    resultDisplay.textContent = "";
    resultDisplay.style.color = "#2c3e50";
});

// Pour avoir un mot dès le démarrage
fetchWord();