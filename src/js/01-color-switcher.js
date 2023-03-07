// 1. Напиши скрипт, який після натискання кнопки «Start», раз на секунду 
// змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль.
// 2. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
// 3. Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. 
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).

const bodyRef = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;

const onStartBtnClick = () => {
    timerId = setInterval(() => {
        bodyRef.style.backgroundColor = getRandomHexColor();
        console.log('Changing the background color!');
    }, 1000);

       if (onStartBtnClick) {
        startBtn.setAttribute('disabled', '');
     }
};

startBtn.addEventListener('click', onStartBtnClick);

const onStopBtnClick = () => {
    clearInterval(timerId);
    console.log('Stop changing the color!');

     if (onStopBtnClick) {
        startBtn.removeAttribute('disabled');
     }
};

stopBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
