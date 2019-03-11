import request from '@/utils/request';

export async function adminLogin(params) {
  return request('/api/v0/adminauth', {params});
}

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

export async function addArticle(params) {
  return request("/admin/v1/articles", {params,  method: 'post'});
}

export async function editArticle(params) {
  let url = "/admin/v1/articles";
  if (params.id) {
    url += "/" + params.id;
  } else {
    url += "/0"
  }
  return request(url, {params, method: 'put'});
}

export async function deleteArticle(params) {
  let url = "/admin/v1/articles";
  if (params.id) {
    url += "/" + params.id;
  } else {
    url += "/0"
  }
  return request(url, {params, method: 'delete'});
}

export async function getAllTags(params) {
  return request('/admin/v1/tags/all', {params});
}

