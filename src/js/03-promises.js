// 1. Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) 
// стільки разів, скільки ввели в поле amount.Під час кожного виклику передай їй номер
// промісу(position), що створюється, і затримку, враховуючи першу затримку(delay),
// введену користувачем, і крок(step).
// 2. Доповни код функції createPromise таким чином, щоб вона повертала один проміс,
// який виконується або відхиляється через delay часу.Значенням промісу повинен бути 
// об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів. 
// Використовуй початковий код функції для вибору того, що потрібно зробити з промісом -
// виконати або відхилити.
// 3. Для відображення повідомлень користувачеві, використовуй бібліотеку notiflix.

import Notiflix from 'notiflix';

// const refs = {
// form: document.querySelector('.form'),
// inputDelay: document.querySelector('input[name="delay"]'),
// inputStep: document.querySelector('input[name="step"]'),
// inputAmount: document.querySelector('input[name="amount"]'),
// };

const formRef = document.querySelector('.form');

// refs.form.addEventListener('submit', onFormSubmit);

formRef.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  });
};

function onFormSubmit(evt) {
  evt.preventDefault();

  // let delay = Number(refs.inputDelay.value);
  // let step = Number(refs.inputStep.value);
  // let amount = Number(refs.inputAmount.value);

  let delay = Number(evt.currentTarget.delay.value);
  let step = Number(evt.currentTarget.step.value);
  let amount = Number(evt.currentTarget.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
    delay += step;
  };
  evt.currentTarget.reset();
};

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
