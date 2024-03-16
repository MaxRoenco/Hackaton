let quiz = [
    {
        question: "What color is the sky?",
        options: ["Yes", "No"],
        correctAnswer: 0,
    },
    {
        question: "How many noses do you have?",
        options: ["Yes", "No"],
        correctAnswer: 1,
    },
    {
        question: "Your mom Meshmelbek?",
        options: ["Yes", "No"],
        correctAnswer: 0,
    },
    {
        question: "Who am i?",
        options: ["Yes", "No"],
        correctAnswer: 2,
    },
]

let id = (s) => document.getElementById(s);

let btn = id("start");
let menu = id("menu");
let questionSet = id("question-set");
let options = id("options");
let question = id("question");
let results = id("results");
let scoreCounter = id("score");
let categories = id("wrapper_categories");
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

btn.addEventListener("click", (e) => {
    startQuiz();
})

let index = -1;
function nextQuestion() {
    index++;
    if (index >= quiz.length) {
        hide(questionSet);
        showResults();
        return;
    }
    question.textContent = quiz[index].question;
    ops = quiz[index].options;
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
            let isCorrect = quiz[index].correctAnswer == i;
            if (isCorrect) score++;
            nextQuestion();
        })
    });
}

function clearQuestion() {
    question.textContent = '';
    removeAllChildren(options);
}

function startQuiz() {
    hide(menu);
    nextQuestion();
    show(questionSet);
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