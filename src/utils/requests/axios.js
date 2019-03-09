import axios from 'axios';

export default function axiosRequest(url, opt) {
  return axios({
    method: opt.method.toLowerCase(),
    url: url,
    data: opt.body ? opt.body : {},
    params: opt.params ? opt.params : {},
    transformRequest: [function (data) {
      // 将数据转换为表单数据
      let ret = '';
      for (let it in data) {
        if (it !== undefined) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
      }
      return ret;
    }],
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  });
}