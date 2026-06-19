import { X } from 'lucide-react';
import { useState } from 'react';
import { Anime } from '../types';

interface AnimeFormProps {
  anime?: Anime;
  onSave: (anime: Omit<Anime, 'id'>) => void;
  onClose: () => void;
}

export function AnimeForm({ anime, onSave, onClose }: AnimeFormProps) {
  const [formData, setFormData] = useState({
    title: anime?.title || '',
    coverUrl: anime?.coverUrl || '',
    studio: anime?.studio || '',
    releaseYear: anime?.releaseYear || new Date().getFullYear(),
    totalEpisodes: anime?.totalEpisodes || 12,
    watchedEpisodes: anime?.watchedEpisodes || 0,
    status: anime?.status || 'watching' as const,
    rating: anime?.rating || 5,
    type: anime?.type || 'TV' as const,
    notes: anime?.notes || '',
  });

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-black shadow-[16px_16px_0_0_#ff1493]">
        <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-yellow-500 px-6 py-4 flex items-center justify-between border-b-4 border-black">
          <h2 className="text-2xl font-black text-white">{anime ? 'EDITAR ANIME' : 'NOVO ANIME'}</h2>
          <button onClick={onClose} className="text-white hover:text-black font-black">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-black mb-1 text-black">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-black mb-1 text-black">URL da Capa</label>
            <input
              type="url"
              value={formData.coverUrl}
              onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
              className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-black mb-1 text-black">Estúdio</label>
              <input
                type="text"
                value={formData.studio}
                onChange={(e) => setFormData({ ...formData, studio: e.target.value })}
                className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-black mb-1 text-black">Tipo</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold"
              >
                <option value="TV">TV</option>
                <option value="Movie">Movie</option>
                <option value="OVA">OVA</option>
                <option value="ONA">ONA</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-black mb-1 text-black">Episódios Assistidos</label>
              <input
                type="number"
                value={formData.watchedEpisodes}
                onChange={(e) => setFormData({ ...formData, watchedEpisodes: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-black mb-1 text-black">Total de Episódios</label>
              <input
                type="number"
                value={formData.totalEpisodes}
                onChange={(e) => setFormData({ ...formData, totalEpisodes: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-black mb-1 text-black">Ano de Lançamento</label>
            <input
              type="number"
              value={formData.releaseYear}
              onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-black mb-1 text-black">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold"
            >
              <option value="watching">Assistindo</option>
              <option value="completed">Completo</option>
              <option value="paused">Pausado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-black mb-1 text-black">Nota: {formData.rating}/5</label>
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
            <label className="block text-sm font-black mb-1 text-black">Observações</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white py-3 rounded-lg font-black border-2 border-black">
              {anime ? 'SALVAR' : 'ADICIONAR'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-black">
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
