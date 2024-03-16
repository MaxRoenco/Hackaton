let quiz = {
    history: [
        {
            question: "Did World War II start in 1914?",
            answer: 0, // No
        },
        {
            question: "Did the French Revolution happen in the 18th century?",
            answer: 1, // Yes
        },
        {
            question: "Was Napoleon Bonaparte a Russian czar?",
            answer: 0, // No
        },
        {
            question: "Did the Cold War end in 1991?",
            answer: 1, // Yes
        },
        {
            question: "Did Christopher Columbus discover America in the 16th century?",
            answer: 1, // Yes
        }
    ],
    turism: [
        {
            question: "Is the Eiffel Tower located in London?",
            answer: 0, // No
        },
        {
            question: "Is the Great Wall of China visible from space?",
            answer: 0, // No
        },
        {
            question: "Are kangaroos native to South America?",
            answer: 0, // No
        },
        {
            question: "Is the Statue of Liberty located in New York City?",
            answer: 1, // Yes
        },
        {
            question: "Is Machu Picchu located in Brazil?",
            answer: 0, // No
        }
    ],
    jobs: [
        {
            question: "Is a chef's primary responsibility to perform surgeries?",
            answer: 0, // No
        },
        {
            question: "Is a pilot responsible for driving a train?",
            answer: 0, // No
        },
        {
            question: "Is a carpenter's job to design websites?",
            answer: 0, // No
        },
        {
            question: "Do firefighters extinguish fires?",
            answer: 1, // Yes
        },
        {
            question: "Is a dentist responsible for fixing car engines?",
            answer: 0, // No
        }
    ],
    food: [
        {
            question: "Is sushi a traditional Japanese dish?",
            answer: 1, // Yes
        },
        {
            question: "Do Italians typically eat tacos for breakfast?",
            answer: 0, // No
        },
        {
            question: "Are hamburgers originally from India?",
            answer: 0, // No
        },
        {
            question: "Is tofu a type of meat?",
            answer: 0, // No
        },
        {
            question: "Are avocados commonly used in salads?",
            answer: 1, // Yes
        }
    ],
    culture: [
        {
            question: "Is Bollywood primarily associated with Indian cinema?",
            answer: 1, // Yes
        },
        {
            question: "Is the Oktoberfest celebrated in March?",
            answer: 0, // No
        },
        {
            question: "Is the Mona Lisa a sculpture?",
            answer: 0, // No
        },
        {
            question: "Is Shakespeare known for his contributions to mathematics?",
            answer: 0, // No
        },
        {
            question: "Is K-pop a genre of music from South Korea?",
            answer: 1, // Yes
        }
    ],
    art: [
        {
            question: "Is Vincent van Gogh famous for his paintings?",
            answer: 1, // Yes
        },
        {
            question: "Did Pablo Picasso specialize in architecture?",
            answer: 0, // No
        },
        {
            question: "Is the Mona Lisa a painting by Leonardo da Vinci?",
            answer: 1, // Yes
        },
        {
            question: "Did Michelangelo sculpt the Statue of Liberty?",
            answer: 0, // No
        },
        {
            question: "Is the Starry Night by Claude Monet?",
            answer: 0, // No
        }
    ]
};


let id = (s) => document.getElementById(s);

//menu
let btn = id("start");
btn.addEventListener("click", moveToCategories);

//quiz
let question = id("question");
let yesBtn = id("yes");
let noBtn = id("no");

//categories
let frames = document.querySelectorAll(".category-frame");

// artiom
let finalResult = id("final-score");
let score = 0;
let currentCategory = -1;

//wrong ans
let correctCounter = id("correct_ans_counter");
let wrongCounter = id("wrong_ans_counter");
//correct ans



setActive("menu");
updateScore(0);

let index = -1;
let canClick = true;
function nextQuestion() {
    setTimeout(() => canClick = true, 100); // click delay
    setActive("quiz");
    index++;
    if (index >= quiz[currentCategory].length) {
        showResults();
        index = -1;
        updateScore(0);
        return;
    }
    let questionText = quiz[currentCategory][index].question
    question.textContent = questionText;
    speak(questionText);
    let checkAnswer = ans => {
        if (!canClick) return;
        canClick = false;
        let isCorrect = quiz[currentCategory][index].answer == ans;
        if (isCorrect) {
            updateScore(score+1);
            setActive('correct_answer');
        } else {
            setActive('wrong_answer');
        }
    }

    yesBtn.addEventListener("click", e => checkAnswer(1));
    noBtn.addEventListener("click", e => checkAnswer(0));
}

function moveToCategories() {
    frames.forEach((ele, i) => {
        ele.addEventListener("click", e => {
            let [key, val] = Object.entries(quiz)[i];
            currentCategory = key;
            nextQuestion();
        })
    })
}

function showResults() {
    let goodPercentage = (score / quiz[currentCategory].length) * 100;
    let wrongPercentage = 100 - goodPercentage;

    finalResult.textContent = score + "/" + quiz[currentCategory].length;
    finalResult.style.fontFamily = "PoetsenOne";

    let correctColumn = document.querySelector(".diagram_correct");
    let wrongColumn = document.querySelector(".diagram_wrong");

    correctColumn.style.height = `${goodPercentage}%`;
    wrongColumn.style.height = `${wrongPercentage}%`;
    correctColumn.setAttribute('data-after', `${goodPercentage.toFixed(2)}%`);
    wrongColumn.setAttribute('data-after', `${wrongPercentage.toFixed(2)}%`);

    let root = document.documentElement;
    root.style.setProperty('--correct-height', `${goodPercentage}%`);
    root.style.setProperty('--wrong-height', `${wrongPercentage}%`);
    root.style.setProperty('--correct-content', `"${goodPercentage.toFixed(2)}%"`);
    root.style.setProperty('--wrong-content', `"${wrongPercentage.toFixed(2)}%"`);
    setActive("final_score");
}

function show(ele) {
    ele.style.display = "inherit";
}
function hide(ele) {
    ele.style.display = "none";
}

function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function updateScore(num) {
    score = num;
    correctCounter.textContent = score;
    wrongCounter.textContent = score;
} 

function setActive(tab) {
    let tabs = document.querySelector("body").children;
    Array.from(tabs).forEach(element => {
        if(element.id === tab) {
            show(element);
        } else {
            hide(element);
        }
    });
}

function speak(s) {
    var message = new SpeechSynthesisUtterance();
    message.text = s;
    message.volume = 1; // 0 to 1
    message.rate = 1; // 0.1 to 10
    message.pitch = 1; // 0 to 2
  
    var voices = window.speechSynthesis.getVoices();
    message.voice = voices[0];
  
    window.speechSynthesis.speak(message);
  }