import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import '../css/02-timer.css';

const inputRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

let selectedDate = null;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        startBtnRef.setAttribute('disabled', '');
        selectedDate = selectedDates[0].getTime();

        if (selectedDates[0] <= new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            startBtnRef.removeAttribute('disabled');
            Notiflix.Notify.success('Сonditions are met, select a date and the countdown will start immediately', {
                timeout: 3000,
            },
            );
        }
        return selectedDate;
    },
};

flatpickr(inputRef, options);

startBtnRef.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {

    timerId = setInterval(() => {
        const currentTime = new Date().getTime();
        const deltaTime = selectedDate - currentTime;

        if (deltaTime > 0) {
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
            daysRef.textContent = addLeadingZero(days);
            hoursRef.textContent = addLeadingZero(hours);
            minutesRef.textContent = addLeadingZero(minutes);
            secondsRef.textContent = addLeadingZero(seconds);
        } else {
            clearInterval(timerId);
        }
        }, 1000);
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};