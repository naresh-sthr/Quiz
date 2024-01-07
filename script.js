let questions = [
    {
        question: "Who developed the C Language ?",
        answers: [
            {text: "Robort Hook", correct: false},
            {text: "Dennis Ritchie", correct: true},
            {text: "Bjarne Stroustrup", correct: false},
            {text: "Charles Babbage", correct: false},
        ]
    },
    {
        question: "Who developed the C++ Language ?",
        answers: [
            {text: "Naresh", correct: false},
            {text: "Dennis Ritchie", correct: false},
            {text: "Bjarne Stroustrup", correct: true},
            {text: "All of these", correct: false},
        ]
    },
    {
        question: "Who is the CEO of Tesla ?",
        answers: [
            {text: "Mukesh Ambani", correct: false},
            {text: "Elon Musk", correct: true},
            {text: "Jack Maa", correct: false},
            {text: "Bill Gates", correct: false},
        ]
    },
    {
        question: "which is the largest desert of world ?",
        answers: [
            {text: "Sahara Desert", correct: true},
            {text: "Amazon", correct: false},
            {text: "Jaisalmer Desert", correct: false},
            {text: "None of these", correct: false},
        ]
    },
];

let question = document.querySelector('#question');
let answerButtons = document.getElementById('quiz-answers');
let nextButton = document.querySelector('.next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    question.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(element=>{
        let button = document.createElement('button');
        button.innerHTML = element.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(element.correct){
            button.dataset.correct = element.correct;
        }
        button.addEventListener('click', selectAnswer);      
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    question.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = 
    "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();

