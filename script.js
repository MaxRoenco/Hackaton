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
let menu = id("menu");

//quiz
let questionSet = id("question-set");
let options = id("options");
let question = id("question");

//results
let results = id("results");
let scoreCounter = id("score");

//categories
let categories = id("categories");
let frames = document.querySelectorAll(".category-frame");

//artiom
let finalscore = id("final__score");
let wrongans = id("wrong__answer");
let correctans = id("correct__answer");
let profileStatistics = id("profile__statistics");

// artiom
let finalResult = id("final-score");
let score = 0;

// hide(menu);
hide(questionSet);
hide(results);
hide(categories);
hide(finalscore); 
hide(wrongans);
hide(correctans);
hide(profileStatistics);

btn.addEventListener("click", moveToCategories);

let index = -1;
function nextQuestion(c) {
    index++;
    if (index >= quiz[c].length) {
        hide(questionSet);
        showResults();
        return;
    }
    question.textContent = quiz[c][index].question;
    let yesBtn = document.createElement("button");
    let noBtn = document.createElement("button");
    yesBtn.style.style.backgroundColor = "#45D12E";
    noBtn.style.backgroundColor = "#D12E2E";
    
    
    ops.forEach((element, i) => {
        let button = document.createElement("button");
        button.classList.add("quizz_btn");

        if (element === "Yes") {
            button.style.backgroundColor = "#45D12E";
        } else if (element === "No") {
            button.style.backgroundColor = "#D12E2E";
        }
        
        button.textContent = element;
        options.append(button);
        button.addEventListener("click", (e) => {
            clearQuestion();
            let isCorrect = quiz[c][index].correctAnswer == i;
            if (isCorrect) score++;
            nextQuestion();
        })
    });
}

function clearQuestion() {
    question.textContent = '';
    removeAllChildren(options);
}

function moveToCategories() {
    hide(menu);
    show(categories);
    frames.forEach((ele, i) => {
        ele.addEventListener("click", e => {
            let [key, val] = Object.entries(quiz)[i];
            startQuiz(key);
        })
    })
}

function startQuiz(cat) {
    hide(categories);
    nextQuestion(cat);
}

function showResults() {
    let goodPercentage = (score / quiz.length) * 100;
    let wrongPercentage = 100 - goodPercentage;


    finalResult.textContent = score + "/" + quiz.length;
    finalResult.style.fontFamily = "PoetsenOne";

    let correctColumn = document.querySelector(".diagram__correct");
    let wrongColumn = document.querySelector(".diagram__wrong");

    correctColumn.style.height = `${goodPercentage}%`;
    wrongColumn.style.height = `${wrongPercentage}%`;
    correctColumn.setAttribute('data-after', `${goodPercentage.toFixed(2)}%`);
    wrongColumn.setAttribute('data-after', `${wrongPercentage.toFixed(2)}%`);
    
    let root = document.documentElement;
    root.style.setProperty('--correct-height', `${goodPercentage}%`);
    root.style.setProperty('--wrong-height', `${wrongPercentage}%`);
    root.style.setProperty('--correct-content', `"${goodPercentage.toFixed(2)}%"`);
    root.style.setProperty('--wrong-content', `"${wrongPercentage.toFixed(2)}%"`);
    
    show(finalscore);
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