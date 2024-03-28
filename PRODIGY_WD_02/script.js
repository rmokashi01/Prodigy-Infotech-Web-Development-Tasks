let timer;
let startTime;
let elapsedTime = 0;
let laps = [];
let lapCounter = 1;

const display = document.querySelector('.display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.querySelector('.laps');

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  const currentTime = new Date().getTime();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!timer) {
    startTime = new Date().getTime() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
  }
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  elapsedTime = 0;
  display.textContent = formatTime(elapsedTime);
  laps = [];
  lapCounter = 1;
  lapsList.innerHTML = '';
}

function lapTimer() {
  if (timer) {
    laps.push(formatTime(elapsedTime));
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${laps[laps.length - 1]}`;
    lapsList.appendChild(lapItem);
    lapCounter++;
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);
