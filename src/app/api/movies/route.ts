import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const query = searchParams.get('q') || '';
  const genres = searchParams.get('genres') || '28';

  let url = '';
  if (type === 'trending') {
    url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`;
  } else if (type === 'search') {
    url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}`;
  } else {
    url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genres}&api_key=${process.env.TMDB_API_KEY}&page=1`;
  }

  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}