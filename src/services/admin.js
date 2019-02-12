import request from '@/utils/request';


export async function getArticleList(params) {
  return request('/admin/v1/articles', {params});
}

export async function getArticleDetail(params) {
  let url = "/admin/v1/articles";
  if (params.id) {
    url += "/" + params.id;
  } else {
    url += "/0"
  }
  return request(url, {});
}

export async function getAllTags(params) {
  return request('/admin/v1/tags/all', {params});
}


export async function adminLogin(params) {
  return request('/auth', {params, method: 'post'});
}