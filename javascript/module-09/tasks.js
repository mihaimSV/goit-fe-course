/* Дополнительное задание 1 

Дан массив цветов и кнопки "Start" и "Stop". Сделайте так, чтобы после
  нажатия кнопки "Start", каждую секунду body менял цвет фона на случайное 
  значение из массива. 

  При нажатии на кнопку "Stop", изменении цвета фона должно останавливаться.
*/
const colors = ['#FFFFFF', '#F44336', '#2196F3', '#4CAF50', '#FF9800', '#009688', '#795548'];

class ColorChenge {
  constructor({ backTag, startBtn, stopBtn, colors }) {
    this.backTag = backTag;
    this.startBtn = startBtn;
    this.stopBtn = stopBtn;
    this.colors = colors;
    this.idInterval = null;
    this.isActive = false;
    this.startBtn.addEventListener('click', this.start.bind(this));
    this.stopBtn.addEventListener('click', this.stop.bind(this));
  }
  start() {
    if (this.isActive) return;
    this.isActive = true;
    this.idInterval = setInterval(
      () => {
        this.backTag.style.backgroundColor =
          this.colors[Math.round(Math.random() * (this.colors.length - 1))];
      }, 1000
    );
  }
  stop() {
    clearInterval(this.idInterval);
    this.isActive = false;
  }
}

new ColorChenge({
  backTag: document.querySelector('.js-color'),
  startBtn: document.querySelector('.js-start'),
  stopBtn: document.querySelector('.js-stop'),
  colors: colors
});

/* Дополнительное задание 2
  Напишите функцию getFormattedTime(time), которая 
  получает time - кол-во миллисекунд и возвращает 
  строку времени в формате xx:xx.x, 01:23.6, минуты:секунды.миллисекунды.
  
  Из миллисекунд нам интересен только разряд с сотнями,
  то есть если сейчас 831мс то нам интересна исключительно цифра 8.
*/

function getFormattedTime(time) {
  const date = new Date(time);
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let seconds = date.getSeconds();
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  const mseconds = String(date.getMilliseconds()).slice(0, 1);
  return `${minutes}:${seconds}.${mseconds}`;
}

const tagTask2 = document.querySelector('.js-time');
console.log(
  getFormattedTime(1523621052858)
); // 04:12.8
tagTask2.insertAdjacentHTML(
  'beforeend',
  `<div class="console">getFormattedTime(1523621052858): ${getFormattedTime(1523621052858)} // 04:12.8</div>`
);

console.log(
  getFormattedTime(1523621161159)
); // 06:01.1
tagTask2.insertAdjacentHTML(
  'beforeend',
  `<div class="console">getFormattedTime(1523621161159): ${getFormattedTime(1523621161159)} // 06:01.1</div>`
);
console.log(
  getFormattedTime(1523621244239)
); // 07:24.2
tagTask2.insertAdjacentHTML(
  'beforeend',
  `<div class="console">getFormattedTime(1523621244239): ${getFormattedTime(1523621244239)} // 07:24.2</div>`
);

/* Дополнительное задание 3
  Напишите скрипт, реализующий базовый функционал таймера, запуск отсчета времени и сброс счетчика в исходное состояние.
    Создайте функцию startTimer, которая будет запускать отсчет времени с момента ее нажатия, она вызывается при клике на кнопку с классом js-timer-start.
    Создайте функцию stopTimer, которая будет останавливать счетчик, она вызывается при клике на кнопку с классом js-timer-stop.
    Используйте вспомогательную функцию updateClockface которая обновляет значение счетчика в интерфейсе. 
  Для составления строки времени в формате xx:xx.x, исользуйте функцию getFormattedTime из задания номер 1.
    Подсказка: так как нам интересны исключительно сотни миллисекунд, нет смысла выполнять пересчет времени чаще чем каждые 100мс.
*/

const clockface = document.querySelector(".js-clockface");
const startBtn = document.querySelector(".js-timer-start");
const stopBtn = document.querySelector(".js-timer-stop");

class Timer {
  constructor({ clockface, startBtn, stopBtn }) {
    this.clockface = clockface;
    this.startBtn = startBtn;
    this.stopBtn = stopBtn;
    this.id = null;
    this.startTime = null;
    this.deltaTime = 0;
    this.isActive = false;
    this.startBtn.addEventListener('click', this.handleStartBtnClick.bind(this));
    this.stopBtn.addEventListener('click', this.handleStopBtnClick.bind(this));
  };
  formatTime(ms) {
    const date = new Date(ms);
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let seconds = date.getSeconds();
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    const mseconds = String(date.getMilliseconds()).slice(0, 1);
    return `${minutes}:${seconds}.${mseconds}`;
  };
  start() {
    if (this.isActive) return;
    this.isActive = true;
    this.startTime = Date.now() - this.deltaTime;
    this.id = setInterval(() => {
      const currentTime = Date.now();
      this.deltaTime = currentTime - this.startTime;
      this.clockface.textContent = this.formatTime(this.deltaTime);
    }, 100);
  };
  stop() {
    clearInterval(this.id);
    this.isActive = false;
  };
  reset() {
    this.stop();
    this.deltaTime = 0;
    this.clockface.textContent = this.formatTime(this.deltaTime);
  };
  handleStartBtnClick() {
    if (!this.isActive) {
      this.start();
      this.startBtn.textContent = 'Pause';
    } else {
      this.stop();
      this.startBtn.textContent = 'Continue';
    }
  };
  handleStopBtnClick() {
    this.reset();
    this.startBtn.textContent = 'Start';
  };
};

new Timer({
  clockface: clockface,
  startBtn: startBtn,
  stopBtn: stopBtn
});

/* Дополнительное задание 4
  Напишите скрипт работы магазина со складом товаров.
  
  Есть переменная goodsAmount хранящиая в себе текущее количество единиц какого-то товара на складе.
  
  Напишите функцию processOrder(amount), получающую кол-во товаров заказанных покупателем, и возвращающую промис.
    Для имитации проверки достаточного количества товаров на складе используйте setTimeout с delay 500мс.
    Если на складе товаров больше либо равно заказанному количеству, "верните" строку - "Ваш заказ готов!".
    В противном случае - "К сожалению на складе не достаточно товаров!".
    Если же пользователь ввел не число, то выдайте ошибку "Некоректный ввод!"  
*/

class Goods {
  constructor({ goodsAmount, DELAY, tagElem }) {
    this.goodsAmount = goodsAmount;
    this.DELAY = DELAY;
    this.tagElem = tagElem;
    this.orders = [];
    this.tagElem.insertAdjacentHTML(
      'beforeend',
      `<div class="console">We have ${this.goodsAmount} units of goods for start.`
    );
  }
  printOrder({ id, amount, stat }) {
    this.tagElem.insertAdjacentHTML(
      'beforeend',
      `<div class="console">Order ${id} for ${amount} units of goods is ${stat}`
    );
  }
  processOrder(amount) {
    return new Promise((resolve, reject) => {
      let currentOrder = {
        id: (this.orders.length + 1),
        amount: amount
      };
      if (Number.isNaN(Number(amount))) {
        currentOrder.stat = 'error';
        this.orders.push(currentOrder);
        this.printOrder(this.orders[currentOrder.id - 1]);
        reject(`Некоректный ввод! "${amount}" - не число.`);
      } else {
        currentOrder.stat = 'start';
        this.orders.push(currentOrder);
        this.printOrder(this.orders[currentOrder.id - 1]);
        setTimeout(() => {
          let amountNum = Number(amount);
          if (amountNum > this.goodsAmount) {
            this.orders[currentOrder.id - 1].stat = 'rejected';
            this.printOrder(this.orders[currentOrder.id - 1]);
            resolve(`К сожалению на складе недостаточно товаров! Осталось всего ${this.goodsAmount} единиц.`);
          } else {
            this.goodsAmount -= amountNum;
            this.orders[currentOrder.id - 1].stat = 'fulfilled';
            this.printOrder(this.orders[currentOrder.id - 1]);
            resolve(`Ваш заказ (${amountNum} единиц) готов! Осталось еще ${this.goodsAmount} единиц.`);
          }
        }, this.DELAY);
      };
    });
  }
}

const DELAY = 1000;
let goodsAmount = 100;

const books = new Goods({
  goodsAmount: goodsAmount,
  DELAY: DELAY,
  tagElem: document.querySelector('.js-promise')
});
// Вызовы функции для проверки
books.processOrder(50)
  .then(x => console.log(x)) // Ваш заказ готов!
  .catch(err => console.log(err));

books.processOrder(50)
  .then(x => console.log(x)) // Ваш заказ готов!
  .catch(err => console.log(err));

books.processOrder(50)
  .then(x => console.log(x)) // К сожалению на складе недостаточно товаров!
  .catch(err => console.log(err));

books.processOrder("qwe")
  .then(x => console.log(x))
  .catch(err => console.log(err)); // Некоректный ввод!