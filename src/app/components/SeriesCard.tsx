import { Tv, Calendar, TrendingUp, Star, Trash2, Edit, Play, Pause } from 'lucide-react';
import { Series } from '../types';

interface SeriesCardProps {
  series: Series;
  onEdit: (series: Series) => void;
  onDelete: (id: string) => void;
}

export function SeriesCard({ series, onEdit, onDelete }: SeriesCardProps) {
  const progress = (series.currentEpisode / series.totalEpisodes) * 100;
  const statusColors = {
    watching: 'from-cyan-500 to-blue-500',
    completed: 'from-green-500 to-emerald-500',
    paused: 'from-yellow-500 to-orange-500',
  };

  const StatusIcon = series.status === 'watching' ? Play : series.status === 'completed' ? Star : Pause;

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-lg overflow-hidden border border-cyan-500/30 hover:border-blue-500/50 transition-all hover:scale-105 shadow-xl">
      <div className="relative h-32 bg-gradient-to-r from-cyan-900 to-blue-900">
        {series.bannerUrl ? (
          <img src={series.bannerUrl} alt={series.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Tv size={48} className="text-cyan-500/50" />
          </div>
        )}
        <div className={`absolute top-2 right-2 bg-gradient-to-r ${statusColors[series.status]} text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-lg`}>
          <StatusIcon size={12} />
          {series.status === 'watching' ? 'Assistindo' : series.status === 'completed' ? 'Completo' : 'Pausado'}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-white truncate">{series.title}</h3>

        <div className="mb-3">
          <div className="flex justify-between text-xs text-cyan-300 mb-1">
            <span>Episódio {series.currentEpisode} de {series.totalEpisodes}</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-1 text-sm text-white/70 mb-3">
          <div><span className="text-cyan-400 font-semibold">Plataforma:</span> {series.platform}</div>
          <div><span className="text-cyan-400 font-semibold">Temporadas:</span> {series.currentSeason}/{series.totalSeasons}</div>
          <div><span className="text-cyan-400 font-semibold">Gênero:</span> {series.genre}</div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400" fill="currentColor" />
            <span className="text-yellow-400 font-semibold">{series.rating}/5</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(series)}
            className="flex-1 bg-cyan-600/80 hover:bg-cyan-500 text-white px-3 py-2 rounded flex items-center justify-center gap-2 transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(series.id)}
            className="flex-1 bg-red-600/80 hover:bg-red-500 text-white px-3 py-2 rounded flex items-center justify-center gap-2 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
