import axiosRequest from '@/utils/requests/axios';
import hosts from '@/services/hosts';
import {message} from 'antd';
import Storage from '@/storage/Storage';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errorText = codeMessage[response.status] || response.statusText;
  // notification.error({
  //   message: `请求错误 ${response.status}: ${response.url}`,
  //   description: errorText,
  // });
  console.log(`请求错误 ${response.status}: ${response.url}`);
  const error = new Error(errorText);
  error.name = response.status;
  error.response = response;
  throw error;
};

/**
 * 默认请求方法
 * @param url
 * @param option
 * @returns {Promise<T>}
 */
export default function request(url, option) {

  // 拼接默认的域名
  if (url.indexOf('http') !== 0) {
    url = hosts + url;
  }

  let userInfo = Storage.get("userInfo");
  let token = '';
  if (userInfo !== null && userInfo.token !== undefined) {
    token = userInfo.token;
  }

  const newOption = {};
  const method = (option && option.method ? option.method : 'get').toLowerCase();
  newOption.method = method;
  switch (method) {
    case 'post':
    case 'put':
      newOption.params = {token};
      newOption.body = option.params;
      break;
    case 'get':
    case 'delete':
    default:
      newOption.params = {token, ...option.params};
      newOption.body = {};
      break;
  }

  // 提交请求, 并返回Promise供call调用
  return axiosRequest(url, newOption)
    .then(checkStatus)
    .then(res => {
      if (res.data.code !== 200 && res.data.msg) {
        message.config({
          top: 100,
          duration: 2,
          maxCount: 3,
        });
        message.error(res.data.msg);
      }
      return res.data;
    })
    .catch(err => {
      const msg401 = "Request failed with status code 401";
      if (err.message === msg401) {
        message.error("请先登陆再操作！");
      } else {
        message.error(err.message);
      }
      return {
        code: 500,
        data: {},
        msg: 'error'
      };
    });

}