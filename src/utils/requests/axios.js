import axios from 'axios';

export default function request(url, opt) {
  return axios({
    method: opt.method.toLowerCase(),
    url: url,
    data: opt.body
  });
}