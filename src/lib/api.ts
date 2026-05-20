import axios from 'axios';

const CATEGORY_TO_GENRE: Record<string, number> = {
  technology: 878,
  sports: 28,
  finance: 18,
  health: 99,
  science: 878,
  entertainment: 35,
};

export const fetchMoviesByCategories = async (categories: string[]) => {
  const genreIds = categories.map(c => CATEGORY_TO_GENRE[c] || 28).join(',');
  const response = await axios.get(`/api/movies?type=discover&genres=${genreIds}`);
  return response.data.results.slice(0, 6);
};

export const fetchNews = async (categories: string[]) => {
  const query = categories.join(' OR ');
  const response = await axios.get(`/api/news?q=${encodeURIComponent(query)}`);
  return response.data.articles;
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`/api/movies?type=trending`);
  return response.data.results;
};

export const searchContent = async (query: string) => {
  const [news, movies] = await Promise.all([
    axios.get(`/api/news?q=${encodeURIComponent(query)}`),
    axios.get(`/api/movies?type=search&q=${encodeURIComponent(query)}`)
  ]);
  return {
    news: news.data.articles,
    movies: movies.data.results,
  };
};

const MOCK_SOCIAL_POSTS = [
  { id: 's1', title: 'Just shipped a new feature using React and TypeScript 🚀', description: 'Thread on how we optimized our state management with Redux Toolkit...', hashtag: '#webdev', user: '@devgirl' },
  { id: 's2', title: 'AI is changing how we write code forever 🤖', description: 'Used Claude to refactor 500 lines of legacy code in 10 minutes. Wild.', hashtag: '#AI', user: '@techbro' },
  { id: 's3', title: 'New study shows remote work increases productivity by 13%', description: 'Stanford research confirms what we all suspected. Full thread below...', hashtag: '#remotework', user: '@worknerdd' },
  { id: 's4', title: 'My honest review of the new MacBook Pro M4', description: 'Battery life is insane. Performance benchmarks inside 👇', hashtag: '#apple', user: '@techreviews' },
  { id: 's5', title: 'How I went from 0 to 10k followers in 3 months', description: 'Consistency + niche content + engaging with your community. Full breakdown...', hashtag: '#growth', user: '@creatorlife' },
  { id: 's6', title: 'The best free resources to learn system design in 2025', description: 'Curated list of courses, books, and YouTube channels that actually helped me...', hashtag: '#systemdesign', user: '@swe_tips' },
];

export const fetchSocialPosts = async () => {
  await new Promise(res => setTimeout(res, 300));
  return MOCK_SOCIAL_POSTS;
};