import { useState, useEffect } from 'react';
import { Plus, Tv, Star, Play } from 'lucide-react';
import { Series } from '../types';
import { SeriesCard } from '../components/SeriesCard';
import { SeriesForm } from '../components/SeriesForm';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';

export function SeriesPage() {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSeries, setEditingSeries] = useState<Series | undefined>();

  useEffect(() => { fetchSeries(); }, []);

  const fetchSeries = async () => {
    const { data, error } = await supabase.from('series').select('*');
    if (error) { toast.error('Erro ao carregar séries'); return; }
    setSeries((data || []).map(dbToSeries));
    setLoading(false);
  };

  const dbToSeries = (d: any): Series => ({
    id: d.id, title: d.title, bannerUrl: d.banner_url, platform: d.platform,
    releaseYear: d.release_year, totalSeasons: d.total_seasons,
    currentSeason: d.current_season, currentEpisode: d.current_episode,
    totalEpisodes: d.total_episodes, status: d.status,
    rating: d.rating, genre: d.genre, notes: d.notes,
  });

  const seriesToDb = (s: Series) => ({
    id: s.id, title: s.title, banner_url: s.bannerUrl, platform: s.platform,
    release_year: s.releaseYear, total_seasons: s.totalSeasons,
    current_season: s.currentSeason, current_episode: s.currentEpisode,
    total_episodes: s.totalEpisodes, status: s.status,
    rating: s.rating, genre: s.genre, notes: s.notes,
  });

  const stats = {
    total: series.length,
    watching: series.filter(s => s.status === 'watching').length,
    completed: series.filter(s => s.status === 'completed').length,
    avgRating: series.length > 0 ? (series.reduce((sum, s) => sum + s.rating, 0) / series.length).toFixed(1) : '0',
  };

  const currentlyWatching = series.find(s => s.status === 'watching');

  const handleSave = async (seriesData: Omit<Series, 'id'>) => {
    if (editingSeries) {
      const updated = { ...seriesData, id: editingSeries.id };
      const { error } = await supabase.from('series').update(seriesToDb(updated)).eq('id', editingSeries.id);
      if (error) { toast.error('Erro ao atualizar'); return; }
      setSeries(series.map(s => s.id === editingSeries.id ? updated : s));
      toast.success('Série atualizada!');
    } else {
      const newSeries = { ...seriesData, id: Date.now().toString() };
      const { error } = await supabase.from('series').insert(seriesToDb(newSeries));
      if (error) { toast.error('Erro ao adicionar'); return; }
      setSeries([...series, newSeries]);
      toast.success('Série adicionada!');
    }
    setShowForm(false);
    setEditingSeries(undefined);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deletar esta série?')) return;
    const { error } = await supabase.from('series').delete().eq('id', id);
    if (error) { toast.error('Erro ao deletar'); return; }
    setSeries(series.filter(s => s.id !== id));
    toast.success('Série deletada!');
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-950 to-blue-950 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">Séries</h1>
          <p className="text-cyan-100/60">Streaming Futurista</p>
        </div>
        {currentlyWatching && (
          <div className="mb-8 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl">
            <div className="relative h-64">
              {currentlyWatching.bannerUrl ? (
                <img src={currentlyWatching.bannerUrl} alt={currentlyWatching.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-cyan-900 to-blue-900 flex items-center justify-center">
                  <Tv size={96} className="text-cyan-500/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-cyan-400 text-sm mb-2"><Play size={16} fill="currentColor" /><span className="font-bold">ASSISTINDO AGORA</span></div>
                <h2 className="text-4xl font-bold text-white mb-2">{currentlyWatching.title}</h2>
                <div className="flex items-center gap-4 text-sm text-cyan-200 mb-3">
                  <span>{currentlyWatching.platform}</span><span>•</span>
                  <span>Temporada {currentlyWatching.currentSeason}</span><span>•</span>
                  <span>Episódio {currentlyWatching.currentEpisode}/{currentlyWatching.totalEpisodes}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden max-w-md">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full" style={{ width: `${(currentlyWatching.currentEpisode / currentlyWatching.totalEpisodes) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total de Séries', val: stats.total, icon: Tv, color: 'cyan' },
            { label: 'Assistindo', val: stats.watching, icon: Play, color: 'blue' },
            { label: 'Completas', val: stats.completed, icon: Star, color: 'green' },
            { label: 'Nota Média', val: stats.avgRating, icon: Star, color: 'yellow' },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-2"><s.icon className="text-white/60" size={24} /><span className="text-3xl font-bold text-white">{s.val}</span></div>
              <div className="text-sm text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all font-semibold shadow-lg">
            <Plus size={20} />Adicionar Série
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {series.map(s => (
            <SeriesCard key={s.id} series={s} onEdit={(ser) => { setEditingSeries(ser); setShowForm(true); }} onDelete={handleDelete} />
          ))}
        </div>
      </div>
      {showForm && <SeriesForm series={editingSeries} onSave={handleSave} onClose={() => { setShowForm(false); setEditingSeries(undefined); }} />}
    </div>
  );
}
