import { X } from 'lucide-react';
import { useState } from 'react';
import { Book } from '../types';

interface BookFormProps {
  book?: Book;
  onSave: (book: Omit<Book, 'id'>) => void;
  onClose: () => void;
}

const genres = ['Ficção', 'Não-Ficção', 'Fantasia', 'Mistério', 'Romance', 'Biografia', 'História', 'Ficção Científica', 'Suspense', 'Autoajuda'];

export function BookForm({ book, onSave, onClose }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    coverUrl: book?.coverUrl || '',
    author: book?.author || '',
    releaseYear: book?.releaseYear || new Date().getFullYear(),
    totalPages: book?.totalPages || 0,
    readPages: book?.readPages || 0,
    status: book?.status || 'reading' as const,
    rating: book?.rating || 5,
    genre: book?.genre || 'Ficção',
    startedDate: book?.startedDate || new Date().toISOString().split('T')[0],
    completedDate: book?.completedDate || '',
    notes: book?.notes || '',
  });

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-amber-900 to-yellow-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-amber-700 shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-amber-800 to-yellow-800 px-6 py-4 flex items-center justify-between border-b border-amber-700">
          <h2 className="text-2xl font-bold text-amber-100" style={{ fontFamily: 'serif' }}>
            {book ? 'Editar Livro' : 'Adicionar Livro'}
          </h2>
          <button onClick={onClose} className="text-amber-300 hover:text-amber-100">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1 text-amber-100">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-black/30 border border-amber-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-amber-100">URL da Capa</label>
            <input
              type="url"
              value={formData.coverUrl}
              onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
              className="w-full px-3 py-2 bg-black/30 border border-amber-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1 text-amber-100">Autor</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 bg-black/30 border border-amber-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-amber-100">Gênero</label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full px-3 py-2 bg-black/30 border border-amber-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-100"
              >
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1 text-amber-100">Páginas Lidas</label>
              <input
                type="number"
                value={formData.readPages}
                onChange={(e) => setFormData({ ...formData, readPages: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-black/30 border border-amber-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-100"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-amber-100">Total de Páginas</label>
              <input
                type="number"
                value={formData.totalPages}
                onChange={(e) => setFormData({ ...formData, totalPages: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-black/30 border border-amber-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-100"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-amber-100">Ano</label>
              <input
                type="number"
                value={formData.releaseYear}
                onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-black/30 border border-amber-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-100"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-amber-100">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 bg-black/30 border border-amber-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-100"
            >
              <option value="reading">Lendo</option>
              <option value="completed">Concluído</option>
              <option value="paused">Pausado</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1 text-amber-100">Data de Início</label>
              <input
                type="date"
                value={formData.startedDate}
                onChange={(e) => setFormData({ ...formData, startedDate: e.target.value })}
                className="w-full px-3 py-2 bg-black/30 border border-amber-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-100"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-amber-100">Data de Conclusão</label>
              <input
                type="date"
                value={formData.completedDate}
                onChange={(e) => setFormData({ ...formData, completedDate: e.target.value })}
                className="w-full px-3 py-2 bg-black/30 border border-amber-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-amber-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-amber-100">Nota: {formData.rating}/5</label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-gradient-to-r from-amber-700 to-yellow-700 hover:from-amber-600 hover:to-yellow-600 text-amber-100 py-3 rounded-lg font-bold border border-amber-600">
              {book ? 'Salvar' : 'Adicionar'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-black/60 hover:bg-black/80 text-amber-100 py-3 rounded-lg font-bold border border-amber-700">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
