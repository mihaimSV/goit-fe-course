const MaxNumber = 10000;
let isNatural = true;
let arrNaturals = [1];
let sumNaturals = 1;

for (let num = 3; num <= MaxNumber; num += 1) {
    isNatural = true;
    for (let i = 2; i < num; i += 1) {
        if (num % i === 0) {
            isNatural = false;
            break;
        }
    }
    if (isNatural) {
        arrNaturals.push(num);
        sumNaturals += num;
    }
}

let midleNatural = Math.round(sumNaturals / arrNaturals.length);

alert(`среди целых чисел от 0 до ${MaxNumber} найденно ${arrNaturals.length} натуральных чисел, их сумма - ${sumNaturals}, среднее арифметическое - ${midleNatural}.`);