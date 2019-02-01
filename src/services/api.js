import request from '@/utils/request'

export async function getArticleList(params) {
  return request('http://www.msfopen.com/open/home/index', { params });
}