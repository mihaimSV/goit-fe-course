/*
  К pen уже подключен Handlebars.
  
  Создайте шаблон списка указаного во вкладке HTML.
  
  Отрендерите список в DOM по данным из массива listItems.
*/

const listItems = [
  { name: 'item 1', count: 2 },
  { name: 'item 2', count: 4 },
  { name: 'item 3', count: 12 },
  { name: 'item 4', count: 29 },
];

const wrapper = document.querySelector('.list');
const source = document.querySelector('#listTemplate').innerHTML.trim();
const template = Handlebars.compile(source);

const markup = listItems.reduce((acc, item) => acc + template(item), '');
wrapper.insertAdjacentHTML(
  'afterbegin',
  markup
);

/*
  Создайте шаблон поста указаного во вкладке HTML.
  Отрендерите список постов в DOM по данным из массива posts.
  
  Если в объекте поле isFav=true, в посте должна быть 
  разметка иконки избранного поста, в противном случае
  разметки иконки быть не должно.
  
  Используйте эту иконку для фона:
  https://image.flaticon.com/icons/svg/290/290413.svg
*/

const posts = [
  { title: "post 1", text: "text 1", isFav: true },
  { title: "post 2", text: "text 2", isFav: false },
  { title: "post 3", text: "text 3", isFav: true },
  { title: "post 4", text: "text 4", isFav: false }
];

const postWrap = document.querySelector('.container');
const postSource = document.querySelector('#postTemplate').innerHTML.trim();
const postTemplate = Handlebars.compile(postSource);

const postMarkup = posts.reduce((acc, item) => acc + postTemplate(item), '');
postWrap.innerHTML = postMarkup;

/* 
  Напишите функцию validate которая проверяет поля формы 
  firstname и lastname и возвращает результат в виде 
  обьекта со свойствами 'first name' и 'last name'.
  
  Кроме того, формат объекта: в свойства записывается буль-флаг 
  уведомляющий о статусе прохождения валидации для каждого поля.
  {
    'first name': true или false,
    'last name': true или false,
  }
  
  Критерии валидации:
  1)Имя. Допускается не более 2-х слов, разделенных пробелами
  или дефисом. Слова должны состоять только из букв.
  /^([A-Z][a-z]+)([-| ][A-Z][a-z]+)?/
  2)Фамилия. Допускается не более 2-х слов, разделенных пробелами
  или дефисом. Слова должны состоять только из букв.
  
  При клике на кнопку submit должна происходить проверка.
  Результат проверки, объект, выводить в консоль.
*/

const firstname = document.getElementById("first_name");
const lastname = document.getElementById("last_name");
const submitBtn = document.getElementById("submit-btn");

const patern = /^([A-Z][a-z]+)([-| ][A-Z][a-z]+)?$/;

submitBtn.addEventListener("click", validate);

function validate(evt) {
  evt.preventDefault();
  let fName = firstname.value.trim();
  let lName = lastname.value.trim();
  let validFlags = {
    'first name': patern.test(fName),
    'last name': patern.test(lName),
  };
  console.log(validFlags);
  return validFlags;
};