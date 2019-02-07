export function parseQueryString(query) {
  let str = query.split("?")[1], items = str.split("&");
  let result = {};
  let arr;
  for (let i = 0; i < items.length; i++) {
    arr = items[i].split("=");
    result[arr[0]] = arr[1];
  }
  return result;
}