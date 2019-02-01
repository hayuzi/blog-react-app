import axios from 'axios';

export default function axiosRequest(url, opt) {
  console.log(url, opt);
  return axios({
    method: opt.method.toLowerCase(),
    url: url,
    data: opt.body ? opt.body : {},
    params: opt.params ? opt.params : {},
  });
}