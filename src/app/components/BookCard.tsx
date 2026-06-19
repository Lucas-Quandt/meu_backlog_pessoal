import { BookOpen, User, Star, Trash2, Edit, CheckCircle, Clock } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const progress = (book.readPages / book.totalPages) * 100;
  const estimatedHoursLeft = Math.ceil(((book.totalPages - book.readPages) / 50) * 1.5);

  return (
    <div className="bg-gradient-to-br from-amber-900/90 to-yellow-900/90 backdrop-blur-sm rounded-lg overflow-hidden border border-amber-700/50 hover:border-amber-500/70 transition-all hover:scale-105 shadow-2xl">
      <div className="relative h-48 bg-gradient-to-br from-amber-800 to-yellow-800">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover opacity-90" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen size={64} className="text-amber-200/50" />
          </div>
        )}
        {book.status === 'completed' && (
          <div className="absolute top-2 right-2 bg-amber-600 text-amber-100 px-2 py-1 rounded flex items-center gap-1 text-xs font-bold border border-amber-400">
            <CheckCircle size={12} />
            Concluído
          </div>
        )}
      </div>

      <div className="p-4 bg-gradient-to-b from-amber-950/80 to-black/60">
        <h3 className="font-bold text-lg mb-1 text-amber-100 truncate" style={{ fontFamily: 'serif' }}>
          {book.title}
        </h3>
        <div className="text-sm text-amber-300/80 mb-3 italic flex items-center gap-1">
          <User size={12} />
          {book.author}
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-xs text-amber-300 mb-1">
            <span>{book.readPages} de {book.totalPages} páginas</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-amber-950/60 rounded-full h-2 overflow-hidden border border-amber-700/40">
            <div
              className="bg-gradient-to-r from-amber-600 to-yellow-600 h-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {book.status !== 'completed' && estimatedHoursLeft > 0 && (
          <div className="text-xs text-amber-300/70 mb-3 flex items-center gap-1">
            <Clock size={12} />
            ~{estimatedHoursLeft}h restantes
          </div>
        )}

        <div className="space-y-1 text-sm text-amber-200/70 mb-3">
          <div><span className="text-amber-300 font-semibold">Gênero:</span> {book.genre}</div>
          <div><span className="text-amber-300 font-semibold">Ano:</span> {book.releaseYear}</div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-yellow-500" fill={i < book.rating ? 'currentColor' : 'none'} />
            ))}
            <span className="ml-1 text-yellow-500">{book.rating}/5</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(book)}
            className="flex-1 bg-amber-700/60 hover:bg-amber-600/80 text-amber-100 px-3 py-2 rounded flex items-center justify-center gap-2 transition-colors border border-amber-600/50"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="flex-1 bg-red-900/60 hover:bg-red-800/80 text-red-100 px-3 py-2 rounded flex items-center justify-center gap-2 transition-colors border border-red-700/50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
