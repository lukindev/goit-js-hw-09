import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
      countdownToDate = selectedDate;
      updateTimer();
    }
  },
};

const startButton = document.querySelector('[data-start]');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let countdownToDate = new Date();
let intervalId = null;

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => {
  intervalId = setInterval(updateTimer, 1000);
  startButton.disabled = true;
  updateTimer();
});

function updateTimer() {
  const timeDifference = countdownToDate - new Date();

  if (timeDifference <= 0) {
    clearInterval(intervalId);
    startButton.disabled = false;
    updateFields({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  } else {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateFields({ days, hours, minutes, seconds });
  }
}

function updateFields({ days, hours, minutes, seconds }) {
  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
