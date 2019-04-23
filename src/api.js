import Axios from 'axios';

const baseURL = 'https://northcoders-news-server.herokuapp.com/api';

export const fetchArticles = topic => {
  let url = baseURL + '/articles';
  if (topic) {
    url = url + '?topic=' + topic;
  }

  return Axios.get(url).then(({ data }) => data.articles);
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
  return Axios.get(`${baseURL}/users/${username}`).then(
    ({ data }) => data.user,
  );
};
