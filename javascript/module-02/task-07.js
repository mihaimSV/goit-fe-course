/*
  Напишите скрипт, который проверяет произвольную строку 
  в переменной string и находит в ней самое длинное слово,
  записывая его в переменную longestWord.
*/

const stringIn = "May the force be with you";
let longestWord;
let words = stringIn.split(" ");
console.log(words, words.length);
if (words.length > 0) {
    longestWord = words[0];
    console.log('0 - ', words[0], longestWord);
    for (let idxWord = 1; idxWord < words.length; idxWord += 1) {
        if (words[idxWord].length > longestWord.length) {
            longestWord = words[idxWord];
        }
        console.log(idxWord, words[idxWord], longestWord);
    }
}
console.log(longestWord); // 'force'