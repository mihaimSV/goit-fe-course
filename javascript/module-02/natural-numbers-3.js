const QuantityNaturals = 100000; // Количество натуральных чисел, коотрые будем искать 
// const MaxNumber = 10000;
let isNatural = true;
let arrNaturals = [1, 2, 3, 5, 7]; // массив натуральных чисел
let arrNotNats = [9, 25, 49]; // массив составных чисел, которые отсеиваем
let sumNaturals = 18;

let num = 9; // начинаем искать натуральные числа с 9
let currentNatural = 5; // Количество найденных натуральных чисел
do {
    isNatural = true;
    for (let i = 0; i < arrNotNats.length - 1; i += 1) { // перебираем массив составных чисел для отсеивания
        for (let NotNat = arrNotNats[i]; NotNat <= num; NotNat += 2 * arrNaturals[i + 2]) { // производим отсев по (i+2)-му натуральному числу
            if (NotNat === num) {
                isNatural = false;
                arrNotNats[i] = NotNat + 2 * arrNaturals[i + 2];
                break;
            }
            arrNotNats[i] = NotNat + 2 * arrNaturals[i + 2];
        }
        if (!isNatural) {
            break;
        }
    }
    if (isNatural) {
        arrNaturals.push(num);
        sumNaturals += num;
        currentNatural += 1;
        arrNotNats.push(num * num);
    }
    num += 2;
} while (currentNatural < QuantityNaturals);

let midleNatural = Math.round(sumNaturals / arrNaturals.length);

for (let j = currentNatural - 10; j < currentNatural; j += 1) {
    console.log(`${j+1}-ое натуральное число - ${arrNaturals[j]}`);
}

alert(`среди целых чисел от 0 до ${num} найденно ${arrNaturals.length} натуральных чисел, их сумма - ${sumNaturals}, среднее арифметическое - ${midleNatural}.`);