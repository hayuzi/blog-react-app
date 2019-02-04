import request from '@/utils/request'

export async function getArticleList(params) {
  return request('http://localhost:8000/api/v1/articles', { params });
}