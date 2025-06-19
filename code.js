let isTracking = false;
let startTime = 0;
let elapsedTime = 0;
let interval;

document.getElementById("start-stop-btn").addEventListener("click", toggleTracking);

function toggleTracking() {
  if (isTracking) {
    clearInterval(interval);
    updateTotalTime(elapsedTime);
    document.getElementById("start-stop-btn").textContent = "Start";
  } else {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTimeDisplay, 1000);
    document.getElementById("start-stop-btn").textContent = "Stop";
  }
  isTracking = !isTracking;
}

function updateTimeDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const timeString = formatTime(elapsedTime);
  document.getElementById("time-display").textContent = timeString;
}

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
}

function pad(num) {
  return num < 10 ? `0${num}` : num;
}

function updateTotalTime(ms) {
  const totalTime = localStorage.getItem("totalTime") || 0;
  const newTotalTime = parseInt(totalTime) + ms;
  localStorage.setItem("totalTime", newTotalTime);
  document.getElementById("total-time").textContent = formatTime(newTotalTime);
}

window.onload = () => {
  const storedTotalTime = localStorage.getItem("totalTime") || 0;
  document.getElementById("total-time").textContent = formatTime(storedTotalTime);
};
