const element = document.querySelector('div');
// console.log(element);
// element.innerHTML += `<p> ${navigator.geolocation} </p>`;
// for (keys in navigator.geolocation) {
//   element.innerHTML += `<p> Поле "${keys}" = "${navigator.geolocation[keys]}" </p>`;
// }
// console.log(navigator.geolocation);
// let msgLocation = '';
const onSuccess = position => {
  element.innerHTML += `<p> Широта: ${position.coords.latitude}, Долгота: ${position.coords.longitude} </p>`;
  for (key in position.coords) {
    element.innerHTML += `<p> Поле "${key}" = "${position.coords[key]}" </p>`;
  }
  console.log(position);
  console.log('typeof position.coords - ', typeof position.coords);
  console.log(position.coords);
  console.log('Object.entries(position.coords) - ', Object.entries(position.coords));
  // element.innerHTML += Object.keys(position.coords).reduce((str, key) => str + `<p> Поле "${key}" = "${position.coords[key]}" </p>`, '');

  // const { latitude, longitude } = position.coords;
  // msgLocation = `Широта: ${latitude}, Долгота: ${longitude}`;
  // console.log(`Широта: ${latitude}, Долгота: ${longitude}`);
  // return `Широта: ${latitude}, Долгота: ${longitude}`;
};

const onError = error => {
  // msgLocation = `Ошибка при определении положения:  ${error}`;
  element.innerHTML += `Ошибка при определении положения: ${error}`;
}
navigator.geolocation.getCurrentPosition(onSuccess, onError);
// console.log(msgLocation);


// element.innerHTML += `<p> ${screen} </p>`;
// for (keys in screen) {
//   element.innerHTML += `<p> Поле "${keys}" = "${screen[keys]}" </p>`;
// }
// console.log(screen);
// element.innerHTML += `<p> ${location} </p>`;
// for (keys in location) {
//   element.innerHTML += `<p> Поле "${keys}" = "${location[keys]}" </p>`;
// }
// console.log(location);
// element.innerHTML += `<p> ${history} </p>`;
// for (keys in history) {
//   element.innerHTML += `<p> Поле "${keys}" = "${history[keys]}" </p>`;
// }
// console.log(location);