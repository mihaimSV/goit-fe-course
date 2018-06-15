/*
  Напишите скрипт который:
  
  - Запрашивает по очереди числа при помощи prompt и сохраняет их в массиве.
    Используйте do...while.
  
  - Заканчивает запрашивать числа, как только посетитель введёт не число 
    или нажмёт Cancel. При этом ноль 0 не должен заканчивать ввод, 
    это разрешённое число.
  
  - После того как ввод был завершен, если массив не пустой, 
    скрипт выводит сумму всех значений массива: "Сумма: <сумма всех значений в массиве>"
    Используйте цикл for...of
*/

let arrayOfNumbers = [];
let currentInput;
let currentNumber;

do {
    currentInput = prompt("Введите число");
    currentNumber = Number(currentInput);
    //console.log(currentInput, currentNumber); 
    if ((currentInput === null) || (currentInput === "") || (Number.isNaN(currentNumber))) {
        break;
    } else {
        arrayOfNumbers.push(currentNumber);
    }
} while (true);

//console.log(`Массив - ${arrayOfNumbers} длиной ${arrayOfNumbers.length}`); 
let summArray = 0;
if (arrayOfNumbers.length > 0) {
    //console.log(summArray);
    for (let Number of arrayOfNumbers) {
        summArray += Number;
        //console.log(summArray);
    }
}
console.log(`Сумма всех значений массива - ${arrayOfNumbers} равна ${summArray}`);