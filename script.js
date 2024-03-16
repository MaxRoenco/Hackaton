let quiz = {};
fetch('https://65f5f30b41d90c1c5e0a6f6a.mockapi.io/quiz/quiz')
  .then(response => response.json())
  .then(data => {
    // Assuming the response data has been assigned to the variable "quiz"
    quiz = data[0];
    // Now you can work with the "quiz" variable as needed
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });   

let id = (s) => document.getElementById(s);

//quiz
let question = id("question");
let yesBtn = id("yes");
let noBtn = id("no");
let sound = id("soundContainer");
let soundOn = id("soundImageOn");
let soundOff = id("soundImageOff");
let quizContainer = id("wrapper_quizzez");
let isMuted = false;
let voiceImage = id("voiceImage");
let canRecognise = true;
let recognition;
quizContainer.addEventListener("click", e => {
    if(!canRecognise) {
        cancelRecognition();
    } else {
        recognizeSpeech();
    }
})

//categories
let frames = document.querySelectorAll(".category-frame");
frames.forEach((ele, i) => {
    ele.addEventListener("click", e => {
        let key = Object.keys(quiz)[i];
        currentCategory = key;
        nextQuestion();
    })
})

// artiom
let finalResult = id("final-score");
let score = 0;
let currentCategory = -1;

//wrong ans
let correctCounter = id("correct_ans_counter");
//correct ans
let wrongCounter = id("wrong_ans_counter");

//profile stats
let correctCountElement = id("profilecorrect_counter");
let wrongCountElement = id("profilewrong_counter");
let quizCountElement = id("profilequizz_done");


// initialize
window.onload = function() {
    let body = document.body;
    body.style.opacity = "1";
};
setActive("menu");
updateScore(0);
speak("");
let wrongAnswers  = +localStorage.getItem('wrongAnswers') || 0;
let correctAnswers = +localStorage.getItem('correctAnswers') || 0;
let quizzesDone = +localStorage.getItem('quizzesDone') || 0;

updateCorrectCount(correctAnswers);
updateWrongCount(wrongAnswers);
updateQuizzesCount(quizzesDone);

let index = -1;
let canClick = true;
function nextQuestion() {
    setTimeout(() => canClick = true, 100); // click delay
    setActive("quiz");
    index++;
    if (index >= quiz[currentCategory].length) {
        index = -1;
        showResults();
        updateScore(0);
        return;
    }
    let questionText = quiz[currentCategory][index].question
    question.textContent = questionText;
    if(!isMuted) speak(questionText);
    yesBtn.addEventListener("click", e => checkAnswer(1));
    noBtn.addEventListener("click", e => checkAnswer(0));
}

function checkAnswer (ans) {
    if (!canClick) return;
    stopSpeech();
    canClick = false;
    let isCorrect = quiz[currentCategory][index].answer == ans;
    if (isCorrect) {
        updateScore(score+1);
        updateCorrectCount(correctAnswers+1);
        setActive('correct_answer');
        playSound("./assets/audio/correct.mp3");
    } else {
        updateWrongCount(wrongAnswers+1);
        setActive('wrong_answer');
        playSound("./assets/audio/wrong.mp3");
    }
}

function showResults() {
    updateQuizzesCount(quizzesDone+1);
    playSound("./assets/audio/results.mp3");
    let goodPercentage = (score / quiz[currentCategory].length) * 100;
    let wrongPercentage = 100 - goodPercentage;

    finalResult.textContent = score + "/" + quiz[currentCategory].length;
    finalResult.style.fontFamily = "PoetsenOne";

    let correctColumn = document.querySelector(".barCorrect");
    let wrongColumn = document.querySelector(".barWrong");

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

function speak(text) {
    // Check if the browser supports speech synthesis
    if ('speechSynthesis' in window) {
        // Create a new instance of SpeechSynthesisUtterance
        var msg = new SpeechSynthesisUtterance();
        
        // Set the text to be spoken
        msg.text = text;
        
        // Filter voices to include only English voices
        var englishVoices = speechSynthesis.getVoices().filter(function(voice) {
            return voice.lang.startsWith('en');
        });
        
        // Set the voice to the first English voice found
        msg.voice = englishVoices[0];
        
        // Speak the text
        speechSynthesis.speak(msg);
    } else {
        console.error("Sorry, your browser doesn't support text-to-speech!");
    }
}


function toggleSound() {
    isMuted = !isMuted;
    if(isMuted) {
        stopSpeech();
        hide(soundOn);
        show(soundOff);
    } else {
        hide(soundOff);
        show(soundOn);
    }
}

function stopSpeech() {
    window.speechSynthesis.cancel();
}

function recognizeSpeech() {
    if(!canRecognise) return;
    canRecognise = false;
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        
        recognition.start();
        
        // Display "Recording now..." message while listening
        // document.getElementById('status').innerText = 'Recording now...';
        voiceImage.style.filter = "invert(1)";

        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            // alert('Speech Recognition Result: ' + transcript);
            if(transcript.trim().toLowerCase() === 'yes') {
                checkAnswer(1);
            } else if(transcript.trim().toLowerCase() === 'no') {
                checkAnswer(0);
            } else {
                if(!isMuted) speak("Sorry, can you repeat that?");
            }
        };
        recognition.onerror = function(event) {
            console.error('Speech Recognition Error:', event.error);
            if(!isMuted && event.error === 'no-speech') speak("Sorry, can you repeat that?");
        };
        // Reset the status message when recognition ends
        recognition.onend = function() {
            voiceImage.style.filter = "invert(0)";
            setTimeout(() => {
                canRecognise = true;
            }, 100);
        };
    } else {
        if(!isMuted) speak("Sorry, your browser doesn't support speech recognition!");
    }
}

function cancelRecognition() {
    if (recognition) {
        recognition.abort();
        voiceImage.style.filter = "invert(0)";
    }
}

function updateWrongCount(num) {
    wrongAnswers = num;
    localStorage.setItem('wrongAnswers', num);
    wrongCountElement.textContent = num;
}

function updateCorrectCount(num) {
    correctAnswers = num;
    localStorage.setItem('correctAnswers', num);
    correctCountElement.textContent = num;
}

function updateQuizzesCount(num) {
    quizzesDone = num;
    localStorage.setItem('quizzesDone', num);
    quizCountElement.textContent = num;
}

function resetStats() {
    updateCorrectCount(0);
    updateWrongCount(0);
    updateQuizzesCount(0);
}

function playSound(path) {
  var audio = new Audio(path);
  audio.play();
}