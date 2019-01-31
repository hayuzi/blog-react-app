import axios from 'axios';
import checkStatus from '@/utils/request'

export default function request(url, opt) {
  return axios({
    method: opt.method.toLowerCase(),
    url: url,
    data: opt.body ? opt.body :null
  }).then(checkStatus)
  .then(res => {
    console.log(res);
    return res;
  })
  .catch(err => {
    console.log(err);
    return;
  });
}