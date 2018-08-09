/*
  Есть список категорий с классом categories (на вкладке HTML).
  
  Напишите код, который для каждого элемента li (первая вложенность) 
  в списке categories выведет в консоль:
  - Текст непосредственно в нём (название категории)
  - Количество всех вложенных в него элементов li
  
  К примеру:
    Категория: Животные
    Количество вложенных li: 4
*/
const Elements = Array.from(document.querySelectorAll('.categories>li'));
Elements.reduce(
  (str, elem) => {
    elem.insertAdjacentHTML('beforeend',
      `<p class="console"> Категория "${elem.firstChild.textContent}" содержит ${elem.children[0].childElementCount} элементов </p>`);
    console.log(`Категория "${elem.firstChild.textContent}" содержит ${elem.children[0].childElementCount} элементов`);
    return str;
  },
  '');

/*
  Дан список с классом .list
	- Найдите первого потомка списка и сделайте его текст красного цвета
	- Найдите последнего потомка списка и сделайте его текст синего цвета
*/
const listList = document.querySelector('.list');
listList.firstElementChild.style.color = 'red';
listList.lastElementChild.style.color = 'blue';
listList.insertAdjacentHTML('afterend',
  `<p class="console" style="color: red">document.querySelector('.list').firstElementChild.style.color = 'red';</p>
<p class="console" style="color: blue">document.querySelector('.list').lastElementChild.style.color = 'blue';</p>`);

/*
  Дан ul склассом .list и массив строк. 
  Вставьте элементы этого массива в ul так, чтобы каждый элемент стоял в своем li.
*/
const elements = ['HTML', 'CSS', 'JavaScript', 'React', 'NodeJS'];
document.querySelector('.list-new')
  .insertAdjacentHTML('afterbegin',
    elements.reduce((str, elem) => str + `<li>${elem}</li>`, '')
  );

/*
  Напишите скрипт для создания списка ul.
  Для каждого пункта:
    - Запрашивайте содержимое пункта li у пользователя с помощью prompt.
    - Создавайте пункт и добавляйте его к ul.
    - Процесс прерывается, когда пользователь нажимает Cancel.
    - Все элементы списка должны создаваться динамически.
*/
const listFromInput = {
  listName: 'List Name',
  listItems: []
};

function createTagElem(tagElem, classElem, textElem, ...attribElem) {
  if (tagElem === '') {
    return null;
  }
  const elem = document.createElement(tagElem);
  if (classElem.length > 0) {
    elem.classList.add(classElem);
  }
  if (textElem.length > 0) {
    elem.textContent = textElem;
  }
  Array.from(attribElem).forEach(attrib => elem.setAttribute(...attrib));
  return elem;
}

let currentInput = prompt('Введите название списка');
if ((currentInput !== null) && (currentInput !== "")) {
  listFromInput.listName = currentInput;
}
document.querySelector('.task-4').appendChild(createTagElem('h3', '', currentInput));
document.querySelector('.task-4').appendChild(createTagElem('ul', 'list-created', ''));

do {
  currentInput = prompt('Введите содержание нового пункта списка:');
  if ((currentInput === null) || (currentInput === "")) {
    break;
  }
  listFromInput.listItems.push(currentInput);
  document.querySelector('.list-created').appendChild(createTagElem('li', '', currentInput));
} while ((currentInput !== null) && (currentInput !== ""));
document.querySelector('.task-4').insertAdjacentHTML('afterend', `<p class="console">${listFromInput.listItems}</p>`);

/*
  Есть список с классом .size-filter из произвольного 
  количества чекбоксов, каждый из которых содержит размер одежды в фильтре.
  
  Напишите функцию getInputsData(inputs), которая принимает 1 параметр inputs - массив тех инпутов у которых состояние checked.
  
  Возвращает массив значений атрибута value.
*/
function filterInputsChecked(inputs) {
  return inputs.filter((elem) => elem.checked);
}

function getInputsData(inputs) {
  return inputs.map((item) => item.value);
}

document.querySelector('.size-filter').insertAdjacentHTML('afterend',
  `<p class="console">${
  getInputsData(
  filterInputsChecked(
    Array.from(
      document.querySelectorAll('.size-filter>li>label>input')
    )
  )
)
}</p>`);

/*
  Создайте функцию createPostCard(), которая 
  создает и возвращает DOM-узел карточки поста.
  
  Разметка с классами есть на вкладке HTML.
  Стили на вкладке CSS.
  
  Используйте createElement для создания узлов.
  Добавьте классы и атрибуты.
*/
/*    <div class="post">
          <img class="post__image" src="http://via.placeholder.com/400x150" alt="post image">
          <h2 class="post__title">Lorem ipsum dolor</h2>
          <p class="post__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!</p>

          <a class="button" href="#">Read more</a>
        </div> */
function createPostCard(title, imgSrc, imgAlt, postText, btnHref) {
  const elemPost = createTagElem('div', 'post', '');
  const elemImg = createTagElem('img', 'post__image', '', ['src', imgSrc], ['alt', imgAlt]);
  elemPost.appendChild(elemImg);
  elemPost.appendChild(createTagElem('h2', 'post__title', title));
  elemPost.appendChild(createTagElem('p', 'post__text', postText));
  const elemBtn = createTagElem('a', 'button', 'Read more', ['href', btnHref]);
  elemPost.appendChild(elemBtn);
  return elemPost;
}
document.querySelector('.task-6').appendChild(
  createPostCard(
    'Lorem ipsum dolor',
    'http://via.placeholder.com/400x150', 'post image',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    '#'
  )
);

/*
  В HTML-документе уже есть тег с id="root" (вкладка HTML)
  
  Создайте функцию createBoxes(num), которая принимает 1 параметр num - число.
  
  Функция создает столько div, сколько указано в num и возвращает их в одном
  общем контейнере. После чего необходимо повесить результат работы функции
  в div с id="#root"
  
  Каждый div:
    - Имеет случайный rgb цвет фона
    - Размеры самого первого div - 30px на 30px.
    - Каждый следующий div после первого, должен быть шире и выше предыдущего
      на 10px
*/

function createOneBox(colorBox, widthBox, heightBox) {
  const oneBox = document.createElement('div');
  oneBox.style.backgroundColor = colorBox;
  oneBox.style.height = heightBox;
  oneBox.style.width = widthBox;
  return oneBox;
}

function createBoxes(num) {
  const wrapperBox = createTagElem('div', 'wrapper', `создадим ${num} div элементов:`);
  for (let i = 1; i <= num; i += 1) {
    wrapperBox.appendChild(
      createOneBox(
        `rgb(${ Math.round( Math.random() * 255 ) }, ${ Math.round( Math.random() * 255 ) }, ${ Math.round( Math.random() * 255 ) })`,
        `${40 + i*10}Px`, `${40 + i*10}Px`
      )
    );
  }
  return wrapperBox;
}

document.querySelector('#root').appendChild(createBoxes(Math.ceil(Math.random() * 10)));