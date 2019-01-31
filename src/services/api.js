import request from '@/utils/request'

export async function getArticleList(payload) {
  return request('http://www.msfopen.com/open/home/index', { body: payload });
}