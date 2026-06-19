import { Sparkles, Star, Trash2, Edit, Play, CheckCircle, Pause } from 'lucide-react';
import { Anime } from '../types';

interface AnimeCardProps {
  anime: Anime;
  onEdit: (anime: Anime) => void;
  onDelete: (id: string) => void;
}

export function AnimeCard({ anime, onEdit, onDelete }: AnimeCardProps) {
  const progress = (anime.watchedEpisodes / anime.totalEpisodes) * 100;
  const statusIcons = {
    watching: Play,
    completed: CheckCircle,
    paused: Pause,
  };
  const StatusIcon = statusIcons[anime.status];

  return (
    <div className="bg-white rounded-xl overflow-hidden border-4 border-black shadow-[8px_8px_0_0_#ff1493] hover:shadow-[12px_12px_0_0_#ffff00] transition-all hover:-translate-x-1 hover:-translate-y-1">
      <div className="relative h-56 bg-gradient-to-br from-pink-500 to-yellow-400">
        {anime.coverUrl ? (
          <img src={anime.coverUrl} alt={anime.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Sparkles size={64} className="text-white/50" />
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 font-black text-xs border-2 border-white">
          {anime.type}
        </div>
        <div className={`absolute top-3 left-3 ${
          anime.status === 'watching' ? 'bg-pink-500' :
          anime.status === 'completed' ? 'bg-yellow-500' : 'bg-gray-700'
        } text-white px-3 py-1 font-black text-xs border-2 border-white flex items-center gap-1`}>
          <StatusIcon size={12} />
          {anime.status === 'watching' ? 'ASSISTINDO' : anime.status === 'completed' ? 'COMPLETO' : 'PAUSADO'}
        </div>
      </div>

      <div className="p-4 bg-white">
        <h3 className="font-black text-lg mb-2 truncate text-black">{anime.title}</h3>

        <div className="mb-3">
          <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
            <span>EP {anime.watchedEpisodes}/{anime.totalEpisodes}</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden border-2 border-black">
            <div
              className="bg-gradient-to-r from-pink-500 to-yellow-500 h-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-1 text-sm text-gray-800 mb-3 font-bold">
          <div><span className="text-pink-600">Estúdio:</span> {anime.studio}</div>
          <div><span className="text-pink-600">Ano:</span> {anime.releaseYear}</div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-yellow-500" fill={i < anime.rating ? 'currentColor' : 'none'} />
            ))}
            <span className="ml-1">{anime.rating}/5</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(anime)}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors font-black border-2 border-black"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(anime.id)}
            className="flex-1 bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors font-black"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
