function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

let intervalId = null;

function toggleButtonsState(isRunning) {
  startButton.disabled = isRunning;
  stopButton.disabled = !isRunning;
}

startButton.addEventListener('click', () => {
  if (intervalId) {
    return; // Защита от множественных запусков
  }

  toggleButtonsState(true);
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  toggleButtonsState(false);
});
