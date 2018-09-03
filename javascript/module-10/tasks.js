/*
Дополнительное задание 1
  Написать функцию fetchCountryData, которая использует
  apiUrl + текущее значение input для составления запроса.
  
  Формат полного url таков:
    https://restcountries.eu/rest/v2/name/имя-страны
    
  С помощью fetch сделать запрос по составленому 
  адресу. Обязательно обработать вариант с ошибкой запроса
  используя catch. 
  
  Результат запроса вывести в поле result в формате:
    Country name: имя страны
    Capital: столица
    Main currency: название денежной единицы
    Flag: флаг страны
  
  Все необходимые данные есть в ответе от API.
  
  PS: при отправке формы перезагружается страница,
  решите эту задачу вспомнив о том, как остановить
  поведение по умолчанию.
*/
const wrapCountry = document.querySelector('.js-wrapCountry');

const rest = (wrap) => {
  return {
    input: wrap.querySelector("input"),
    submitBtn: wrap.querySelector(".js-submit"),
    result: wrap.querySelector(".js-result")
  }
};
const restCountry = rest(wrapCountry);

/*
  @param {FormEvent} evt
*/

const api = {
  baseUrl: 'https://restcountries.eu/rest/v2/name/',
  getData(countryName) {
    return fetch(this.baseUrl + countryName)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Error while fetching ' + response.statusText);
      })
      .catch(error => console.log(error));
  }
};

function fetchCountryData(evt) {
  evt.preventDefault();
  let countryName = restCountry.input.value.trim();
  countryName = countryName.match(/[a-z]+/i);
  if (countryName === null) return alert('Нельзя найти страну без названия!!!');
  countryName = countryName[0];
  if (countryName.length < 3) return alert('Нельзя найти страну без названия!!!');
  api.getData(countryName).then(objData => {
    restCountry.result.innerHTML = (objData) ?
      `<p>Country name: ${objData[0].name}</P>
        <p>Capital: ${objData[0].capital}</P>
        <p>Main currency: ${objData[0].currencies[0].name}</P>
        <p>Flag: </P>
        <img src="${objData[0].flag}" alt="flag" width="200px" >` :
      `<p>${countryName} is bad country name</P>`;
  });
}
restCountry.submitBtn.addEventListener("click", fetchCountryData);

/*
Дополнительное задание 2
  Написать функцию fetchUserData, которая использует
  apiUrl + текущее значение input для составления запроса.
  
  Формат полного url таков:
    https://api.github.com/users/имя-пользователя
    
  Документация по Git API:
    https://developer.github.com/v3/
    
  С помощью fetch сделать запрос по составленому адресу. 
  Обязательно обработать вариант с ошибкой запроса используя catch. 
  
  Результат запроса вывести в поле result в формате:
    Avatar: аватартка 
    Username: логин
    Bio: описание профиля
    Public repos: кол-во открытых репозиториев
  
  Все необходимые данные есть в ответе от API.
*/
const wrapGitHub = document.querySelector('.js-wrapGitHub');
const restGitHub = rest(wrapGitHub);

const apiGitHub = {
  baseUrl: 'https://api.github.com/users/',
  getData(userName) {
    return fetch(this.baseUrl + userName)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Error while fetching ' + response.statusText);
      })
      .catch(error => console.log(error));
  }
};

restGitHub.submitBtn.addEventListener("click", fetchUserData);

/*
  @param {FormEvent} evt
*/
function fetchUserData(evt) {
  evt.preventDefault();
  let userName = restGitHub.input.value.trim();
  if (userName.length < 3) return alert('Нельзя найти юзера без имени!!!');
  apiGitHub.getData(userName).then(objData => {
    restGitHub.result.innerHTML = (objData) ?
      `<p>Avatar: </p><img src="${objData.avatar_url}" alt="avatar" width="200px" >
        <p>Username: ${objData.login}</p>
        <p>Name: ${objData.name}</p>
        <p>Bio: ${objData.bio}</p>
        <p>Public repos: ${objData.public_repos}</p>` :
      `<p>${userName} is bad user name</p>`;
  });
}

/*
Дополнительное задание 3
  Документация API: https://github.com/trostinsky/users-api#users-api

  Просмотр всех записей: https://test-users-api.herokuapp.com/users/ 

  Написать функцию fetchUsers, которая используя REST сервис 
  по адресу https://test-users-api.herokuapp.com/users/
  посылает get запрос и получает ответ.
  
  Результатом fetch будет массив объектов с полями.
  
  В элемент result поместить таблицу состоящую из 2-х
  столбцов след формата, где кол-во строк будет такое как
  и кол-во объектов пользователей в ответе:
  
    ID | NAME | AGE
    id | name | age  
    id | name | age  
*/

const getBtn = document.querySelector(".js-get");
const result = document.querySelector(".js-testGet");

const apiTest = {
  baseUrl: 'https://test-users-api.herokuapp.com/users/',
  getData(userID = '') {
    return fetch(this.baseUrl + userID)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Error while fetching ' + response.statusText);
      })
      .catch(error => console.log(error));
  }
};

getBtn.addEventListener("click", fetchUsers);
/*
  @param {FormEvent} evt
*/
function fetchUsers(evt) {
  evt.preventDefault();
  apiTest.getData('').then(objData => {
    result.innerHTML = (objData) ?
      (objData.data.reduce((str, item) => str +
        `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.age}</td></tr>`,
        '<table><tr><th>ID</th><th>NAME</th> <th>AGE</th></tr>') + '</table>') :
      `<p>there are not users</p>`;
  });
}

/*
Дополнительное задание 4
  Документация API: https://github.com/trostinsky/users-api#users-api

  Просмотр всех записей: https://test-users-api.herokuapp.com/users/ 

  Написать функцию getUserByName, которая используя REST сервис 
  по адресу https://test-users-api.herokuapp.com/users/
  посылает запрос с name введенным в input.
 
  Результатом fetch будет ответ от сервера, 
  вывести содержимое всего ответа (id, name, age) 
  или 'Такого пользователя в списке нет!'.
*/
const wrapTest = document.querySelector('.js-test');
const restTest = rest(wrapTest);

restTest.submitBtn.addEventListener("click", getUserByName);

function getUserByName(evt) {
  evt.preventDefault();
  let userName = restTest.input.value.trim();
  if (userName.length < 1) return alert('Нельзя найти юзера без имени!!!');
  apiTest.getData('').then(objData => {
    return objData.data.filter((item) => (item.name === userName));
  }).then(arrData => {
    restTest.result.innerHTML = (arrData.length > 0) ?
      (arrData.reduce((str, item) => str +
        `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.age}</td></tr>`,
        '<table><tr><th>ID</th><th>NAME</th> <th>AGE</th></tr>') + '</table>') :
      `<p>Такого пользователя - '${userName}' - в списке нет! </p>`;
  });
}