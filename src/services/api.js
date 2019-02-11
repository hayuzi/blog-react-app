import request from '@/utils/request'

export async function getArticleList(params) {
  return request('http://localhost:8000/api/v1/articles', { params });
}

export async function getArticleDetail(params) {
  let url = "http://localhost:8000/api/v1/articles";
  if (params.id) {
    url += "/" + params.id;
  } else {
    url += "/0"
  }
  return request(url, {});
}

export async function getAllTags(params) {
  return request('http://localhost:8000/api/v1/tags/all', { params });
}