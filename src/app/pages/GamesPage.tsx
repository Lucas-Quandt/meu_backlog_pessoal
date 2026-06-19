import gamesBg from '../../assets/games-bg.png';
import { useState, useEffect } from 'react';
import { ChevronDown, Plus, Filter, SortAsc, Trophy, Clock, Star, TrendingUp } from 'lucide-react';
import { Game, SortOption, FilterOption } from '../types';
import { GameCard } from '../components/GameCard';
import { GameForm } from '../components/GameForm';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';

export function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | undefined>();
  const [showMostCompleted, setShowMostCompleted] = useState(false);
  const [showLongestGames, setShowLongestGames] = useState(false);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const { data, error } = await supabase.from('games').select('*').order('completed_date', { ascending: false });
    if (error) { toast.error('Erro ao carregar jogos'); return; }
    setGames((data || []).map(dbToGame));
    setLoading(false);
  };

  const dbToGame = (d: any): Game => ({
    id: d.id, title: d.title, coverUrl: d.cover_url, platform: d.platform,
    releaseYear: d.release_year, completedDate: d.completed_date,
    hoursToComplete: d.hours_to_complete, rating: d.rating,
    isPlatinum: d.is_platinum, completionCount: d.completion_count,
    isReplay: d.is_replay, notes: d.notes,
  });

  const gameToDb = (g: Game) => ({
    id: g.id, title: g.title, cover_url: g.coverUrl, platform: g.platform,
    release_year: g.releaseYear, completed_date: g.completedDate,
    hours_to_complete: g.hoursToComplete, rating: g.rating,
    is_platinum: g.isPlatinum, completion_count: g.completionCount,
    is_replay: g.isReplay, notes: g.notes,
  });

  const platforms = Array.from(new Set(games.map(g => g.platform))).sort();

  const filteredAndSortedGames = games
    .filter(game => {
      if (selectedPlatform !== 'all' && game.platform !== selectedPlatform) return false;
      if (filterBy === 'platinum' && !game.isPlatinum) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent': return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
        case 'oldest': return new Date(a.completedDate).getTime() - new Date(b.completedDate).getTime();
        case 'mostHours': return b.hoursToComplete - a.hoursToComplete;
        case 'leastHours': return a.hoursToComplete - b.hoursToComplete;
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

  const stats = {
    total: games.length,
    platinum: games.filter(g => g.isPlatinum).length,
    totalHours: games.reduce((sum, g) => sum + g.hoursToComplete, 0),
    avgRating: games.length > 0 ? (games.reduce((sum, g) => sum + g.rating, 0) / games.length).toFixed(1) : '0',
  };

  const mostCompletedGames = [...games].sort((a, b) => (b.completionCount || 1) - (a.completionCount || 1)).slice(0, 5);
  const longestSingleRunGames = [...games].filter(g => (g.completionCount || 1) === 1).sort((a, b) => b.hoursToComplete - a.hoursToComplete).slice(0, 5);
  const lastCompleted = games.length > 0
    ? [...games].sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime())[0]
    : null;

  const handleAddGame = async (gameData: Omit<Game, 'id'>) => {
    if (editingGame) {
      const updated = { ...gameData, id: editingGame.id };
      const { error } = await supabase.from('games').update(gameToDb(updated)).eq('id', editingGame.id);
      if (error) { toast.error('Erro ao atualizar'); return; }
      setGames(games.map(g => g.id === editingGame.id ? updated : g));
      toast.success('Jogo atualizado!');
    } else {
      const newGame = { ...gameData, id: Date.now().toString(), completionCount: gameData.completionCount || 1 };
      const { error } = await supabase.from('games').insert(gameToDb(newGame));
      if (error) { toast.error('Erro ao adicionar'); return; }
      setGames([...games, newGame]);
      toast.success('Operação realizada!');
    }
    setShowForm(false);
    setEditingGame(undefined);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deletar este jogo?')) return;
    const { error } = await supabase.from('games').delete().eq('id', id);
    if (error) { toast.error('Erro ao deletar'); return; }
    setGames(games.filter(g => g.id !== id));
    toast.success('Jogo deletado!');
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Carregando...</div>;

  return (
    <div
      className="min-h-screen relative overflow-hidden font-sans text-white bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.82), rgba(0,0,0,0.92)), url(${gamesBg})` }}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400 mb-2 tracking-tighter">Games</h1>
          <p className="text-white/40 uppercase text-xs tracking-widest font-semibold">Seu arsenal gamer definitivo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Jogos Zerados', val: stats.total, icon: Trophy },
            { label: 'Platinados', val: stats.platinum, icon: Trophy },
            { label: 'Horas Jogadas', val: `${stats.totalHours}h`, icon: Clock },
            { label: 'Nota Média', val: stats.avgRating, icon: Star }
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-900/40 backdrop-blur-md rounded-none p-6 border border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="text-zinc-400" size={20} />
                <span className="text-3xl font-mono font-bold text-white">{stat.val}</span>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>

        {lastCompleted && (
          <div className="bg-zinc-900/40 backdrop-blur-md rounded-none p-6 mb-8 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="text-green-500" size={20} />
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">Último Jogo Zerado</h3>
            </div>
            <div className="text-2xl font-bold text-white">{lastCompleted.title}</div>
            <div className="text-white/40 text-xs mt-1">
              {new Date(lastCompleted.completedDate).toLocaleDateString('pt-BR')} · {lastCompleted.hoursToComplete}h
            </div>
          </div>
        )}

        <div className="space-y-4 mb-6">
          {[
            { title: '🏆 Jogos Mais Zerados', state: showMostCompleted, setter: setShowMostCompleted, data: mostCompletedGames, suffix: 'x zerado', valKey: 'completionCount' },
            { title: '⏳ Jogos com Mais Horas', state: showLongestGames, setter: setShowLongestGames, data: longestSingleRunGames, suffix: 'h', valKey: 'hoursToComplete' }
          ].map((acc, i) => (
            <div key={i} className="bg-zinc-900/50 rounded-none border border-zinc-800 overflow-hidden">
              <button onClick={() => acc.setter(!acc.state)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">{acc.title}</h3>
                <ChevronDown className={`text-zinc-500 transition-transform ${acc.state ? 'rotate-180' : ''}`} />
              </button>
              {acc.state && (
                <div className="px-5 pb-5 space-y-2">
                  {acc.data.map((game) => (
                    <div key={game.id} className="flex items-center justify-between bg-black/40 border border-white/5 p-3">
                      <span className="text-white text-sm">{game.title}</span>
                      <span className="text-green-500 font-mono text-xs">{game[acc.valKey as keyof typeof game] || 1}{acc.suffix}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-zinc-900/50 p-4 mb-6 border border-zinc-800">
          <div className="flex flex-wrap gap-4 items-center">
            <button onClick={() => setShowForm(true)} className="bg-white text-black px-6 py-2 rounded-none font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors">
              <Plus size={16} className="inline mr-2" /> Adicionar Jogo
            </button>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-white/40" />
              <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)} className="bg-zinc-800 text-white border border-zinc-700 p-2 text-xs uppercase rounded-none focus:outline-none focus:border-green-500">
                <option value="all">Todas as Plataformas</option>
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <select value={filterBy} onChange={(e) => setFilterBy(e.target.value as FilterOption)} className="bg-zinc-800 text-white border border-zinc-700 p-2 text-xs uppercase rounded-none focus:outline-none focus:border-green-500">
              <option value="all">Todos os Status</option>
              <option value="platinum">Apenas Platinados</option>
            </select>
            <div className="flex items-center gap-2 ml-auto">
              <SortAsc size={16} className="text-white/40" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="bg-zinc-800 text-white border border-zinc-700 p-2 text-xs uppercase rounded-none focus:outline-none focus:border-green-500">
                <option value="recent">Mais Recentes</option>
                <option value="oldest">Mais Antigos</option>
                <option value="mostHours">Mais Horas</option>
                <option value="leastHours">Menos Horas</option>
                <option value="rating">Melhor Nota</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 [&_*]:rounded-none">
          {filteredAndSortedGames.map(game => (
            <div key={game.id} className="border border-white/10 p-[1px] hover:border-green-500/50 transition-colors">
              <GameCard game={game} onEdit={(g) => { setEditingGame(g); setShowForm(true); }} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white p-6 w-full max-w-md rounded-none shadow-2xl text-black [&_label]:text-black [&_h2]:text-black [&_p]:text-black">
            <GameForm game={editingGame} onSave={handleAddGame} onClose={() => { setShowForm(false); setEditingGame(undefined); }} />
          </div>
        </div>
      )}
    </div>
  );
}
