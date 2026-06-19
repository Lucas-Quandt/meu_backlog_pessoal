import { BookMarked, BookOpen, Film, Gamepad2, Home, Sparkles, Tv } from 'lucide-react';
import { Category } from '../types';

interface NavigationProps {
  activeCategory: Category | 'home';
  onCategoryChange: (category: Category | 'home') => void;
}

const categories = [
  { id: 'home' as const, name: 'Início', icon: Home },
  { id: 'games' as const, name: 'Games', icon: Gamepad2 },
  { id: 'movies' as const, name: 'Filmes', icon: Film },
  { id: 'series' as const, name: 'Séries', icon: Tv },
  { id: 'animes' as const, name: 'Animes', icon: Sparkles },
  { id: 'books' as const, name: 'Livros', icon: BookOpen },
  { id: 'comics' as const, name: 'Mangás & HQs', icon: BookMarked },
];

export function Navigation({ activeCategory, onCategoryChange }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-green-400">Backlog</p>
          <h1 className="text-2xl font-black text-white">Geek Universe</h1>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-green-400 text-black border-green-300 shadow-[0_0_25px_rgba(74,222,128,0.35)] font-bold'
                    : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
