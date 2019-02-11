import request from '@/utils/request'
import hosts from '@/services/hosts';

export async function getArticleList(params) {
  return request(hosts + '/api/v1/articles', { params });
}

export async function getArticleDetail(params) {
  let url = hosts + "/api/v1/articles";
  if (params.id) {
    url += "/" + params.id;
  } else {
    url += "/0"
  }
  return request(url, {});
}

export async function getAllTags(params) {
  return request(hosts + '/api/v1/tags/all', { params });
}