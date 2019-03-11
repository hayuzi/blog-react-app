import request from '@/utils/request';

export async function adminLogin(params) {
  return request('/api/v0/adminauth', {params});
}

export async function getArticleList(params) {
  return request('/admin/v1/articles', {params});
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

export async function getTagList(params) {
  return request('/admin/v1/tags', {params});
}

export async function addTag(params) {
  return request("/admin/v1/tags", {params,  method: 'post'});
}

export async function editTag(params) {
  let url = "/admin/v1/tags";
  if (params.id) {
    url += "/" + params.id;
  } else {
    url += "/0"
  }
  return request(url, {params, method: 'put'});
}

export async function getCommentList(params) {
  return request('/admin/v1/comments', {params});
}

export async function deleteComment(params) {
  let url = "/admin/v1/comments";
  if (params.id) {
    url += "/" + params.id;
  } else {
    url += "/0"
  }
  return request(url, {params, method: 'delete'});
}


export async function getUserList(params) {
  return request('/admin/v1/users', {params});
}

export async function deleteUser(params) {
  let url = "/admin/v1/users";
  if (params.id) {
    url += "/" + params.id;
  } else {
    url += "/0"
  }
  return request(url, {params, method: 'delete'});
}
