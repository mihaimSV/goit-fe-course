/*
  Есть массив logins с логинами пользователей. Напишите скрипт добавления логина в массив logins.
  
  Добавляемый логин должен:
    - проходить проверку на длину, от 4 до 16-ти символов включительно
    - быть уникален, тоесть еще не используется в массиве logins
 
  🔔 Разбейте задачу на подзадачи, что удобно решить используя функции.
  
  Для начала напишите функцию checkLoginValidity(login) которая получает логин как 
  аргумент, проверяет количество символов логина и возвращает true если логин подходит 
  под условие длины от 4-х до 16-ти символов включительно, и false если не подходит. 
  Убедитесь что функция работает верно.
 
  Далее создайте функцию checkIfLoginExists(logins, login), которая получает логин и список 
  всех логинов как аргументы, проверяет наличие логина в массиве logins, возвращая false 
  если такого логина в массиве еще нет, и true если есть. Убедитесь что функция работает верно.
  Далее напишите функцию addLogin(logins, login) которая:
    - Получает новый логин и массив всех логинов как аргументы
    
    - Проверяет валидность логина используя вспомогательную функцию checkLoginValidity
      
    - Если логин не валиден, прекратить исполнение функции addLogin 
      и вернуть строку 'Ошибка! Логин должен быть от 4 до 16 символов'
      
    - Если логин валиден, функция addLogin проверяеть уникальность логина 
      с помощью функции checkIfLoginExists
       
    - Если checkIfLoginExists вернет false, addLogin добавляет новый логин 
       в logins и возвращает строку 'Логин успешно добавлен!'
       
    - Если checkIfLoginExists вернет true, тогда addLogin не добавляет 
       логин в массив и возвращает строку 'Такой логин уже используется!'
       
  🔔 Принцип единственной ответственности функции:
      - checkIfLoginExists только проверяет есть ли такой логин и возвращает true или false. 
        Больше ничего не делает.
      
      - checkLoginValidity только проверяет  валидный ли логин и возвращает true или false. 
        Больше ничего не делает.
      
      - addLogin вызывает обе функции и по результату их работы или добавляет логин в logins или нет, 
        возвращая указанные строки. Больше ничего не делает.
*/

const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];
const strBadLength = "Ошибка! Логин должен быть от 4 до 16 символов";
const strLoginExists = "Такой логин уже используется!";
const strOkLogin = "Логин успешно добавлен!";

const checkLoginValidity = function(login) {
    if ((typeof login === "string") && (login.length >= 4) && (login.length <= 16)) {
        return true;
    }
    return false;
};

const checkIfLoginExists = function(logins, login) {
    for (let elem of logins) {
        if (elem === login) {
            return true;
        }
    }
    return false;
};

const addLogin = function(logins, login) {
    if (!checkLoginValidity(login)) {
        return strBadLength;
    }
    if (checkIfLoginExists(logins, login)) {
        return strLoginExists;
    }
    logins.push(login);
    return strOkLogin;
};

console.group(1);
console.log(addLogin(logins, "123"));
console.log(logins);
console.groupEnd(1);

console.group(2);
console.log(addLogin(logins, "Вассилий"));
console.log(logins);
console.groupEnd(2);

console.group(3);
console.log(addLogin(logins, "qwerty123"));
console.log(logins);
console.groupEnd(3);

console.group(4);
console.log(addLogin(logins, "qwerty"));
console.log(logins);
console.groupEnd(4);

console.group(5);
const gessLogin = prompt("Введите, пожалуйста, желаемый логин (от 4 до 16 символов)");
alert(addLogin(logins, gessLogin));
console.log(logins);
console.groupEnd(5);