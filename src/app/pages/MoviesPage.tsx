import { useState, useEffect } from 'react';
import { Plus, Film, Star, Clock } from 'lucide-react';
import { Movie } from '../types';
import { MovieCard } from '../components/MovieCard';
import { MovieForm } from '../components/MovieForm';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';

export function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>();

  useEffect(() => { fetchMovies(); }, []);

  const fetchMovies = async () => {
    const { data, error } = await supabase.from('movies').select('*');
    if (error) { toast.error('Erro ao carregar filmes'); return; }
    setMovies((data || []).map(dbToMovie));
    setLoading(false);
  };

  const dbToMovie = (d: any): Movie => ({
    id: d.id, title: d.title, posterUrl: d.poster_url, director: d.director,
    releaseYear: d.release_year, watchedDate: d.watched_date,
    duration: d.duration, rating: d.rating, genre: d.genre,
    notes: d.notes, watchCount: d.watch_count, isRewatch: d.is_rewatch,
  });

  const movieToDb = (m: Movie) => ({
    id: m.id, title: m.title, poster_url: m.posterUrl, director: m.director,
    release_year: m.releaseYear, watched_date: m.watchedDate,
    duration: m.duration, rating: m.rating, genre: m.genre,
    notes: m.notes, watch_count: m.watchCount, is_rewatch: m.isRewatch,
  });

  const stats = {
    total: movies.length,
    totalMinutes: movies.reduce((sum, m) => sum + m.duration, 0),
    avgRating: movies.length > 0 ? (movies.reduce((sum, m) => sum + m.rating, 0) / movies.length).toFixed(1) : '0',
  };

  const handleSave = async (movieData: Omit<Movie, 'id'>) => {
    if (editingMovie) {
      const updated = { ...movieData, id: editingMovie.id };
      const { error } = await supabase.from('movies').update(movieToDb(updated)).eq('id', editingMovie.id);
      if (error) { toast.error('Erro ao atualizar'); return; }
      setMovies(movies.map(m => m.id === editingMovie.id ? updated : m));
      toast.success('Filme atualizado!');
    } else {
      const newMovie = { ...movieData, id: Date.now().toString(), watchCount: movieData.watchCount || 1 };
      const { error } = await supabase.from('movies').insert(movieToDb(newMovie));
      if (error) { toast.error('Erro ao adicionar'); return; }
      setMovies([...movies, newMovie]);
      toast.success('Filme adicionado!');
    }
    setShowForm(false);
    setEditingMovie(undefined);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deletar este filme?')) return;
    const { error } = await supabase.from('movies').delete().eq('id', id);
    if (error) { toast.error('Erro ao deletar'); return; }
    setMovies(movies.filter(m => m.id !== id));
    toast.success('Filme deletado!');
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-yellow-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyYWluIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFpbikiLz48L3N2Zz4=')]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-orange-400 mb-2">Filmes</h1>
          <p className="text-yellow-100/60 italic">Cinema Clássico</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-yellow-900/40 to-red-900/40 backdrop-blur-md rounded-xl p-6 border border-yellow-600/40 shadow-2xl">
            <div className="flex items-center justify-between mb-2"><Film className="text-yellow-400" size={28} /><span className="text-4xl font-bold text-yellow-100">{stats.total}</span></div>
            <div className="text-sm text-yellow-100/70">Filmes Assistidos</div>
          </div>
          <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur-md rounded-xl p-6 border border-red-600/40 shadow-2xl">
            <div className="flex items-center justify-between mb-2"><Clock className="text-red-400" size={28} /><span className="text-4xl font-bold text-yellow-100">{Math.floor(stats.totalMinutes / 60)}h</span></div>
            <div className="text-sm text-yellow-100/70">Tempo Assistido</div>
          </div>
          <div className="bg-gradient-to-br from-orange-900/40 to-yellow-900/40 backdrop-blur-md rounded-xl p-6 border border-orange-600/40 shadow-2xl">
            <div className="flex items-center justify-between mb-2"><Star className="text-yellow-500" size={28} /><span className="text-4xl font-bold text-yellow-100">{stats.avgRating}</span></div>
            <div className="text-sm text-yellow-100/70">Nota Média</div>
          </div>
        </div>
        <div className="mb-6">
          <button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-red-700 to-yellow-700 hover:from-red-600 hover:to-yellow-600 text-yellow-100 px-6 py-3 rounded-lg flex items-center gap-2 transition-all font-bold shadow-2xl border border-yellow-600/50">
            <Plus size={20} />Adicionar Filme
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onEdit={(m) => { setEditingMovie(m); setShowForm(true); }} onDelete={handleDelete} />
          ))}
        </div>
      </div>
      {showForm && <MovieForm movie={editingMovie} onSave={handleSave} onClose={() => { setShowForm(false); setEditingMovie(undefined); }} />}
    </div>
  );
}
