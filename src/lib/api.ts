import axios from 'axios';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const CATEGORY_TO_GENRE: Record<string, number> = {
    technology: 878,    // Science Fiction
    sports: 28,         // Action
    finance: 18,        // Drama
    health: 99,         // Documentary
    science: 878,       // Science Fiction
    entertainment: 35,  // Comedy
  };
  
  export const fetchMoviesByCategories = async (categories: string[]) => {
    const genreIds = categories.map(c => CATEGORY_TO_GENRE[c] || 28).join(',');
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreIds}&api_key=${TMDB_API_KEY}&page=1`
    );
    return response.data.results.slice(0, 6);
  };

export const fetchNews = async (categories: string[]) => {
  const query = categories.join(' OR ');
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apiKey=${NEWS_API_KEY}`
  );
  return response.data.articles;
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const searchContent = async (query: string) => {
  const [news, movies] = await Promise.all([
    axios.get(`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${NEWS_API_KEY}`),
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${TMDB_API_KEY}`)
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