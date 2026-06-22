import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Game } from '../types';

interface GameFormProps {
  game?: Game;
  onSave: (game: Omit<Game, 'id'>) => void;
  onClose: () => void;
}

const platforms = [
  'PlayStation 5',
  'PlayStation 4',
  'Xbox Series X|S',
  'Xbox One',
  'Xbox',
  'DreamCast',
  'Nintendo Switch',
  'PC',
  'PlayStation 3',
  'Xbox 360',
  'Nintendo 3DS',
  'Playstation 2',
  'Playstation 1',
  'PSP',
  'PS Vita',
  'Mega Drive',
  'Super Nintendo',
  'Nintendo DS',
  'Nintendo 3DS',
  'Game Boy Advance',
  'GameBoy Color',
  'GameBoy',
];

export function GameForm({ game, onSave, onClose }: GameFormProps) {
  const [formData, setFormData] = useState({
  title: game?.title || '',
  coverUrl: game?.coverUrl || '',
  platform: game?.platform || 'PlayStation 5',
  releaseYear: game?.releaseYear || new Date().getFullYear(),
  completedDate: game?.completedDate || new Date().toISOString().split('T')[0],
  hoursToComplete: game?.hoursToComplete || '00:00:00', // <-- ALTERADO AQUI
  rating: game?.rating || 5,
  isPlatinum: game?.isPlatinum || false,
  completionCount: game?.completionCount || 1,
  isReplay: false,
  notes: game?.notes || '',
});

  const handleTimeChange = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length > 9) return; 

  let formatted = digits;
  if (digits.length > 4) {
    formatted = `${digits.slice(0, -4)}:${digits.slice(-4, -2)}:${digits.slice(-2)}`;
  } else if (digits.length > 2) {
    formatted = `${digits.slice(0, -2)}:${digits.slice(-2)}`;
  }

  setFormData({ ...formData, hoursToComplete: formatted });
};
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {game ? 'Editar Jogo' : 'Adicionar Novo Jogo'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Título do Jogo</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">URL da Capa</label>
            <input
              type="url"
              value={formData.coverUrl}
              onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Plataforma</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Ano de Lançamento</label>
              <input
                type="number"
                value={formData.releaseYear}
                onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1970"
                max={new Date().getFullYear() + 5}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Data que Zerou</label>
              <input
                type="date"
                value={formData.completedDate}
                onChange={(e) => setFormData({ ...formData, completedDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

           <div>
  <label className="block text-sm font-semibold mb-1">Horas para Zerar</label>
  <input
    type="text"
    value={formData.hoursToComplete}
    onChange={(e) => handleTimeChange(e.target.value)}
    placeholder="Ex: 69:25:25"
    pattern="^\d+:[0-5]\d:[0-5]\d$"
    title="Formato aceito: HH:MM:SS (ex: 69:25:25)"
    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
</div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Nota: {formData.rating}/5
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPlatinum"
              checked={formData.isPlatinum}
              onChange={(e) => setFormData({ ...formData, isPlatinum: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="isPlatinum" className="text-sm font-semibold">
              Platinado
            </label>
          </div>



          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isReplay"
              checked={formData.isReplay}
              onChange={(e) => setFormData({ ...formData, isReplay: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="isReplay" className="text-sm font-semibold">
              Estou zerando esse jogo novamente
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Observações</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Notas sobre o jogo..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {game ? 'Salvar Alterações' : 'Adicionar Jogo'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
