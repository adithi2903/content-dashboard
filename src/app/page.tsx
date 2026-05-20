'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { setItems, setTrending, setLoading, setError, setSearchQuery, reorderItems } from '../store/slices/contentSlice';
import { fetchNews, fetchMoviesByCategories } from '../lib/api';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ContentCard from './components/ui/ContentCard';
import LoadingSpinner from './components/ui/LoadingSpinner';
import EmptyState from './components/ui/EmptyState';
import Ticker from './components/ui/Ticker';
import Modal from './components/ui/Modal';
import { logout } from '../store/slices/authSlice';
import { useRouter } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchTrendingMovies, fetchSocialPosts } from '../lib/api';

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, trending, loading, error, searchQuery } = useAppSelector(state => state.content);
  const { categories, favorites, darkMode, contentFilter } = useAppSelector(state => state.preferences);
  const { isLoggedIn, user } = useAppSelector(state => state.auth);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'feed' | 'trending' | 'favorites'>('feed');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(displayItems);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    dispatch(reorderItems(reordered));
  };
  
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const loadContent = async () => {
      dispatch(setLoading(true));
      try {
        const [news, movies, social] = await Promise.all([
          fetchNews(categories),
          fetchTrendingMovies(),
          fetchSocialPosts(),
        ]);

        const newsItems = news.map((article: any, i: number) => ({
          id: `news-${i}`,
          title: article.title,
          description: article.description || '',
          image: article.urlToImage || '',
          url: article.url,
          type: 'news' as const,
          category: 'news',
        }));

        const movieItems = movies.slice(0, 10).map((movie: any) => ({
          id: `movie-${movie.id}`,
          title: movie.title,
          description: movie.overview,
          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '',
          url: `https://www.themoviedb.org/movie/${movie.id}`,
          type: 'movie' as const,
          category: 'movies',
        }));

        const socialItems = social.map((post: any) => ({
          id: post.id,
          title: post.title,
          description: post.description,
          image: '',
          url: '#',
          type: 'social' as const,
          category: 'social',
        }));
        
        dispatch(setItems([...newsItems, ...movieItems, ...socialItems]));

        dispatch(setTrending(movieItems));
      } catch (err) {
        dispatch(setError('Failed to load content'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadContent();
  }, [categories]);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

const filteredItems = searchQuery
  ? items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : items;

const typeFiltered = contentFilter === 'all'
  ? filteredItems
  : filteredItems.filter(item => item.type === (contentFilter === 'movies' ? 'movie' : contentFilter));

  const favoriteItems = items.filter(item => favorites.includes(item.id));

  const displayItems =
  activeTab === 'feed' ? typeFiltered :
  activeTab === 'trending' ? trending :
  favoriteItems;
  const [visibleCount, setVisibleCount] = useState(9);
const visibleItems = displayItems.slice(0, visibleCount);
const hasMore = visibleCount < displayItems.length;

const loadMore = () => {
  setVisibleCount(prev => prev + 6);
};


    return (
      <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <Sidebar />
        <Header />
        <main className="ml-64 pt-16 p-6">
        <div className="flex items-center justify-between mb-8 mt-4">
  <div className="flex gap-3">
    {(['feed', 'trending', 'favorites'] as const).map(tab => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className="px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all"
        style={
          activeTab === tab
            ? { background: 'var(--primary)', color: '#fff' }
            : { background: 'var(--card-bg)', color: 'var(--foreground)', border: '1px solid var(--border)' }
        }
      >
        {tab}
        {tab === 'favorites' && favorites.length > 0 && (
          <span
            className="ml-1 text-xs px-1.5 rounded-full"
            style={{ background: 'var(--primary)', color: '#fff' }}
          >
            {favorites.length}
          </span>
        )}
      </button>
    ))}
  </div>
  <div className="ml-5 flex-1 min-w-0 overflow-hidden">
  <Ticker />
</div>
</div>

          {loading && <LoadingSpinner />}
          {error && <EmptyState message={error} />}
          {!loading && !error && displayItems.length === 0 && (
            <EmptyState message="No content found" />
          )}
          {!loading && (
  <InfiniteScroll
    dataLength={visibleItems.length}
    next={loadMore}
    hasMore={hasMore}
    loader={<LoadingSpinner />}
    endMessage={
      <p className="text-center text-xs py-4" style={{ color: 'var(--foreground)', opacity: 0.4 }}>
        You've seen everything!
      </p>
    }
  >
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="feed" direction="horizontal">
        {(provided) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {visibleItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ContentCard
                      key={item.id}
                      {...item}
                      onClick={() => setSelectedItem(item)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </InfiniteScroll>
)}
{selectedItem && (
  <Modal
    isOpen={!!selectedItem}
    onClose={() => setSelectedItem(null)}
    title={selectedItem.title}
    description={selectedItem.description}
    image={selectedItem.image}
    url={selectedItem.url}
    type={selectedItem.type}
  />
)}
        </main>
      </div>
  );
}