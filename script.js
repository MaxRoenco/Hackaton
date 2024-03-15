let quiz = [
    {
        question: "What color is the sky?",
        options: ["blue", "red", "mom"],
        correctAnswer: 0,
    },
    {
        question: "How many noses do you have?",
        options: ["two", "one", "yes"],
        correctAnswer: 1,
    },
    {
        question: "Your mom fat?",
        options: ["Yes", "For sure", "Of course"],
        correctAnswer: 0,
    },
    {
        question: "Who are you?",
        options: ["idk", "I am me", "Yes"],
        correctAnswer: 2,
    },
]

let id = (s)=>document.getElementById(s);

let btn = id("start");
let menu = id("menu");
let questionSet = id("question-set");
let options = id("options");
let question = id("question");
let results = id("results");
let scoreCounter = id("score");

let score = 0;

hide(questionSet);
hide(results);

btn.addEventListener("click", (e)=>{
    startQuiz();
})

let index = -1;
function nextQuestion() {
    index++;
    if(index >= quiz.length) {
        hide(questionSet);
        showResults();
        return;
    }
    question.textContent = quiz[index].question;
    ops = quiz[index].options;
    ops.forEach((element, i) => {
        let button = document.createElement("button");
        button.classList.add("button-59");
        button.textContent = element;
        options.append(button);
        button.addEventListener("click", (e)=>{
            clearQuestion();
            let isCorrect = quiz[index].correctAnswer == i;
            if(isCorrect) score++;
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
    scoreCounter.textContent = "You got " + score + "/" + quiz.length;
    show(results);
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

