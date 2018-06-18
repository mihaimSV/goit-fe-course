const QuantityNaturals = 100000; // Количество натуральных чисел, коотрые будем искать 
// const MaxNumber = 10000;
let isNatural = true;
let arrNaturals = [1];
let sumNaturals = 1;
let maxDivisor = 1;

let num = 3; // начинаем искать натуральные числа с 3
let currentNatural = 1; // Количество найденных натуральных чисел
do {
    isNatural = true;
    maxDivisor = Math.ceil(num / 2);
    for (let i = 2; i < maxDivisor; i += 1) {
        if (num % i === 0) {
            isNatural = false;
            break;
        }
    }
    if (isNatural) {
        arrNaturals.push(num);
        sumNaturals += num;
        currentNatural += 1;
    }
    num += 1;
} while (currentNatural < QuantityNaturals);

let midleNatural = Math.round(sumNaturals / arrNaturals.length);

for (let j = currentNatural - 10; j < currentNatural; j += 1) {
    console.log(`${j+1}-ое натуральное число - ${arrNaturals[j]}`);
}

alert(`среди целых чисел от 0 до ${num} найденно ${arrNaturals.length} натуральных чисел, их сумма - ${sumNaturals}, среднее арифметическое - ${midleNatural}.`);
