import Axios from 'axios';

export const fetchArticles = topic => {
  let url = 'https://northcoders-news-server.herokuapp.com/api/articles';
  if (topic) {
    url = url + '?topic=' + topic;
  }

  return Axios.get(url).then(({ data }) => data.articles);
};

export const fetchTopics = () => {
  return Axios.get(
    'https://northcoders-news-server.herokuapp.com/api/topics',
  ).then(({ data }) => data.topics);
};
