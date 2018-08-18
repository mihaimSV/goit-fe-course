/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>   
    
    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
      
      
    Реализуйте функционал:
      
      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.
      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и создается динамически при загрузке страницы.
      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview, он содержит ссылку на большое изображение. preview и его элементы, 
        также создаются динамически, при загрузке страницы.
      - При клике в элемент preview, необходимо подменить src тега img внутри fullview на url из data-атрибута выбраного элемента.
      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
      - Изображений может быть произвольное количество.
      - Используйте делегирование для элементов preview.
      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
      - CSS-оформление и имена классов на свой вкус.
      
    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании размер. 
      Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px. Подберите изображения одинаковых пропорций.
*/

/*
  Массив объектов с данными для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/

const galleryItems = [
  { preview: 'img/preview-earth.jpg', fullview: 'img/earth.jpeg', alt: "earth" },
  { preview: 'img/preview-earth-space.jpg', fullview: 'img/earth-space.jpg', alt: "start to space" },
  { preview: 'img/preview-flight-sky.jpg', fullview: 'img/flight-sky.jpg', alt: "fly in sky" },
  { preview: 'img/preview-photo-056.jpg', fullview: 'img/photo-056.jpeg', alt: "fly in space" },
  { preview: 'img/preview-photo-072.jpg', fullview: 'img/photo-072.jpeg', alt: "over Earth" },
  { preview: 'img/preview-astronaut-spacewalk.jpg', fullview: 'img/astronaut-spacewalk.jpg', alt: "spacewalk" },
];

// document.querySelector('.preview').innerHTML =
//   galleryItems.reduce((str, elem) => str +
//     `<li><img src="${elem.preview}" data-fullview="${elem.fullview}" alt="${elem.alt}"></li>`, '');
// document.querySelector('.fullview').innerHTML =
//   `<img src="${galleryItems[0].fullview}" alt="${galleryItems[0].alt}">`;

// const handlerImgSelect = (event) => {
//   if (event.target.nodeName === "IMG") {
//     event.preventDefault();
//     const imgPreview = document.querySelectorAll('ul.preview>li>img');
//     Array.from(imgPreview).forEach((item) => (item === event.target) ? item.classList.add('js-preview-selected') : item.classList.remove('js-preview-selected'));
//     console.log(event.target.dataset.fullview);
//     document.querySelector('.fullview').innerHTML =
//       `<img src="${event.target.dataset.fullview}" alt="${event.target.alt}">`;
//   }
// }
// document.querySelector('.preview').addEventListener(
//   'click',
//   handlerImgSelect
// )

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Создайте плагин галлереи используя ES6 класс. Добавьте поля и методы класса так, 
  чтобы можно было создать любое количество галлерей на странице. Функционал плагина 
  аналогичный заданию выше.
  
  При создании экземпляра конструктор получает:
    - items - список элементов для preview
    - parentNode - ссылку на DOM-узел в который будут помещены fullview и preview
    - defaultActiveItem - номер активного элемента preview по умолчанию
*/

class Gallery {
  constructor({ items, parentNode, defaultActiveItem }) {
    this.items = items;
    this.parentNode = parentNode;
    this.defaultActiveItem = defaultActiveItem;
    this.initPreview();
    this.eventSelectInit();
  }
  initPreview() {
    this.parentNode.children[1].innerHTML =
      this.items.reduce((str, elem) => str +
        `<li><img src="${elem.preview}" data-fullview="${elem.fullview}" alt="${elem.alt}"></li>`, '');
    this.parentNode.children[0].innerHTML =
      `<img src="${galleryItems[this.defaultActiveItem-1].fullview}" alt="${galleryItems[this.defaultActiveItem-1].alt}">`;
  }
  handlerImgSelect(event) {
    if (event.target.nodeName === "IMG") {
      event.preventDefault();
      const imgPreview = this.parentNode.children[1].querySelectorAll('li>img');
      Array.from(imgPreview).forEach((item) => (item === event.target) ? item.classList.add('js-preview-selected') : item.classList.remove('js-preview-selected'));
      this.parentNode.children[0].innerHTML =
        `<img src="${event.target.dataset.fullview}" alt="${event.target.alt}">`;
    }
  }
  eventSelectInit() {
    this.parentNode.children[1].addEventListener(
      'click',
      this.handlerImgSelect.bind(this)
    )
  }
}
new Gallery({
  items: galleryItems,
  parentNode: document.querySelector('.image-gallery'),
  defaultActiveItem: 1
});