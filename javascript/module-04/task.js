/*  
  Напишите скрипт, который, для объекта user, последовательно: 
  
    - добавляет поле mood со значением 'happy'
    - заменяет значение hobby на 'javascript'
    - удаляет свойство premium
    - выводит содержимое объекта user в формате ключ:значение используя цикл for...in
    - выводит содержимое объекта user в формате ключ:значение используя Object.keys и for...of
     - выводит содержимое объекта user в формате ключ:значение используя Object.entries и for...of
*/
console.group(1);
const user = {
    name: "Mango",
    age: 20,
    hobby: "html",
    premium: true
};
user.mood = "happy";
user.mood = "javascript";
delete user.premium;
console.log(user);

for (let key in user) {
    console.log(`for (let key in user) - ${key}:${user[key]}`);
}

const keys = Object.keys(user);
console.log(keys);
for (let key of keys) {
    console.log(`for (let key of keys) - ${key}:${user[key]}`);
}

const entries = Object.entries(user);
console.log(entries);
for (let entry of entries) {
    console.log(`for (let entry of entries) - ${entry[0]}:${entry[1]}`);
}
console.groupEnd(1);

/*
  Напиште скрипт который определит и выведет в консоль имя сотрудника который выполнил больше всех задач.
  Сотрудники и кол-во выполненых задач содержатся как свойства объекта в формате "имя":"кол-во задач"
*/

console.group(2);
const tasksCompleted = {
    ann: 29,
    david: 35,
    helen: 1,
    lorence: 99
};
console.log(tasksCompleted);

const workers = Object.keys(tasksCompleted);
let maxTasks = tasksCompleted[workers[0]];
let bestWorker = workers[0];
for (let i = 1; i < workers.length; i += 1) {
    if (tasksCompleted[workers[i]] > maxTasks) {
        maxTasks = tasksCompleted[workers[i]];
        bestWorker = workers[i];
    }
}
console.log(`Best worker is "${bestWorker}", he completed ${maxTasks} tasks!`);
console.groupEnd(2);

/*  
  Напишите функцию countProps(obj), считающую кол-во свойств в объекте. Функция возвращает количество свойств.
*/
console.group(3);
const countProps = (obj) => (typeof obj === "object") ? Object.keys(obj).length : 0;
// Вызовы функции для проверки
console.log(countProps({})); // 0
console.log(countProps({ a: 1, b: 3, c: "hello" })); // 3
console.log(countProps("hello")); // 0
console.groupEnd(3);

/*  
Создайте функцию isObjectEmpty(obj), которая получает один аргумент obj - объект, и проверяет пуст ли он (есть ли в нем свойства).
Возвращает true если объект пустой, false если не пустой.
*/
console.group(4);
const isObjectEmpty = (obj) => Object.keys(obj).length === 0;
// Вызовы функции для проверки
console.log(isObjectEmpty({})); // true
console.log(isObjectEmpty({ a: 1 })); // false
console.log(isObjectEmpty({ a: 1, b: 2 })); // false
console.groupEnd(4);

/*  
Напишите функцию countTotalSalary(salaries), получающую объект и считающую общую сумму запрплаты работников.
Каждое поле объекта передаваемого в функцию, имеет вид "имя":"зарплата"
Функция возвращает общую сумму зарплаты.
*/
console.group(5);
const countTotalSalary = (salaries) => {
    const salaryValues = Object.values(salaries);
    let total = 0;
    for (let val of salaryValues) {
        total += val;
    }
    return total;
};
// Вызовы функции для проверки
console.log(countTotalSalary({})); // 0
console.log(countTotalSalary({ mango: 100, poly: 150, alfred: 80 })); // 330
console.groupEnd(5);

/*  
Напишите функцию getAllPropValues(arr, prop), которая получает массив объектов и имя ключа, возвращает массив значений определенного поля prop из каждого объекта в массиве
*/
console.group(6);
const users = [
    { name: "Poly", age: 7, mood: "happy" },
    { name: "Mango", age: 4, mood: "blissful" },
    { name: "Ajax", age: 3, mood: "tired" }
];
const getAllPropValues = (arr, prop) => {
    const arrValues = [];
    for (let obj of arr) {
        if (obj.hasOwnProperty(prop)) {
            arrValues.push(obj[prop]);
        }
    }
    return arrValues;
};
// Вызовы функции для проверки
console.log(getAllPropValues(users, "name")); // ['Poly', 'Mango', 'Ajax']
console.log(getAllPropValues(users, "mood")); // ['happy', 'blissful', 'tired']
console.log(getAllPropValues(users, "active")); // []
console.groupEnd(6);

/*  
Напишите код, который бы  с помощью функции-конструкора User, позволял создавать объекты пользователя со следующим свойствами:
    - name - строка (имя)
    - isActive - буль (активен)
    - age - число (возраст)
    - friends - число (кол-во друзей)
Имя, активность, возраст и друзей, необходимо передать как аргументы при вызове конструктора.
Добавить метод getUserInfo(), которая, выводит строку: `User ${имя} is ${возраст} years old and has ${кол-во друщзей} friends`
Создать несколько объектов пользователя User и с помощью функции getUserInfo вывести строку в консоль.
*/
console.group(7);

function User(name = "name", isActive = false, age = 1, friends = 0) {
    this.name = name;
    this.isActive = isActive;
    this.age = age;
    this.friends = friends;
    // this.getUserInfo = function() {
    //     console.log(`User ${this.name} is ${this.age} years old and has ${this.friends} friends`);
    //     return this.isActive;
    // };
}
const getUserInfo = function() {
    console.log(`User ${this.name} is ${this.age} years old and has ${this.friends} friends`);
    return this.isActive;
};
const jon = new User("Jony Depp", true, 45, 397);
const tramp = new User("Donald Tramp", true, 67, 3);
const friend = new User("Best Friend", true, 33, 33333);

// jon.getUserInfo();
// tramp.getUserInfo();
// friend.getUserInfo();
getUserInfo.call(jon);
getUserInfo.call(tramp);
getUserInfo.call(friend);
console.groupEnd(7);

/*  
Расставьте отсутствующие this в методах объекта store
*/
console.group(8);
const store = {
    products: ['bread', 'cheese', 'milk', 'apples'],
    managers: ['poly', 'mango', 'ajax'],
    addManager(manager) {
        this.managers.push(manager);
        console.log(this.managers);
    },
    removeManager(manager) {
        const idx = this.managers.indexOf(manager);
        this.managers.splice(idx, 1);
        console.log(this.managers);
    },
    getProducts() {
        console.log(this.products);
        return this.products;
    }
};
store.addManager('chelsey'); // ['poly', 'mango', 'ajax', 'chelsey']
store.removeManager('mango'); // ['poly', ajax', 'chelsey']
store.getProducts(); // ['bread', 'cheese', 'milk', 'apples']
console.groupEnd(8);

/*  
Расставьте отсутствующие this в конструкторе объектов Account
*/
console.group(9);

function Account({ login, password, type = "regular" }) {
    this.login = login;
    this.password = password;
    this.type = type;
    this.changePassword = function(newPassword) {
        this.password = newPassword;
        return `new password: "${this.password}"`;
    };
    this.getAccountInfo = function() {
        return `user has Login: "${this.login}", Pass: "${this.password}", Type: "${this.type}"`;
    };
}

const account = new Account({
    login: "Mango",
    password: "qwe123",
    type: "premium"
});

console.log(account.login); // 'Mango'
console.log(account.password); // 'qwe123'
console.log(account.type); // 'premium'
console.log(account.changePassword("asdzxc")); // 'asdzxc'
console.log(account.getAccountInfo()); // Login: 'Mango', Pass: 'asdzxc', Type: 'premium'
console.groupEnd(9);


const testKeys = {
    "#125_part_II": "",
    _id: "",
    $$_$$: "",
    catch: ""
};
console.log(Object.keys(testKeys));