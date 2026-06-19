import { ArrowRight, BookMarked, BookOpen, Film, Gamepad2, Sparkles, Star, TrendingUp, Tv } from 'lucide-react';
import { Category } from '../types';

interface HomePageProps {
  onNavigate: (category: Category) => void;
  stats: {
    games: number;
    movies: number;
    series: number;
    animes: number;
    books: number;
    comics: number;
  };
}

export function HomePage({ onNavigate, stats }: HomePageProps) {
  const categories = [
    {
      id: 'games' as Category,
      name: 'Games',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
      count: stats.games,
      description: 'Acompanhe seus jogos zerados, favoritos e futuros lançamentos.',
    },
    {
      id: 'movies' as Category,
      name: 'Filmes',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
      count: stats.movies,
      description: 'Monte sua própria coleção cinematográfica premium.',
    },
    {
      id: 'series' as Category,
      name: 'Séries',
      image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1200&auto=format&fit=crop',
      count: stats.series,
      description: 'Controle temporadas, episódios e maratonas épicas.',
    },
    {
      id: 'animes' as Category,
      name: 'Animes',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop',
      count: stats.animes,
      description: 'Seu universo otaku organizado em um único lugar.',
    },
    {
      id: 'books' as Category,
      name: 'Livros',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop',
      count: stats.books,
      description: 'Guarde leituras, metas e descobertas literárias.',
    },
    {
      id: 'comics' as Category,
      name: 'Mangás & HQs',
      image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1200&auto=format&fit=crop',
      count: stats.comics,
      description: 'Crie uma central definitiva para suas coleções geek.',
    },
  ];

  const totalItems = Object.values(stats).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <section className="relative border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-green-950/70" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 mb-6">
              <Star className="text-green-400" size={18} />
              <span className="text-sm text-green-200">Seu painel gamer e geek definitivo</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              BACKLOG
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">
                NEXT LEVEL
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-2xl mb-10">
              Um dashboard futurista inspirado em plataformas premium para organizar games,
              filmes, séries, animes, livros e HQs com uma experiência muito mais imersiva.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('games')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-black font-bold hover:scale-105 transition-transform"
              >
                Explorar Backlog
              </button>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
                <TrendingUp className="text-green-400" />
                <div>
                  <p className="text-3xl font-black">{totalItems}</p>
                  <p className="text-sm text-zinc-400">Itens cadastrados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {[
            { icon: Gamepad2, label: 'Games', value: stats.games },
            { icon: Film, label: 'Filmes', value: stats.movies },
            { icon: Tv, label: 'Séries', value: stats.series },
            { icon: Sparkles, label: 'Animes', value: stats.animes },
            { icon: BookOpen, label: 'Livros', value: stats.books },
            { icon: BookMarked, label: 'HQs', value: stats.comics },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl p-5"
              >
                <Icon className="text-green-400 mb-4" size={28} />
                <p className="text-4xl font-black">{item.value}</p>
                <p className="text-zinc-400">{item.label}</p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-green-400 uppercase tracking-[0.3em] text-sm mb-2">Categorias</p>
            <h2 className="text-4xl font-black">Escolha seu universo</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onNavigate(category.id)}
              className="group relative overflow-hidden rounded-3xl border border-white/10 min-h-[420px] text-left"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="relative flex flex-col justify-end h-full p-8">
                <div className="inline-flex w-fit rounded-full bg-green-500/20 border border-green-500/30 px-4 py-1 text-sm text-green-200 mb-4">
                  {category.count} itens
                </div>

                <h3 className="text-4xl font-black mb-3">{category.name}</h3>
                <p className="text-zinc-300 mb-6 leading-relaxed">{category.description}</p>

                <div className="flex items-center gap-2 text-green-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Abrir categoria
                  <ArrowRight size={18} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
