import { useState, useEffect } from 'react';
import { Plus, Sparkles, Star, Play, CheckCircle } from 'lucide-react';
import { Anime } from '../types';
import { AnimeCard } from '../components/AnimeCard';
import { AnimeForm } from '../components/AnimeForm';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';

export function AnimesPage() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAnime, setEditingAnime] = useState<Anime | undefined>();

  useEffect(() => { fetchAnimes(); }, []);

  const fetchAnimes = async () => {
    const { data, error } = await supabase.from('animes').select('*');
    if (error) { toast.error('Erro ao carregar animes'); return; }
    setAnimes((data || []).map(dbToAnime));
    setLoading(false);
  };

  const dbToAnime = (d: any): Anime => ({
    id: d.id, title: d.title, coverUrl: d.cover_url, studio: d.studio,
    releaseYear: d.release_year, totalEpisodes: d.total_episodes,
    watchedEpisodes: d.watched_episodes, status: d.status,
    rating: d.rating, type: d.type, notes: d.notes,
  });

  const animeToDb = (a: Anime) => ({
    id: a.id, title: a.title, cover_url: a.coverUrl, studio: a.studio,
    release_year: a.releaseYear, total_episodes: a.totalEpisodes,
    watched_episodes: a.watchedEpisodes, status: a.status,
    rating: a.rating, type: a.type, notes: a.notes,
  });

  const stats = {
    total: animes.length,
    watching: animes.filter(a => a.status === 'watching').length,
    completed: animes.filter(a => a.status === 'completed').length,
    avgRating: animes.length > 0 ? (animes.reduce((sum, a) => sum + a.rating, 0) / animes.length).toFixed(1) : '0',
  };

  const handleSave = async (animeData: Omit<Anime, 'id'>) => {
    if (editingAnime) {
      const updated = { ...animeData, id: editingAnime.id };
      const { error } = await supabase.from('animes').update(animeToDb(updated)).eq('id', editingAnime.id);
      if (error) { toast.error('Erro ao atualizar'); return; }
      setAnimes(animes.map(a => a.id === editingAnime.id ? updated : a));
      toast.success('Anime atualizado!');
    } else {
      const newAnime = { ...animeData, id: Date.now().toString() };
      const { error } = await supabase.from('animes').insert(animeToDb(newAnime));
      if (error) { toast.error('Erro ao adicionar'); return; }
      setAnimes([...animes, newAnime]);
      toast.success('Anime adicionado!');
    }
    setShowForm(false);
    setEditingAnime(undefined);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deletar este anime?')) return;
    const { error } = await supabase.from('animes').delete().eq('id', id);
    if (error) { toast.error('Erro ao deletar'); return; }
    setAnimes(animes.filter(a => a.id !== id));
    toast.success('Anime deletado!');
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-black">Carregando...</div>;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,500 Q300,300 500,500 T900,500" fill="none" stroke="black" strokeWidth="80" opacity="0.3" />
          <path d="M200,200 Q400,400 600,200 T1000,200" fill="none" stroke="black" strokeWidth="60" opacity="0.2" />
          <path d="M50,800 Q250,600 450,800 T850,800" fill="none" stroke="black" strokeWidth="100" opacity="0.15" />
        </svg>
      </div>
      <div className="absolute top-20 right-20 text-pink-500 opacity-20 font-black text-9xl transform rotate-12">★</div>
      <div className="absolute bottom-20 left-20 text-yellow-500 opacity-20 font-black text-9xl transform -rotate-12">✦</div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-black mb-2" style={{ color: 'black', textShadow: '6px 6px 0 #ff1493, -6px -6px 0 #ffff00' }}>アニメ</h1>
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-yellow-500">ANIMES</h2>
          <p className="text-gray-600 font-bold mt-2">Visual Novel Style</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total de Animes', val: stats.total, icon: Sparkles, shadow: '#ff1493' },
            { label: 'Assistindo', val: stats.watching, icon: Play, shadow: '#ffff00' },
            { label: 'Completos', val: stats.completed, icon: CheckCircle, shadow: '#00ff00' },
            { label: 'Nota Média', val: stats.avgRating, icon: Star, shadow: '#ff8800' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border-4 border-black" style={{ boxShadow: `8px 8px 0 0 ${s.shadow}` }}>
              <div className="flex items-center justify-between mb-2"><s.icon className="text-pink-500" size={28} /><span className="text-4xl font-black text-black">{s.val}</span></div>
              <div className="text-sm font-bold text-gray-700">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white px-8 py-3 rounded-xl flex items-center gap-2 transition-all font-black text-lg border-4 border-black shadow-[6px_6px_0_0_#000]">
            <Plus size={24} />ADICIONAR ANIME
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {animes.map(anime => (
            <AnimeCard key={anime.id} anime={anime} onEdit={(a) => { setEditingAnime(a); setShowForm(true); }} onDelete={handleDelete} />
          ))}
        </div>
      </div>
      {showForm && <AnimeForm anime={editingAnime} onSave={handleSave} onClose={() => { setShowForm(false); setEditingAnime(undefined); }} />}
    </div>
  );
}
