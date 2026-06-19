import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { GamesPage } from './pages/GamesPage';
import { MoviesPage } from './pages/MoviesPage';
import { SeriesPage } from './pages/SeriesPage';
import { AnimesPage } from './pages/AnimesPage';
import { BooksPage } from './pages/BooksPage';
import { ComicsPage } from './pages/ComicsPage';
import { Category } from './types';
import { supabase } from '../lib/supabase';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category | 'home'>('home');
  const [stats, setStats] = useState({ games: 0, movies: 0, series: 0, animes: 0, books: 0, comics: 0 });

  useEffect(() => {
    fetchStats();
  }, [activeCategory]);

  const fetchStats = async () => {
    const tables = ['games', 'movies', 'series', 'animes', 'books', 'comics'];
    const counts = await Promise.all(
      tables.map(t => supabase.from(t).select('id', { count: 'exact', head: true }))
    );
    setStats({
      games: counts[0].count || 0,
      movies: counts[1].count || 0,
      series: counts[2].count || 0,
      animes: counts[3].count || 0,
      books: counts[4].count || 0,
      comics: counts[5].count || 0,
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Toaster position="top-right" theme="dark" />
      <Navigation activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      {activeCategory === 'home' && <HomePage onNavigate={setActiveCategory} stats={stats} />}
      {activeCategory === 'games' && <GamesPage />}
      {activeCategory === 'movies' && <MoviesPage />}
      {activeCategory === 'series' && <SeriesPage />}
      {activeCategory === 'animes' && <AnimesPage />}
      {activeCategory === 'books' && <BooksPage />}
      {activeCategory === 'comics' && <ComicsPage />}
    </div>
  );
}
