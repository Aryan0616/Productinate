let workTime = 25;
let restTime = 5;
let currentPhase = "work";
let timeRemaining = workTime * 60;
let timerInterval = null;

const timerDisplay = document.getElementById("timer-display");
const timerLabel = document.getElementById("timer-label");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const workTimeInput = document.getElementById("work-time");
const restTimeInput = document.getElementById("rest-time");
const progressCircle = document.getElementById("progress-circle");

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateProgressCircle() {
    const totalTime = currentPhase === "work" ? workTime * 60 : restTime * 60;
    const progress = ((totalTime - timeRemaining) / totalTime) * 100;

    
    progressCircle.style.background = `conic-gradient(
        #4caf50 ${progress}%,   /* Green for progress */
        #ffffff ${progress}%    /* White for remaining */
    )`;
}

function switchPhase() {
    clearInterval(timerInterval);
    currentPhase = currentPhase === "work" ? "rest" : "work";
    timeRemaining = currentPhase === "work" ? workTime * 60 : restTime * 60;
    timerLabel.textContent = currentPhase === "work" ? "Work Time" : "Rest Time";
    updateTimerDisplay();
    updateProgressCircle();
    startTimer();
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            timeRemaining--;
            if (timeRemaining <= 0) switchPhase();
            updateTimerDisplay();
            updateProgressCircle();
        }, 1000);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    currentPhase = "work";
    workTime = parseInt(workTimeInput.value, 10) || 25;
    restTime = parseInt(restTimeInput.value, 10) || 5;
    timeRemaining = workTime * 60;
    timerLabel.textContent = "Work Time";
    updateTimerDisplay();
    updateProgressCircle();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
workTimeInput.addEventListener("change", resetTimer);
restTimeInput.addEventListener("change", resetTimer);

resetTimer();


