import { BookMarked, Star, Trash2, Edit, Zap } from 'lucide-react';
import { Comic } from '../types';

interface ComicCardProps {
  comic: Comic;
  onEdit: (comic: Comic) => void;
  onDelete: (id: string) => void;
}

export function ComicCard({ comic, onEdit, onDelete }: ComicCardProps) {
  const progress = (comic.readIssues / comic.totalIssues) * 100;

  return (
    <div className="bg-white rounded-lg overflow-hidden border-4 border-black relative" style={{
      boxShadow: '8px 8px 0 0 #000000, -8px -8px 0 0 #000000',
    }}>
      {/* Halftone dots background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)',
          backgroundSize: '8px 8px',
        }} />
      </div>

      <div className="relative h-56 bg-gradient-to-br from-cyan-400 to-pink-400">
        {comic.coverUrl ? (
          <img src={comic.coverUrl} alt={comic.title} className="w-full h-full object-contain hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookMarked size={64} className="text-white/50" />
          </div>
        )}

        {/* Comic book badge */}
        <div className="absolute top-3 left-3 bg-yellow-400 text-black px-3 py-1 font-black text-xs border-2 border-black transform -rotate-6">
          {comic.type}
        </div>

        {/* Onomatopoeia decoration */}
        {progress === 100 && (
          <div className="absolute top-2 right-2 bg-yellow-300 text-black px-3 py-2 font-black text-lg border-4 border-black transform rotate-12" style={{
            textShadow: '2px 2px 0 #ff00ff',
          }}>
            POW!
          </div>
        )}
      </div>

      <div className="p-4 relative">
        <h3 className="font-black text-lg mb-1 truncate text-black uppercase">{comic.title}</h3>
        <div className="text-sm font-bold text-gray-700 mb-3">{comic.author}</div>

        <div className="mb-3">
          <div className="flex justify-between text-xs font-black text-black mb-1">
            <span>EDIÇÃO {comic.readIssues}/{comic.totalIssues}</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-none h-4 overflow-hidden border-2 border-black">
            <div
              className="h-full transition-all"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #000000 0%, #000000 50%, #000000 100%)',
              }}
            />
          </div>
        </div>

        <div className="space-y-1 text-sm font-bold text-gray-800 mb-3">
          <div><span className="text-black">Editora:</span> {comic.publisher}</div>
          <div><span className="text-black">Ano:</span> {comic.releaseYear}</div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < comic.rating ? '#ffff00' : 'none'} stroke="#000" strokeWidth={2} />
            ))}
            <span className="ml-1">{comic.rating}/5</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(comic)}
            className="flex-1 bg-cyan-400 hover:bg-cyan-500 text-black px-3 py-2 rounded-none flex items-center justify-center gap-2 transition-colors font-black border-2 border-black"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(comic.id)}
            className="flex-1 bg-pink-400 hover:bg-pink-500 text-black px-3 py-2 rounded-none flex items-center justify-center gap-2 transition-colors font-black border-2 border-black"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
