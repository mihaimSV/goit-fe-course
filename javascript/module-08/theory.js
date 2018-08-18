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

const scroolTagElem = document.querySelector('.scrool');

const handlerScrool = () => {
  scroolTagElem.appendChild(
    createTagElem(
      'div',
      'console',
      `pageYOffset: ${pageYOffset}, pageXOffset: ${pageXOffset}`
    )
  )
}

const handlerContextMenu = (event) => {
  if ((event.target.nodeName === "DIV") && (event.target.className === "console")) {
    event.target.remove();
    return null;
  }
  const currentPosition = createTagElem(
    'div',
    'console',
    `Current position: (${event.x}, ${event.y}). In the elem - ${event.target.nodeName}.${event.target.className}`
  )
  currentPosition.style.position = 'absolute';
  currentPosition.style.left = `${event.x}px`;
  currentPosition.style.top = `${event.y}px`;
  event.target.appendChild(currentPosition)
  console.log(event);
}

window.addEventListener(
  'dblclick',
  handlerContextMenu
);