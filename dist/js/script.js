const questions = [
    {
            question: "Apa contoh fungsi dari Web Server?",
            answers: [
                { text: "Mengganggu lalu lintas jaringan", correct: false},
                { text: "Membersihkan cache", correct: true},
                { text: "Membatasi akses port ssh", correct: false},
                { text: "Membersihkan user pada server", correct: false},
            ]
    },
    {
            question: "Berikut fitu yang ada pada Web Server, kecuali?",
            answers: [
                { text: "bandwith", correct: false},
                { text: "logging", correct: false},
                { text: "autentikasi", correct: false},
                { text: "remote server", correct: true},
            ]
    },
    {
    
            question: "Siapakah yang menjadi client untuk Web Server?",
            answers: [
                { text: "firewall", correct: false},
                { text: "browser", correct: true},
                { text: "router", correct: false},
                { text: "mobile legend", correct: false},
            ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn-quiz");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Skor anda ${score} / ${questions.length}!`;
    nextButton.innerHTML = "Mulai Lagi";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();