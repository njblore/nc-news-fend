import Axios from 'axios';

const baseURL = 'https://northcoders-news-server.herokuapp.com/api';

export const fetchArticles = params => {
  let url = baseURL + '/articles';

  return Axios({
    method: 'get',
    url,
    params,
  }).then(({ data }) => data);
};

export const fetchTopics = () => {
  return Axios.get(baseURL + '/topics').then(({ data }) => data.topics);
};

export const fetchComments = id => {
  return Axios.get(`${baseURL}/articles/${id}/comments`).then(
    ({ data }) => data.comments,
  );
};

export const fetchUser = username => {
  return Axios.get(`${baseURL}/users/${username}`)
    .then(({ data }) => data.user)
    .catch(err => console.log(err.response));
};

export const updateArticleVotes = (article_id, vote) => {
  const url = baseURL + '/articles/' + article_id;
  return Axios.patch(url, { inc_votes: vote }).then(({ data }) => data.article);
};

export const updateCommentVotes = (comment_id, vote) => {
  const url = baseURL + '/comments/' + comment_id;
  return Axios.patch(url, { inc_votes: vote }).then(({ data }) => data.comment);
};

export const postCommentToArticle = commentObject => {
  console.log('comment object ->', commentObject);
  const url = baseURL + '/articles/' + commentObject.article_id + '/comments';
  return Axios.post(url, commentObject).then(({ data }) => data);
};

export const deleteComment = comment_id => {
  const url = baseURL + '/comments/' + comment_id;
  return Axios.delete(url, { comment_id }).then(({ data }) => data);
};

export const postArticle = articleObject => {
  const url = baseURL + '/articles';
  return Axios.post(url, articleObject);
};

export const postTopic = topic => {
  const url = baseURL + '/topics';
  return Axios.post(url, { slug: topic });
};

export const deleteArticle = article_id => {
  const url = baseURL + '/articles/' + article_id;
  return Axios.delete(url);
};

export const postNewUser = userObject => {
  const url = baseURL + '/users';
  return Axios.post(url, userObject);
};

export const editUserProfile = (newUserObject, username) => {
  const url = baseURL + '/users/' + username;
  return Axios.patch(url, newUserObject).then(({ data }) => data);
};
