// Data Kuis
const questions = [
    {
        question: "Apa sila pertama Pancasila?",
        options: ["Ketuhanan Yang Maha Esa", "Kemanusiaan yang Adil dan Beradab", "Persatuan Indonesia", "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan"],
        answer: 0
    },
    {
        question: "Siapa yang merumuskan Pancasila?",
        options: ["Soekarno", "Hatta", "Kartini", "Sutomo"],
        answer: 0
    },
    // Tambahkan lebih banyak pertanyaan
];

let currentQuestion = 0;
let score = 0;
let scores = JSON.parse(localStorage.getItem('scores')) || [];

// Navigasi
document.getElementById('btn-presentasi').addEventListener('click', () => showSection('presentasi'));
document.getElementById('btn-kuis').addEventListener('click', () => { showSection('kuis'); startQuiz(); });
document.getElementById('btn-skor').addEventListener('click', () => { showSection('skor'); displayScores(); });

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

// Presentasi Slide
let currentSlide = 1;
document.querySelectorAll('.next-slide').forEach(btn => btn.addEventListener('click', () => {
    document.getElementById(`slide${currentSlide}`).classList.add('hidden');
    currentSlide++;
    document.getElementById(`slide${currentSlide}`).classList.remove('hidden');
}));
document.querySelectorAll('.prev-slide').forEach(btn => btn.addEventListener('click', () => {
    document.getElementById(`slide${currentSlide}`).classList.add('hidden');
    currentSlide--;
    document.getElementById(`slide${currentSlide}`).classList.remove('hidden');
}));

// Kuis
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        document.getElementById('question').textContent = q.question;
        const optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = '';
        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.addEventListener('click', () => checkAnswer(index));
            optionsDiv.appendChild(btn);
        });
    } else {
        alert(`Kuis selesai! Skor Anda: ${score}`);
        saveScore(score);
    }
}

function checkAnswer(selected) {
    if (selected === questions[currentQuestion].answer) {
        score += 10;
        document.getElementById('correct-sound').play();
    } else {
        document.getElementById('wrong-sound').play();
    }
    document.getElementById('score').textContent = `Skor: ${score}`;
    currentQuestion++;
    loadQuestion();
}

function saveScore(score) {
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));
}

function displayScores() {
    const list = document.getElementById('score-list');
    list.innerHTML = '';
    scores.forEach(s => {
        const li = document.createElement('li');
        li.textContent = `Skor: ${s}`;
        list.appendChild(li);
    });
}
