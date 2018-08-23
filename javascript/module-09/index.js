// Модуль 9 - Домашнее задание
/*
  Создайте скрипт секундомера.  
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/
  
  Добавьте следующий функционал:
  
  - При нажатии на кнопку button.js-start, запускается таймер, который считает время со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).
   🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал достаточно повторять не чаще чем 1 раз в 100 мс.
    
  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', а функционал при клике превращается в оставновку секундомера без сброса значений времени.
   🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.
  
  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 
   🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его при рассчете текущего времени после возобновления таймера отнимая это значение от времени запуска таймера.
    
  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x

  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Выполните домашнее задание используя класс с полями и методами.
  
  На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет динамически создана вся разметка для секундомера.
  Должна быть возможность создать сколько угодно экземпляров секундоментов на странице и все они будут работать независимо.
  К примеру:
    new Stopwatch(parentA);
    new Stopwatch(parentB);
    new Stopwatch(parentC);
  Где parent* это существующий DOM-узел. 
*/

const firstWrap = document.querySelector('.js-stopwatch[data-clock="first"]');
const secondWrap = document.querySelector('.js-stopwatch[data-clock="second"]');
const thirdWrap = document.querySelector('.js-stopwatch[data-clock="third"]');

class Stopwatch {
  constructor(wrapTime) {
    this.wrapTime = wrapTime;
    this.wrapTime.insertAdjacentHTML(
      'beforeend',
      `<div class="stopwatch">
            <p class="time js-timer">00:00.0</p>
            <button class="btn js-start">Start</button>
            <button class="btn js-take-lap">Lap</button>
            <button class="btn js-reset">Reset</button>
        </div>
        <ul class="laps js-laps"></ul>`
    );
    this.clockface = this.wrapTime.querySelector('.js-timer');
    this.startBtn = this.wrapTime.querySelector('.js-start');
    this.stopBtn = this.wrapTime.querySelector('.js-reset');
    this.lapBtn = this.wrapTime.querySelector('.js-take-lap');
    this.listStored = this.wrapTime.querySelector('.js-laps');
    this.id = null;
    this.startTime = null;
    this.deltaTime = 0;
    this.isActive = false;
    this.storedTime = [];
    this.startBtn.addEventListener('click', this.handleStartBtnClick.bind(this));
    this.stopBtn.addEventListener('click', this.handleStopBtnClick.bind(this));
    this.lapBtn.addEventListener('click', this.handleLapBtnClick.bind(this));
    this.lapBtn.addEventListener('contextmenu', this.handleClearListBtn.bind(this));
    this.listStored.addEventListener('contextmenu', this.handleDellLapBtn.bind(this));
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
      this.startBtn.classList.add('active');
      this.lapBtn.classList.add('active');
    } else {
      this.stop();
      this.startBtn.textContent = 'Continue';
      this.startBtn.classList.remove('active');
    }
  };
  handleStopBtnClick() {
    this.reset();
    this.startBtn.textContent = 'Start';
    this.startBtn.classList.remove('active');
    this.lapBtn.classList.remove('active');
  };
  createListLaps() {
    this.listStored.innerHTML = this.storedTime.reduce(
      (strTag, elem, idx) => strTag += `<li class="stored-time" data-id="${idx}">${this.formatTime(elem)}</li>`,
      '');
  };
  handleLapBtnClick() {
    if (this.deltaTime < 100) return;
    this.storedTime.push(this.deltaTime);
    this.createListLaps();
  };
  handleDellLapBtn(event) {
    if ((event.target.nodeName === "LI") && (event.target.className === "stored-time")) {
      event.preventDefault();
      this.storedTime.splice(Number(event.target.dataset.id), 1);
      this.createListLaps();
    }
  };
  handleClearListBtn() {
    event.preventDefault();
    this.storedTime = [];
    this.createListLaps();
  };
};

const firstTimer = new Stopwatch(firstWrap);
const secondTimer = new Stopwatch(secondWrap);
const thirdTimer = new Stopwatch(thirdWrap);