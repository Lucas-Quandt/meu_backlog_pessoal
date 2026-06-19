import { Calendar, Clock, Trophy, Star, Trash2, Edit } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onEdit: (game: Game) => void;
  onDelete: (id: string) => void;
}

export function GameCard({ game, onEdit, onDelete }: GameCardProps) {
  return (
    <div className="bg-black/40 backdrop-blur-md rounded-[28px] overflow-hidden border hover:border-green-400/60 transition-all duration-300 hover:scale-105 shadow-2xl">
      <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-500 to-blue-500">
        {game.coverUrl ? (
          <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
            {game.title.charAt(0)}
          </div>
        )}
        {game.isPlatinum && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-lg">
            <Trophy size={14} />
            Platinum
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-lg truncate text-white">{game.title}</h3>
          {(game.completionCount || 1) > 1 && (
            <span className="bg-green-500/20 text-green-300 border border-green-500/40 px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap">
              Zerado {game.completionCount}x
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < game.rating ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="text-sm text-white/60">{game.rating}/5</span>
        </div>

        <div className="space-y-1 text-sm text-white/70 mb-3">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{new Date(game.completedDate).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{game.hoursToComplete}h para zerar</span>
          </div>
          <div><span className="text-white/90 font-semibold">Plataforma:</span> {game.platform}</div>
          <div><span className="text-white/90 font-semibold">Lançamento:</span> {game.releaseYear}</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(game)}
            className="flex-1 bg-blue-600/80 hover:bg-blue-500 text-white px-3 py-2 rounded flex items-center justify-center gap-2 transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(game.id)}
            className="flex-1 bg-red-600/80 hover:bg-red-500 text-white px-3 py-2 rounded flex items-center justify-center gap-2 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
