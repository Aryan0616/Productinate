let workTime = 25;
let restTime = 5;  
let currentPhase = "work";
let timeRemaining = workTime * 60; 
let timerInterval = 2;



const timerDisplay = document.getElementById("timer-display");
const timerLabel = document.getElementById("timer-label");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const workTimeInput = document.getElementById("work-time");
const restTimeInput = document.getElementById("rest-time");


function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
}


function switchPhase() {
    clearInterval(timerInterval); 
    
    if (currentPhase === "work") {
        currentPhase = "rest";
        timeRemaining = restTime * 60;
        timerLabel.textContent = "Rest Time";
        startTimer(); 
    } else {
        currentPhase = "work";
        timeRemaining = workTime * 60;
        timerLabel.textContent = "Work Time";
        resetBtn.disabled = false; 
    }
    updateTimerDisplay();
}


function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            timeRemaining--;

            if (timeRemaining <= 0) {
                
                switchPhase(); 
            }

            updateTimerDisplay();
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

    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
}


function initializeCustomValues() {
    workTime = parseInt(workTimeInput.value, 10) || 25;
    restTime = parseInt(restTimeInput.value, 10) || 5;
    resetTimer();
}


startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
workTimeInput.addEventListener("change", initializeCustomValues);
restTimeInput.addEventListener("change", initializeCustomValues);


resetTimer();
