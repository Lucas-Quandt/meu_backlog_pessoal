import { Film, Calendar, Clock, Star, Trash2, Edit } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

export function MovieCard({ movie, onEdit, onDelete }: MovieCardProps) {
  return (
    <div className="bg-gradient-to-b from-yellow-900/20 to-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-yellow-600/30 hover:border-red-600/50 transition-all hover:scale-105 shadow-2xl">
      <div className="relative aspect-[2/3] bg-gradient-to-br from-red-900 to-black">
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Film size={64} className="text-yellow-600/50" />
          </div>
        )}
      </div>

      <div className="p-4 bg-gradient-to-b from-transparent to-black/60">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-lg text-yellow-100 truncate">{movie.title}</h3>
          {(movie.watchCount || 1) > 1 && (
            <span className="bg-yellow-500/20 text-yellow-200 border border-yellow-500/40 px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap">
              Assistido {movie.watchCount}x
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-yellow-500" fill={i < movie.rating ? 'currentColor' : 'none'} />
            ))}
          </div>
        </div>

        <div className="space-y-1 text-sm text-yellow-100/70 mb-3">
          <div className="text-yellow-300 font-semibold">{movie.director}</div>
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{new Date(movie.watchedDate).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{movie.duration} min</span>
          </div>
          <div><span className="text-yellow-100 font-semibold">Ano:</span> {movie.releaseYear}</div>
          <div><span className="text-yellow-100 font-semibold">Gênero:</span> {movie.genre}</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(movie)}
            className="flex-1 bg-yellow-700/60 hover:bg-yellow-600/80 text-yellow-100 px-3 py-2 rounded flex items-center justify-center gap-2 transition-colors border border-yellow-600/40"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(movie.id)}
            className="flex-1 bg-red-900/60 hover:bg-red-800/80 text-red-100 px-3 py-2 rounded flex items-center justify-center gap-2 transition-colors border border-red-700/40"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
