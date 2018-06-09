// JavaScript module-01, homework

/*
  Напишите скрипт, для авторизации администратора в панели управления.
  
  При загрузке страницы у посетителя запрашивается логин через prompt:
  
    - Если посетитель нажал Cancel — показыать alert с текстом 'Отменено пользователем!'
    - Если было введено что либо другое, что не совпадает со значением константы ADMIN_LOGIN, 
       показывать alert с текстом 'Доступ запрещен!'   
    - Если был введен логин совпадающий со значением константы ADMIN_LOGIN, спрашивать пароль через prompt.
    
  При вводе пароля:
  
      - Если нажали Cancel, показывать alert с текстом 'Отменено пользователем!'
      - Если введен пароль который не совпадает со значением константы ADMIN_PASSWORD,
        показывать alert с текстом 'Доступ запрещен!'        
      - Если введён пароль который совпадает со значением константы ADMIN_PASSWORD, 
        показывать alert с текстом 'Добро пожаловать!'
        
  🔔 PS: для удобства и чистоты кода сохраните в переменные сообщения отображаемые в alert
*/

const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "m4ngo1zh4ackz0r";

const msgCancel = "Отменено пользователем!";
const msgError = "Доступ запрещен!";
const msgHello = "Добро пожаловать!";

const inputLogin = prompt("Please, enter your login: ");
if (inputLogin == null) {
    alert(msgCancel);
} else if (inputLogin != ADMIN_LOGIN) {
    alert(msgError);
} else {
    const inputPassword = prompt("Please, enter you password: ");
    if (inputPassword == null) {
        alert(msgCancel);
    } else if (inputPassword != ADMIN_PASSWORD) {
        alert(msgError);
    } else {
        alert(msgHello);
    }
}