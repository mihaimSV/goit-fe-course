/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [{
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-1.com'
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-2.com'
  },
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-3.com'
  }
];

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

function createPostCard({ img, title, text, link }) {
  const elemPost = createTagElem('div', 'post', '');
  const elemImg = createTagElem('img', 'post__image', '', ['src', img], ['alt', 'post image']);
  elemPost.appendChild(elemImg);
  elemPost.appendChild(createTagElem('h2', 'post__title', title));
  elemPost.appendChild(createTagElem('p', 'post__text', text));
  const elemBtn = createTagElem('a', 'button', 'Read more', ['href', link]);
  elemPost.appendChild(elemBtn);
  return elemPost;
}

function createCards(cards) {
  return cards.map(card => createPostCard(card));
}

const wrapTag = document.querySelector('.wrapper');
const cardsArray = createCards(posts);
cardsArray.forEach(element => {
  wrapTag.appendChild(element);
});