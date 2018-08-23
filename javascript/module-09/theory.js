const promise = new Promise((resolve, reject) => {
  let val = Math.random();
  console.log(`0. created promise, value - ${val}`);
  setTimeout(() => {
    if (val > 0.5) {
      // Если все ок, то вызываем resolve и передаем данные
      resolve(`Data passed into resolve function :), value - ${val}`);
    } else {
      // Если что-то не так, вызваем reject и передаем ошибку
      reject(`Error passed into reject function :(, value - ${val}`);
    }
  }, 1000);
});

// выполнится мгновенно
console.log("1. BEFORE promise.then");

let something = promise
  .then(
    // будет вызвана через 2 секунды, если обещание выполнится успешно
    data => {
      console.log("True. INSIDE promise.then - onResolve");
      console.log(data);
      return 'data for second then...';
    }
  )
  .then(
    // будет вызвана через 2 секунды, если обещание выполнится успешно
    data => {
      console.log("True second then:");
      console.log(data)
    }
  )
  .catch(
    error => {
      console.log("False. INSIDE promise.then - onReject");
      console.log(error);
      return 'error for second then...';
    }
  )
  .finally(
    () => console.log('finished!')
  ); // "finished"

// выполнится мгновенно
console.log("2. AFTER promise.then");

const makePromise = (text, delay) =>
  new Promise(resolve => setTimeout(() => resolve(text), delay));
const valPromiseA = Math.random();
const valPromiseB = Math.random();
console.log(`valPromiseA = ${valPromiseA}, valPromiseB = ${valPromiseB}`)
const promiseA = makePromise(`promiseA, value = ${valPromiseA}`, 1000);
const promiseB = makePromise(`promiseB, value = ${valPromiseB}`, 3000);

// выполнится спустя 3 секунды,
// когда выполнится второй промис с задержкой в 3c.
// Первый выполнится через секунду и просто будет готов
Promise.race([promiseA, promiseB])
  .then(result => console.log(result)) //["promiseA", "promiseB"]
  .catch(err => console.log(err));