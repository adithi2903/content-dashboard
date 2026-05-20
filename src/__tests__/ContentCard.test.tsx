import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ContentCard from '../app/components/ui/ContentCard';
import preferencesReducer from '../store/slices/preferencesSlice';

const makeStore = (favorites: string[] = []) =>
  configureStore({
    reducer: { preferences: preferencesReducer },
    preloadedState: {
      preferences: {
        categories: [],
        darkMode: false,
        favorites,
        contentFilter: 'all' as const,
        readCount: {},
      },
    },
  });

const defaultProps = {
  id: 'news-1',
  title: 'Test Article',
  description: 'Some description',
  image: '',
  url: 'https://example.com',
  type: 'news' as const,
};

const renderCard = (props = {}, favorites: string[] = []) =>
  render(
    <Provider store={makeStore(favorites)}>
      <ContentCard {...defaultProps} {...props} />
    </Provider>
  );

describe('ContentCard', () => {
  it('renders title and description', () => {
    renderCard();
    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('Some description')).toBeInTheDocument();
  });

  it('shows Read More for news type', () => {
    renderCard({ type: 'news' });
    expect(screen.getByText('Read More')).toBeInTheDocument();
  });

  it('shows View for movie type', () => {
    renderCard({ type: 'movie' });
    expect(screen.getByText('View')).toBeInTheDocument();
  });

  it('shows type badge', () => {
    renderCard({ type: 'social' });
    expect(screen.getByText('social')).toBeInTheDocument();
  });

  it('shows Save button when not favorited', () => {
    renderCard();
    expect(screen.getByText('☆ Save')).toBeInTheDocument();
  });

  it('shows Saved when already in favorites', () => {
    renderCard({}, ['news-1']);
    expect(screen.getByText('★ Saved')).toBeInTheDocument();
  });

  it('toggles favorite on Save click', () => {
    const { getByText } = renderCard();
    fireEvent.click(getByText('☆ Save'));
    expect(getByText('★ Saved')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const onClick = jest.fn();
    renderCard({ onClick });
    fireEvent.click(screen.getByText('Test Article'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders link with correct href', () => {
    renderCard();
    const link = screen.getByText('Read More').closest('a');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});