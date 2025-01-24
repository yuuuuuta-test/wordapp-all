let currentIndex = 0;
let filteredWords = [];
let unknownWords = [];
let isReviewing = false;
let isRandomMode = false;

const setupScreen = document.getElementById("setup-screen");
const appScreen = document.getElementById("app");
const congratsScreen = document.getElementById("congrats-screen");
const reviewBanner = document.getElementById("review-banner");

function filterWords(start, end) {
    return words.filter(word => word["番号"] >= start && word["番号"] <= end);
}

function displayWord(index) {
    const word = filteredWords[index];
    document.getElementById("word-number").textContent = `単語番号: ${word["番号"]}`;
    document.getElementById("word-english").textContent = word["英語"];
    const japaneseElement = document.getElementById("word-japanese");
    japaneseElement.textContent = word["日本語"];
    japaneseElement.style.display = "none";
}

function shuffleWords() {
    for (let i = filteredWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredWords[i], filteredWords[j]] = [filteredWords[j], filteredWords[i]];
    }
}

function shuffleWordsIfRandom() {
    if (isRandomMode) {
        shuffleWords();
    }
}

document.getElementById("next-button").addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= filteredWords.length) {
        if (unknownWords.length > 0) {
            filteredWords = [...unknownWords];
            unknownWords = [];
            currentIndex = 0;
            isReviewing = true;
            reviewBanner.style.display = "block";
            displayWord(currentIndex);
        } else {
            congratsScreen.style.display = "block";
            appScreen.style.display = "none";
            reviewBanner.style.display = "none";
        }
    } else {
        displayWord(currentIndex);
    }
});

document.getElementById("start-button").addEventListener("click", () => {
    const startNumber = parseInt(document.getElementById("start-number").value);
    const endNumber = parseInt(document.getElementById("end-number").value);

    if (startNumber > endNumber || startNumber < 1 || endNumber > 2027) {
        alert("正しい範囲を入力してください！(1-120)");
        return;
    }

    filteredWords = filterWords(startNumber, endNumber);
    if (filteredWords.length === 0) {
        alert("指定範囲に単語が見つかりません。");
        return;
    }

    setupScreen.style.display = "none";
    appScreen.style.display = "block";
    shuffleWordsIfRandom();
    displayWord(currentIndex);
});

document.getElementById("reveal-button").addEventListener("click", () => {
    document.getElementById("word-japanese").style.display = "block";
});

document.getElementById("unknown-button").addEventListener("click", () => {
    if (!unknownWords.includes(filteredWords[currentIndex])) {
        unknownWords.push(filteredWords[currentIndex]);
    }
    document.getElementById("next-button").click();
});

document.getElementById("restart-button").addEventListener("click", () => {
    location.reload();
});

document.getElementById('random-mode-button').addEventListener('click', () => {
    isRandomMode = !isRandomMode;
    const button = document.getElementById('random-mode-button');
    if (isRandomMode) {
        button.classList.add('random-active');
    } else {
        button.classList.remove('random-active');
    }
    shuffleWordsIfRandom();
    displayWord(currentIndex);
});
