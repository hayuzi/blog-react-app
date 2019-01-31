import request from '@/utils/request'

export function getArticleList(payload) {
  return request('http://www.msfopen.com/open/home/index');
}