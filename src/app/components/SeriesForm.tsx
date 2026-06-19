import { X } from 'lucide-react';
import { useState } from 'react';
import { Series } from '../types';

interface SeriesFormProps {
  series?: Series;
  onSave: (series: Omit<Series, 'id'>) => void;
  onClose: () => void;
}

const platforms = ['Netflix', 'Prime Video', 'Disney+', 'HBO Max', 'Apple TV+', 'Paramount+', 'Star+', 'Crunchyroll', 'Outro'];
const genres = ['Drama', 'Comédia', 'Ação', 'Ficção Científica', 'Terror', 'Suspense', 'Fantasia', 'Crime', 'Documentário'];

export function SeriesForm({ series, onSave, onClose }: SeriesFormProps) {
  const [formData, setFormData] = useState({
    title: series?.title || '',
    bannerUrl: series?.bannerUrl || '',
    platform: series?.platform || 'Netflix',
    releaseYear: series?.releaseYear || new Date().getFullYear(),
    totalSeasons: series?.totalSeasons || 1,
    currentSeason: series?.currentSeason || 1,
    currentEpisode: series?.currentEpisode || 0,
    totalEpisodes: series?.totalEpisodes || 10,
    status: series?.status || 'watching' as const,
    rating: series?.rating || 5,
    genre: series?.genre || 'Drama',
    notes: series?.notes || '',
  });

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-cyan-950/90 to-blue-950/90 backdrop-blur-xl rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/30">
        <div className="sticky top-0 bg-gradient-to-r from-cyan-900 to-blue-900 px-6 py-4 flex items-center justify-between border-b border-cyan-500/30">
          <h2 className="text-2xl font-bold text-cyan-100">{series ? 'Editar Série' : 'Adicionar Série'}</h2>
          <button onClick={onClose} className="text-cyan-300 hover:text-cyan-100">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-cyan-100">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-black/40 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-cyan-100">URL do Banner</label>
            <input
              type="url"
              value={formData.bannerUrl}
              onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
              className="w-full px-3 py-2 bg-black/40 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-cyan-100">Plataforma</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-100"
              >
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-cyan-100">Gênero</label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-100"
              >
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-cyan-100">Temporada Atual</label>
              <input
                type="number"
                value={formData.currentSeason}
                onChange={(e) => setFormData({ ...formData, currentSeason: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-black/40 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-100"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-cyan-100">Total Temporadas</label>
              <input
                type="number"
                value={formData.totalSeasons}
                onChange={(e) => setFormData({ ...formData, totalSeasons: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-black/40 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-100"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-cyan-100">Ano</label>
              <input
                type="number"
                value={formData.releaseYear}
                onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-black/40 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-100"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-cyan-100">Episódio Atual</label>
              <input
                type="number"
                value={formData.currentEpisode}
                onChange={(e) => setFormData({ ...formData, currentEpisode: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-black/40 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-100"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-cyan-100">Total de Episódios</label>
              <input
                type="number"
                value={formData.totalEpisodes}
                onChange={(e) => setFormData({ ...formData, totalEpisodes: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-black/40 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-100"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-cyan-100">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 bg-black/40 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-100"
            >
              <option value="watching">Assistindo</option>
              <option value="completed">Completo</option>
              <option value="paused">Pausado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-cyan-100">Nota: {formData.rating}/5</label>
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
            <button type="submit" className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-cyan-100 py-3 rounded-lg font-semibold">
              {series ? 'Salvar' : 'Adicionar'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-black/60 hover:bg-black/80 text-cyan-100 py-3 rounded-lg font-semibold border border-cyan-500/30">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
