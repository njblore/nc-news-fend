import Axios from 'axios';

const baseURL = 'https://northcoders-news-server.herokuapp.com/api';

export const fetchArticles = params => {
  let url = baseURL + '/articles';

  return Axios({
    method: 'get',
    url,
    params,
  }).then(({ data }) => data.articles);
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

export const updateArticleVotes = (article_id, vote) => {
  const url = baseURL + '/articles/' + article_id;
  return Axios.patch(url, { inc_votes: vote }).then(({ data }) => data.article);
};
