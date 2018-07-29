//  Теория
function Guest(name, room) {
  this.name = name;
  this.room = room;
}

const mango = new Guest('Mango', 28);

console.log(mango);

/*
  Создать функцию-конструктор Account, которая добавляет будущему
  объекту поля login, email и friendsCount. 
  
  В prototype функции-конструктора добавить метод getAccountInfo(), 
  который выводит в консоль значения полей login, email и friendsCount. 
  
  Обратите внимание, метод будет всего один, в поле prototype функции-конструктора, 
  а использовать его смогут все экземпляры, по ссылке.
  
  Создать несколько экземпляров с разными значениями свойств, вывести их в консоль.
*/

function Account(login, email, friendsCount) {
  this.login = login;
  this.email = email;
  this.friendsCount = friendsCount;
}

Account.prototype.getAccountInfo = function() {
  console.log(`Login: ${this.login}; email: ${this.email}; has ${this.friendsCount} friends.`);
}

const jonn = new Account('Jonny', 'jonn-jonny@gmail.com', 22);
console.log(jonn);
const peet = new Account('Peets', 'peet-think@gmail.com', 33);
console.log(peet);
const dolly = new Account('Dolly', 'dolly-like@gmail.com', 44);
console.log(dolly);

jonn.getAccountInfo();
peet.getAccountInfo();
dolly.getAccountInfo();

/*
  Напишите функцию-конструктор StringBuilder.
  
  На вход она получает один параметр string - строку.
  
  Добавьте следующие методы в prototype функции-конструктора.
  
    - getValue() - выводит в консоль текущее значение поля value
  
    - append(str) - получает парметр str - строку и добавляет 
      ее в конец значения поля value
    
    - prepend(str) - получает парметр str - строку и добавляет 
      ее в начало значения поля value
  
    - pad(str) - получает парметр str - строку и добавляет 
      ее в начало и в конец значения поля value
*/


function StringBuilder(string = "") {
  this.value = string;
}

StringBuilder.prototype.showValue = function() {
  console.log(this.value);
}

StringBuilder.prototype.append = function(strToEnd) {
  this.value = this.value + strToEnd;
  return this.value;
}

StringBuilder.prototype.prepend = function(strToStart) {
  this.value = strToStart + this.value;
  return this.value;
}

StringBuilder.prototype.pad = function(strToAdd) {
  this.value = strToAdd + this.value + strToAdd;
  return this.value;
}

const myString = new StringBuilder('.');

myString.append('^');
myString.showValue(); // '.^'

myString.prepend('^');
myString.showValue(); // '^.^'

myString.pad('=');
myString.showValue(); // '=^.^='

/*
  Создайте класс Car с указанными полями и методами.
*/

class Car {
  constructor(maxSpeed) {
    // Добавьте свойства:
    // - speed - для отслеживания текущей скорости, изначально 0.
    this.speed = 0;
    // - maxSpeed - для хранения максимальной скорости 
    this.maxSpeed = maxSpeed;
    // - running - для отслеживания заведен ли автомобиль, возможные значения true или false. Изначально false.
    this.running = false;
    // - distance - содержит общий киллометраж, изначально с 0
    this.distance = 0;
  }

  turnOn() {
    // Добавьте код для того чтобы завести автомобиль. Просто записывает в свойство running значание true
    this.running = true;
    return this.running;
  }

  turnOff() {
    // Добавьте код для того чтобы заглушить автомобиль. Просто записывает в свойство running значание false
    this.running = false;
    return this.running;
  }

  accelerate(spd) {
    // Записывает в поле speed полученное значение, при условии что оно не больше чем значение свойства maxSpeed
    if ((spd < this.maxSpeed) && (spd > this.speed)) {
      this.speed = spd;
    }
    return this.speed;
  }

  decelerate(spd) {
    // Записывает в поле speed полученное значение, при условии что оно не больше чем значение свойства maxSpeed и не меньше нуля
    if ((spd > 0) && (spd <= this.speed)) {
      this.speed = spd;
    }
    return this.speed;
  }

  drive(hours) {
    // Добавляет в поле distance киллометраж (hours умноженное на значение поля speed), но только в том случае если машина заведена!
    if (this.running) {
      this.distance += this.speed * hours;
    }
    return this.distance;
  }

  static getSpecs(obj) {
    console.log(`maxSpeed: ${obj.maxSpeed}, running: ${obj.running}, distance: ${obj.distance}`);
  }
}

const tesla = new Car(450);
console.log(tesla);
console.log(`start - ${tesla.turnOn()}`);
console.log(`accelerate - ${tesla.accelerate(120)}`);
console.log(`drive - ${tesla.drive(1.25)}`);
console.log(`decelerate - ${tesla.decelerate(60)}`);
console.log(`drive - ${tesla.drive(0.5)}`);
console.log(`stop - ${tesla.turnOff()}`);
console.log(tesla);

/*
  Добавьте к классу Car из предыдущего задания статический
  метод getSpecs, который получает объект-машину как аргумент
  и выводит в консоль значения полей maxSpeed, running и distance.
  
  Использование будет выглядеть следующим образом:
*/
const someCar = new Car(100);
someCar.turnOn();
someCar.accelerate(50);
someCar.drive(2);
console.log(someCar);
Car.getSpecs(someCar); // maxSpeed: 100, running: true, distance: 200