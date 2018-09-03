/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const rest = (wrap) => {
  return {
    input: wrap.querySelectorAll("input"),
    submitBtn: wrap.querySelector(".js-submit"),
    result: wrap.querySelector(".js-result")
  }
};
const wrapGetAll = document.querySelector('.js-getAll');
const wrapGetUser = document.querySelector('.js-getUser');
const wrapAddUser = document.querySelector('.js-addUser');
const wrapRemoveUser = document.querySelector('.js-removeUser');
const wrapUpdateUser = document.querySelector('.js-updateUser');
const restGetAll = rest(wrapGetAll);
const restGetUser = rest(wrapGetUser);
const restAddUser = rest(wrapAddUser);
const restRemoveUser = rest(wrapRemoveUser);
const restUpdateUser = rest(wrapUpdateUser);

const apiTest = {
  baseUrl: 'https://test-users-api.herokuapp.com/users/',

  fetchData(method = 'GET', id, name = 'name', age = 0) {
    let apiParam = {};
    switch (method) {
      case 'DELETE':
      case 'GET':
        apiParam = { method: method };
        break;

      case 'POST':
      case 'PUT':
        apiParam = {
          method: method,
          body: JSON.stringify({ name: name, age: age }),
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
        };
        break;

      default:
        throw new Error('Unrecognized action type ' + method);
    }

    return fetch(this.baseUrl + id, apiParam)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Error while fetching ' + response.statusText);
      })
      .catch(error => console.log(error));
  },
};

function handleGetAll(evt) {
  evt.preventDefault();
  apiTest.fetchData('GET', '', 'name', 0).then(objData => {
    restGetAll.result.innerHTML = (objData) ?
      (objData.data.reduce((str, item) => str +
        `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.age}</td></tr>`,
        '<table><tr><th>ID</th><th>NAME</th> <th>AGE</th></tr>') + '</table>') :
      `<p>there are not users</p>`;
  });
};

function handleGetUser(evt) {
  evt.preventDefault();
  let userID = restGetUser.input[0].value.trim();
  if (userID.length < 24) return alert('Нельзя найти юзера без ID!!!');
  apiTest.fetchData('GET', userID, 'name', 0).then(objData => {
    restGetUser.result.innerHTML = (objData) ?
      ('<table><tr><th>ID</th><th>NAME</th> <th>AGE</th></tr>' +
        `<tr><td>${objData.data.id}</td><td>${objData.data.name}</td><td>${objData.data.age}</td></tr>` +
        '</table>') :
      `<p>there are not users</p>`;
  });
};

function handleAddUser(evt) {
  evt.preventDefault();
  let userName = restAddUser.input[0].value.trim();
  if (userName.length < 2) return alert('Нельзя найти юзера без имени!!!');
  let userAge = Number(restAddUser.input[1].value.trim());
  if (Number.isNaN(userAge)) return alert('Укажите возраст!');
  apiTest.fetchData('POST', '', userName, userAge).then(objData => {
    console.log(objData);
    restAddUser.result.innerHTML = (objData) ?
      ('<table><tr><th>ID</th><th>NAME</th> <th>AGE</th></tr>' +
        `<tr><td>${objData.data._id}</td><td>${objData.data.name}</td><td>${objData.data.age}</td></tr>` +
        '</table>') :
      `<p>there are not users</p>`;
  });
};

function handleRemoveUser(evt) {
  evt.preventDefault();
  let userID = restRemoveUser.input[0].value.trim();
  if (userID.length < 24) return alert('Нельзя найти юзера без ID!!!');
  apiTest.fetchData('DELETE', userID, 'name', 0).then(objData => {
    restRemoveUser.result.innerHTML = (objData) ?
      ('<table><tr><th>ID</th><th>NAME</th> <th>AGE</th></tr>' +
        `<tr><td>${objData.data.id}</td><td>${objData.data.name}</td><td>${objData.data.age}</td></tr>` +
        '</table>') :
      `<p>there are not users</p>`;
  });
};

function handleUpdateUser(evt) {
  evt.preventDefault();
  let userID = restUpdateUser.input[0].value.trim();
  if (userID.length < 24) return alert('Нельзя найти юзера без ID!!!');
  let userName = restUpdateUser.input[1].value.trim();
  if (userName.length < 2) return alert('Нельзя найти юзера без имени!!!');
  let userAge = Number(restUpdateUser.input[2].value.trim());
  if (Number.isNaN(userAge)) return alert('Укажите возраст!');
  apiTest.fetchData('PUT', userID, userName, userAge).then(objData => {
    console.log(objData);
    restUpdateUser.result.innerHTML = (objData) ?
      ('<table><tr><th>ID</th><th>NAME</th> <th>AGE</th></tr>' +
        `<tr><td>${objData.data.id}</td><td>${objData.data.name}</td><td>${objData.data.age}</td></tr>` +
        '</table>') :
      `<p>there are not users</p>`;
  });
};

restGetAll.submitBtn.addEventListener("click", handleGetAll);
restGetUser.submitBtn.addEventListener("click", handleGetUser);
restAddUser.submitBtn.addEventListener("click", handleAddUser);
restRemoveUser.submitBtn.addEventListener("click", handleRemoveUser);
restUpdateUser.submitBtn.addEventListener("click", handleUpdateUser);