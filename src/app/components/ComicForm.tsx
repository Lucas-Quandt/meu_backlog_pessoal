import { X } from 'lucide-react';
import { useState } from 'react';
import { Comic } from '../types';

interface ComicFormProps {
  comic?: Comic;
  onSave: (comic: Omit<Comic, 'id'>) => void;
  onClose: () => void;
}

export function ComicForm({ comic, onSave, onClose }: ComicFormProps) {
  const [formData, setFormData] = useState({
    title: comic?.title || '',
    coverUrl: comic?.coverUrl || '',
    author: comic?.author || '',
    publisher: comic?.publisher || '',
    releaseYear: comic?.releaseYear || new Date().getFullYear(),
    totalIssues: comic?.totalIssues || 1,
    readIssues: comic?.readIssues || 0,
    status: comic?.status || 'reading' as const,
    rating: comic?.rating || 5,
    type: comic?.type || 'Manga' as const,
    notes: comic?.notes || '',
  });

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-none max-w-2xl w-full max-h-[90vh] overflow-y-auto border-8 border-black" style={{
        boxShadow: '16px 16px 0 0 #00ffff, -16px -16px 0 0 #ff00ff',
      }}>
        <div className="sticky top-0 bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 px-6 py-4 flex items-center justify-between border-b-4 border-black">
          <h2 className="text-3xl font-black text-black" style={{
            textShadow: '3px 3px 0 #ff00ff',
          }}>
            {comic ? 'EDITAR' : 'NOVO'}
          </h2>
          <button onClick={onClose} className="text-black hover:scale-110 transition-transform font-black">
            <X size={32} strokeWidth={4} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-black mb-1 text-black uppercase">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border-4 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-cyan-400 font-bold uppercase"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-black mb-1 text-black uppercase">URL da Capa</label>
            <input
              type="url"
              value={formData.coverUrl}
              onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
              className="w-full px-3 py-2 border-4 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-cyan-400 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-black mb-1 text-black uppercase">Autor</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 border-4 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-pink-400 font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-black mb-1 text-black uppercase">Editora</label>
              <input
                type="text"
                value={formData.publisher}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                className="w-full px-3 py-2 border-4 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-pink-400 font-bold"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-black mb-1 text-black uppercase">Tipo</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 border-4 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold"
              >
                <option value="Manga">Manga</option>
                <option value="Comic">Comic</option>
                <option value="Graphic Novel">Graphic Novel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-black mb-1 text-black uppercase">Ano</label>
              <input
                type="number"
                value={formData.releaseYear}
                onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border-4 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-black mb-1 text-black uppercase">Edições Lidas</label>
              <input
                type="number"
                value={formData.readIssues}
                onChange={(e) => setFormData({ ...formData, readIssues: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border-4 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-cyan-400 font-bold"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-black mb-1 text-black uppercase">Total de Edições</label>
              <input
                type="number"
                value={formData.totalIssues}
                onChange={(e) => setFormData({ ...formData, totalIssues: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border-4 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-cyan-400 font-bold"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-black mb-1 text-black uppercase">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border-4 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-pink-400 font-bold"
            >
              <option value="reading">Lendo</option>
              <option value="completed">Completo</option>
              <option value="paused">Pausado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-black mb-1 text-black uppercase">Nota: {formData.rating}/5</label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full h-4"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 hover:from-cyan-500 hover:via-pink-500 hover:to-yellow-500 text-black py-4 rounded-none font-black text-lg border-4 border-black uppercase" style={{
              textShadow: '2px 2px 0 #fff',
            }}>
              {comic ? 'SALVAR' : 'CRIAR'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-black hover:bg-gray-800 text-white py-4 rounded-none font-black text-lg border-4 border-black uppercase">
              SAIR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
