const Storage =  {};

/**
 * 是否支持localStorage
 * @returns {boolean}
 */
function supportsHtml5Storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

Storage.get = function (name) {
  return JSON.parse(localStorage.getItem(name));
};

Storage.set = function (name, val) {
  localStorage.setItem(name, JSON.stringify(val));
};

Storage.add = function (name, addVal) {
  let oldVal = Storage.get(name);
  let newVal = oldVal.concat(addVal);
  Storage.set(name, newVal)
};

export default Storage;