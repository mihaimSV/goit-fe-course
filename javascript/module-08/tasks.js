/*
  Дополнительное задание 1
  
  Есть кнопка с классом button, текст которой отображает 
  кол-во раз которое по ней кликнули, обновляется при каждом клике.
*/

const hundlerButton = (event) => {
  if ((event.target.nodeName === "BUTTON") && (event.target.className === "button")) {
    const currentNum = Number(event.target.innerText);
    event.target.innerText = `${currentNum + 1}`;
  }
  return null;
}
const hundlerButtonDn = (event) => {
  if ((event.target.nodeName === "BUTTON") && (event.target.className === "button")) {
    const currentNum = Number(event.target.innerText);
    event.target.innerText = `${currentNum - 1}`;
    event.preventDefault();
  }
  return false;
}

document.querySelector('.wrp-task-1').addEventListener(
  'click',
  hundlerButton
);

document.querySelector('.wrp-task-1').addEventListener(
  'contextmenu',
  hundlerButtonDn
);

/*
  Дополнительное задание 2
    Даны 2 инпута, абзац и кнопка. По нажатию на кнопку 
  получите числа стоящие в инпутах и запишите их сумму в абзац.
*/

const hundlerCalcAdd = (event) => {
  if (event.target.nodeName === "BUTTON") {
    const valueTags = document.querySelectorAll('div.calc>input');
    const valueSum = Array.from(valueTags).map(
      (Tag) => Number.isNaN(Number(Tag.value)) ? 0 : Number(Tag.value)
    ).reduce(
      (sum, val) => sum += val, 0
    );
    document.querySelector('div.calc>span.result').innerText = `${valueSum}`;
  }
  return null;
};

document.querySelector('div.calc').addEventListener(
  'click',
  hundlerCalcAdd
);

/*
  Дополнительное задание 3
    Дан спан и кнопки +1, -1, которые будут увеличивать 
  и уменьшать на 1 значение спана. Сделайте так, чтобы 
  это значение не могло стать меньше нуля.
*/

const hundlerCount = (event) => {
  if ((event.target.nodeName === "BUTTON") && (event.target.className.includes('add'))) {
    const currentNum = Number(document.querySelector('span.value').innerText);
    document.querySelector('span.value').innerText = `${currentNum + 1}`;
  }
  if ((event.target.nodeName === "BUTTON") && (event.target.className.includes('sub'))) {
    const currentNum = Number(document.querySelector('span.value').innerText);
    if (currentNum >= 1) {
      document.querySelector('span.value').innerText = `${currentNum - 1}`;
    }
  }
  return null;
};
document.querySelector('.wrp-task-3').addEventListener(
  'click',
  hundlerCount
);

/*
  Дополнительное задание 4
  Есть форма с набором радиокнопок. Пользователь выбирает вариант ответа, 
  после чего нажимает кнопку "Send" и происходит отправка формы.
  
  При отправке формы:
    - не должна перезагружаться страница
    - необходимо получить выбранную опцию и вывести в абзац с классом .result
*/

const hundlerSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(document.querySelector('.question-form'));
  for (let item of data) {
    if (item[0] === 'option') {
      document.querySelector('p.result').innerText = `Result: ${item[1]}`;
    }
  }
}

document.querySelector('.question-form').addEventListener(
  'submit',
  hundlerSubmit
);

/*
  Дополнительное задание 5
  Дан список изображений. Сделайте так, чтобы по клику на картинку 
  алертом выводился ее src. Используйте делегирование.
*/

const hundlerImg = (event) => {
  if (event.target.tagName === 'IMG') {
    alert(event.target.src);
  }
};

document.querySelector('ul.images').addEventListener(
  'click',
  hundlerImg
);

/*
  Дополнительное задание 6
  Дан ul, а внутри него произвольное количество li с текстом и кнопкой. 
  Сделайте так, чтобы по нажатию на кнопку, удалялся тот li в котором
  она находится. Используйте делегирование.
*/

const hundlerList = (event) => {
  if (event.target.tagName === 'BUTTON') {
    event.target.parentElement.remove();
  }
};

document.querySelector('ul.list').addEventListener(
  'click',
  hundlerList
);

/*
  Дополнительное задание 7
 Дан набор инпутов. Сделайте так, чтобы при потере фокуса все 
  инпуты проверяли свое содержимое на правильное количество символов. 
  
  Сколько символов должно быть в инпуте, указывается в атрибуте data-length. 
  Если введено подходящее количество, то outline инпута становится зеленым, 
  если неправильное - красным. 
*/

const colorSetOutline = (tagElem) => {
  const checkedColor = (tagElem.value.length === Number(tagElem.dataset.length)) ? 'green' : 'red';
  const checkBackground = (tagElem.value.length === Number(tagElem.dataset.length)) ? 'lightgreen' : 'lightpink';
  if (tagElem.value.length !== 0) {
    tagElem.style.borderColor = checkedColor;
    tagElem.style.backgroundColor = checkBackground;
  }
  return checkedColor;
}

const hundlerFocusOut = (event) => {
  if ((event.target.parentElement.nodeName === "DIV") && (event.target.parentElement.className === "inputs")) {
    const inputElems = Array.from(event.target.parentElement.querySelectorAll('input'));
    inputElems.forEach((inpt) => colorSetOutline(inpt));
  }
}

document.querySelector('div.inputs').addEventListener(
    'focusout',
    hundlerFocusOut
  )
  /*
    Дополнительное задание 8
      Напишите скрипт который:
      
      - При фокусе текстового поля, в консоль выводит строку "Input is in focus!"
      - При наборе текста в текстовое поле (событие input), текущее его значение должно 
        отображаться в абзаце с классом input-value 
  */

const hundlerInFocus = (event) => {
  console.log('Input is in focus!');
};

const hundlerTyping = (event) => {
  document.querySelector('.input-value').innerText = `Current input value: ${ event.target.value }`;
};

document.querySelector('input.input').addEventListener(
  'focus',
  hundlerInFocus
);

document.querySelector('input.input').addEventListener(
  'input',
  hundlerTyping
);

/*
    Дополнительное задание 9
    По умолчанию модальное окно скрыто классом modal-hidden.
  
  Напишите скрипт который реализует следующее поведение:
 
  - При клике на кнопке с надписью "Open Modal" и классом js-open-modal, модальное окно с классом modal, 
    должно появляться, тобишь необходимо убрать класс modal-hidden. Для выбора модального модального окна используйте класс js-modal-backdrop
 
  - При открытом модальном окне, клик на кнопку с крестиком (js-close-modal) или на серый фон с прозрачностью (js-modal-backdrop), 
    модальное окно должно закрываться.
    
  
  Задание повышеной сложности:
  - Попробуйте реализовать плагин функционала модального окна используя класс. При создании экземпляра необходимо передать селекторы для кнопки закрытия окна
    и самого прозрачного фона. Плагин должен реализовавать два метода show и hide,либо один toggle.
    
    При клике на кнопку показа модального окна должен вызываться метод show или toggle. Соответственно при для закрытия окна hide либо toggle.
*/

class Modal {
  constructor({ backTag, openTag, closeTag, hiddenClass }) {
    this.backTag = backTag;
    this.openTag = openTag;
    this.closeTag = closeTag;
    this.hiddenClass = hiddenClass;
    this.statOpen = false;
    this.events();
  }
  events() {
    this.openTag.addEventListener(
      'click',
      this.hundlerToggle.bind(this)
    );
    this.closeTag.addEventListener(
      'click',
      this.hundlerToggle.bind(this)
    );
    this.backTag.addEventListener(
      'click',
      this.hundlerToggle.bind(this)
    );
  }
  hundlerToggle(event) {
    if (event.target === this.backTag || event.target === this.closeTag) {
      this.backTag.classList.add(this.hiddenClass);
      this.statOpen = false;
      return false;
    }
    if (event.target === this.openTag) {
      this.backTag.classList.remove(this.hiddenClass);
      this.statOpen = true;
      return true;
    }
  }
}

new Modal({
  backTag: document.querySelector('.js-modal-backdrop'),
  openTag: document.querySelector('.js-open-modal'),
  closeTag: document.querySelector('.js-close-modal'),
  hiddenClass: 'modal-hidden'
});

/*
    Дополнительное задание 10
  Есть меню навигации, необходимо написать скрипт, который
  при клике на пункт меню добавит ему класс menu-link-active,
  таким образом выделив текущую (активную) ссылку,
  при этом убрав его у всех остальных элементов меню.
  
  Пункотв меню может быть произвольное количество, используйте
  прием "Делегирование событий". Учтите клик по самому ul, его
  необходимо игнорировать.
  
  При клике по ссылкам не должна перезагружаться страница!
*/

const hundlerSelectItem = (event) => {
  if (event.target.nodeName === 'A') {
    event.preventDefault();
    const itemsMenu = document.querySelectorAll('.menu-link');
    Array.from(itemsMenu).forEach((item) => (item === event.target) ? item.classList.add('menu-link-active') : item.classList.remove('menu-link-active'));
  }
}

document.querySelector('.js-menu').addEventListener(
  'click',
  hundlerSelectItem
)