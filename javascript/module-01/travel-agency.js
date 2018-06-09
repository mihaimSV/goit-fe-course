/*
  ⚠️ ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Создайте скрипт турагенства, продающего поездки в 3-х группах: sharm, hurgada и taba.
  Кол-во мест в группах ограничено (создайте переменные для хранения мест в группах): 
    * sharm - 15
    * hurgada - 25
    * taba - 6.
  Когда пользователь посещает страницу, ему необходимо предложить ввести число необходимых мест,
  результат сохранить в переменную.
  Необходимо проверить являются ли введенные данные целым положительным числом. 
  
    - В случае неверного ввода от пользователя, скрипт показывает alert с текстом 
      "Ошибка ввода" и больше ничего не делает.
    - В случае верного ввода, последовательно проверить кол-во мест в группах, 
      и кол-во необходимых мест введенных пользователем.
  Если была найдена группа в которой количество мест больше либо равно необходимому, 
  вывести сообщение через confirm, что есть место в группе такой-то, согласен ли 
  пользоваетель быть в этой группе?
    * Если ответ да, показать alert с текстом 'Приятного путешествия в группе <имя группы>'
    * Если ответ нет, показать alert с текстом 'Нам очень жаль, приходите еще!'
  
  Если мест нигде нет, показать alert с сообщением 'Извините, столько мест нет ни в одной группе!'
*/

let placesInSharm = 15;
let placesInHurgada = 25;
let placesInTaba = 6;
const nameGroupTaba = "taba";
const nameGroupSharm = "sharm";
const nameGroupHurgada = "hurgada";

const strWasInput = prompt("Hello! Please enter how many places you need? ");
if (Number(strWasInput) && (strWasInput > 0)) {
    const numberPlaces = Number.parseInt(strWasInput);
    if (numberPlaces < placesInTaba) {
        const confirmGroup = confirm(`there are ${strWasInput} places in ${nameGroupTaba} group. Do you agree to be in this group?`);
        if (confirmGroup) {
            alert(`Have a nice trip in the ${nameGroupTaba} group`);
            placesInTaba = placesInTaba - numberPlaces;
        } else {
            alert("We are very sorry, come again!");
        }
    } else if (strWasInput < placesInSharm) {
        const confirmGroup = confirm(`there are ${strWasInput} places in ${nameGroupSharm} group. Do you agree to be in this group?`);
        if (confirmGroup) {
            alert(`Have a nice trip in the ${nameGroupSharm} group`);
            placesInSharm = placesInSharm - numberPlaces;
        } else {
            alert("We are very sorry, come again!");
        }
    } else if (strWasInput < placesInHurgada) {
        const confirmGroup = confirm(`there are ${strWasInput} places in ${nameGroupHurgada} group. Do you agree to be in this group?`);
        if (confirmGroup) {
            alert(`Have a nice trip in the ${nameGroupHurgada} group`);
            placesInHurgada = placesInHurgada - numberPlaces;
        } else {
            alert("We are very sorry, come again!");
        }
    } else {
        alert("We are very sorry, there are not enough places in all groups.");
    }
} else {
    alert("This is bad value");
}