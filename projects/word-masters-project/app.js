const letters = document.querySelectorAll(".letter");
const letterWrapper = document.querySelectorAll(".letter-wrapper");
const getWordUrl = "https://words.dev-apis.com/word-of-the-day";
const postGuessUrl = "https://words.dev-apis.com/validate-word";

let wordOfTheDay = "";
let current_letter = 0;
let current_word = 0;
let word_builder = "";

function setLoading(isLoading) {
    document.querySelector(".loading-screen").classList.toggle("hidden", !isLoading);
}

function markInvalidWord() {
    for (let i = 0; i < 5; i++) {
        letterWrapper[current_word * 5 + i].classList.remove("invalid");

        setTimeout(
            () => letterWrapper[current_word * 5 + i].classList.add("invalid"), 10
        );
    }
}

async function validateGuess() {
    setLoading(true);
    console.log("do something to show validation");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "word": word_builder
      });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
    const promise = await fetch(postGuessUrl, requestOptions);
    const processedResponse = await promise.json();
    console.log(processedResponse);
    setLoading(false);
    return processedResponse.validWord;
}

function getNextLetterBox(wordNo, letterNo) {
    return letters[(wordNo * 5) + letterNo];
}

function toggleDisabled(num) {
    let myElement = letters[0];
    let count = 0;
    letters.forEach((element) => {
        if (count !== (current_word * 5) + current_letter) {
            element.disabled = true;
        } else {
            element.disabled = false;
            myElement = element;
        }
        count++;
        
    });
    return myElement;
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function handleLetterInput(event) {
    const myLetter = event.key.toLowerCase();
    if (current_letter === 0) {
                
        word_builder += myLetter;
        current_letter++;
    } else if (current_letter !== 5) {
        word_builder += myLetter;
        let enabledInput = toggleDisabled(current_letter);
        enabledInput.focus();
        current_letter++;
    } else {
        event.preventDefault();
    }
}

function handleDelete(element) {
    if (element.textContent == "" && current_letter > 0) {
        current_letter--;
        word_builder = word_builder.slice(0, current_letter);
        let enabledInput = toggleDisabled(current_letter);
        enabledInput.focus();
    }
}

async function handleEnterGuess() {
    let tempBool = await validateGuess();
    // let tempBool = true;
    word_builder = word_builder.toLowerCase();
    if (tempBool) {
        
        let tempObj = {};
        let tempArr = [];
        for(let k = 0; k < 5; k++){
            tempObj[wordOfTheDay[k]] = (tempObj[wordOfTheDay[k]] || 0) + 1;
        }

        console.log(tempObj);

        for(let i = 0; i < 5; i++) {
            if (wordOfTheDay[i] === word_builder[i]) {
                console.log(`${word_builder[i]} is in the right spot`);
                let testMe = document.querySelector(".board-grid").children;
                testMe[(current_word * 5) + i].style.backgroundColor = 'green';
                testMe[(current_word * 5) + i].firstElementChild.style.color = 'white';

                tempObj[word_builder[i]] -= 1;
                tempArr.push(word_builder[i]);
            } 
        }

        for(let j = 0; j < 5; j++) {
            if (wordOfTheDay[j] === word_builder[j]) {
                continue;
            }
            if (wordOfTheDay.includes(word_builder[j]) && word_builder[j] !== wordOfTheDay[j]) {
                if (tempObj[word_builder[j]] > 0){
                    console.log(`${word_builder[j]} is in the wrong spot`);
                    let testMe = document.querySelector(".board-grid").children;
                    testMe[(current_word * 5) + j].style.backgroundColor = 'goldenrod';
                    testMe[(current_word * 5) + j].firstElementChild.style.color = 'white';
                    console.log(testMe[(current_word * 5) + j]);
                    tempObj[word_builder[j]] -= 1;
                } else {
                    console.log(`${word_builder[j]} is not in the word`);
                    let testMe = document.querySelector(".board-grid").children;
                    testMe[(current_word * 5) + j].style.backgroundColor = 'grey';
                    testMe[(current_word * 5) + j].firstElementChild.style.color = 'white';
                }

            } else {
                console.log(`${word_builder[j]} is not in the word`);
                let testMe = document.querySelector(".board-grid").children;
                testMe[(current_word * 5) + j].style.backgroundColor = 'grey';
                testMe[(current_word * 5) + j].firstElementChild.style.color = 'white';
            }
        }
        alert(`the input word is: ${word_builder} and the WOTD is ${wordOfTheDay}`);
        if (word_builder === wordOfTheDay) {
            letters.forEach((element) => {
                element.disabled = true;
            });

            alert("you win!");

            document.querySelector(".brand").classList.toggle("winner", true);

        } else {
            word_builder = "";
    
            current_word++;
            current_letter = 0;
            let enabledInput = toggleDisabled(current_word * 5);
            getNextLetterBox(current_word, current_letter).focus();
        }
    } else {
        markInvalidWord();
    }
}

async function testUrl() {
    setLoading(true);
    const promise = await fetch(getWordUrl);
    const processedResponse = await promise.json();
    console.log(processedResponse);
    wordOfTheDay = processedResponse["word"];
    console.log(wordOfTheDay);
    setLoading(false);
}

letters.forEach(element => {
    element.addEventListener("keydown", function (event) {
        // Check if input is a valid letter.
        if (!isLetter(event.key) && event.key !== "Backspace" && event.key !== "Enter") {
            event.preventDefault();
        } else if (isLetter(event.key)) {
            console.log(current_letter);
            handleLetterInput(event);
            
        } else if (event.key === "Backspace") {
            handleDelete(element);
            
        } else if (event.key === "Enter" && current_letter !== 0 &&  current_letter%5 === 0) {
            console.log("checking input against wordle api...");
            handleEnterGuess();

        }
    
        console.log(event.key);
        console.log(` word: ${word_builder}`);
    });
});

let start_letter = toggleDisabled(current_letter);
start_letter.focus();

testUrl();
