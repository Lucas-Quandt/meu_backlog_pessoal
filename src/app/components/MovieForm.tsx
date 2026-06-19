import { X } from 'lucide-react';
import { useState } from 'react';
import { Movie } from '../types';

interface MovieFormProps {
  movie?: Movie;
  onSave: (movie: Omit<Movie, 'id'>) => void;
  onClose: () => void;
}

const genres = ['Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção Científica', 'Terror', 'Suspense', 'Romance', 'Animação', 'Documentário'];

export function MovieForm({ movie, onSave, onClose }: MovieFormProps) {
  const [formData, setFormData] = useState({
    title: movie?.title || '',
    posterUrl: movie?.posterUrl || '',
    director: movie?.director || '',
    releaseYear: movie?.releaseYear || new Date().getFullYear(),
    watchedDate: movie?.watchedDate || new Date().toISOString().split('T')[0],
    duration: movie?.duration || 0,
    rating: movie?.rating || 5,
    genre: movie?.genre || 'Ação',
    notes: movie?.notes || '',
    watchCount: movie?.watchCount || 1,
    isRewatch: movie?.isRewatch || false,
  });

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-yellow-900/90 to-black/90 backdrop-blur-xl rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-yellow-600/30">
        <div className="sticky top-0 bg-gradient-to-r from-red-900 to-yellow-900 px-6 py-4 flex items-center justify-between border-b border-yellow-600/30">
          <h2 className="text-2xl font-bold text-yellow-100">{movie ? 'Editar Filme' : 'Adicionar Filme'}</h2>
          <button onClick={onClose} className="text-yellow-300 hover:text-yellow-100">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-100">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-black/40 border border-yellow-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 text-yellow-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-100">URL do Poster</label>
            <input
              type="url"
              value={formData.posterUrl}
              onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
              className="w-full px-3 py-2 bg-black/40 border border-yellow-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 text-yellow-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-yellow-100">Diretor</label>
              <input
                type="text"
                value={formData.director}
                onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-yellow-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 text-yellow-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-yellow-100">Gênero</label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-yellow-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 text-yellow-100"
              >
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-yellow-100">Ano de Lançamento</label>
              <input
                type="number"
                value={formData.releaseYear}
                onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-black/40 border border-yellow-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 text-yellow-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-yellow-100">Duração (min)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-black/40 border border-yellow-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 text-yellow-100"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-100">Data Assistido</label>
            <input
              type="date"
              value={formData.watchedDate}
              onChange={(e) => setFormData({ ...formData, watchedDate: e.target.value })}
              className="w-full px-3 py-2 bg-black/40 border border-yellow-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 text-yellow-100"
              required
            />
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-yellow-100">Quantas vezes assistiu</label>
              <input
                type="number"
                min="1"
                value={formData.watchCount}
                onChange={(e) => setFormData({ ...formData, watchCount: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-black/40 border border-yellow-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 text-yellow-100"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-3 text-yellow-100 font-semibold">
                <input
                  type="checkbox"
                  checked={formData.isRewatch}
                  onChange={(e) => setFormData({ ...formData, isRewatch: e.target.checked })}
                  className="w-5 h-5"
                />
                Reassistido
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-100">Nota: {formData.rating}/5</label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-100">Observações</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 bg-black/40 border border-yellow-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 text-yellow-100"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-gradient-to-r from-red-700 to-yellow-700 hover:from-red-600 hover:to-yellow-600 text-yellow-100 py-3 rounded-lg font-semibold">
              {movie ? 'Salvar' : 'Adicionar'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-black/60 hover:bg-black/80 text-yellow-100 py-3 rounded-lg font-semibold border border-yellow-600/30">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
