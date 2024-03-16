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
let sound = id("soundContainer");
let soundOn = id("soundImageOn");
let soundOff = id("soundImageOff");
let quizContainer = id("wrapper_quizzez");
let isMuted = false;
let voiceImage = id("voiceImage");
let canRecognise = true;
let recognition;
quizContainer.addEventListener("click", e => {
    console.log("clicked");
    if(!canRecognise) {
        console.log("aborting");
        cancelRecognition();
    } else {
        console.log("starting recognition");
        recognizeSpeech();
    }
})

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


// initialize
setActive("menu");
updateScore(0);
speak("");

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
    if(!isMuted) speak(questionText);
    yesBtn.addEventListener("click", e => checkAnswer(1));
    noBtn.addEventListener("click", e => checkAnswer(0));
}

function checkAnswer (ans) {
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
        console.log("hahaha")
        voiceImage.style.filter = "invert(0)";
    }
}