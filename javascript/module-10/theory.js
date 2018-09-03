const LOCALSTORAGE = (w => {
  if (!w) return;

  const isActive = "localStorage" in w;

  const get = key => {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ?
        undefined :
        JSON.parse(serializedState);
    } catch (err) {
      console.error("Get state error: ", err);
    }
  };

  const remove = key => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("Remove state error: ", err);
    }
  };

  const set = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error("Set state error: ", err);
    }
  };

  const clear = () => {
    try {
      localStorage.clear();
    } catch (err) {
      console.error("Clear state error: ", err);
    }
  }

  const publicAPI = {
    isActive,
    get,
    set,
    remove,
    clear,
  };

  return publicAPI;
})(window);

console.log(LOCALSTORAGE);

const settings = {
  theme: 'dark',
  isAuthenticated: true,
  options: [1, 2, 3],
};

if (LOCALSTORAGE.isActive) {
  LOCALSTORAGE.set('setings', settings);

  let Item = LOCALSTORAGE.get('setings');
  console.log(Item);

  LOCALSTORAGE.remove('setings');

  LOCALSTORAGE.set('string', 'settings');

  Item = LOCALSTORAGE.get('string');
  console.log(Item);

  LOCALSTORAGE.clear();
}