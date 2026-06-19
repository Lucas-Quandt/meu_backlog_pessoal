import { useState, useEffect } from 'react';
import { Plus, BookMarked, Star, Zap } from 'lucide-react';
import { Comic } from '../types';
import { ComicCard } from '../components/ComicCard';
import { ComicForm } from '../components/ComicForm';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';

export function ComicsPage() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingComic, setEditingComic] = useState<Comic | undefined>();

  useEffect(() => { fetchComics(); }, []);

  const fetchComics = async () => {
    const { data, error } = await supabase.from('comics').select('*');
    if (error) { toast.error('Erro ao carregar comics'); return; }
    setComics((data || []).map(dbToComic));
    setLoading(false);
  };

  const dbToComic = (d: any): Comic => ({
    id: d.id, title: d.title, coverUrl: d.cover_url, author: d.author,
    publisher: d.publisher, releaseYear: d.release_year,
    totalIssues: d.total_issues, readIssues: d.read_issues,
    status: d.status, rating: d.rating, type: d.type, notes: d.notes,
  });

  const comicToDb = (c: Comic) => ({
    id: c.id, title: c.title, cover_url: c.coverUrl, author: c.author,
    publisher: c.publisher, release_year: c.releaseYear,
    total_issues: c.totalIssues, read_issues: c.readIssues,
    status: c.status, rating: c.rating, type: c.type, notes: c.notes,
  });

  const stats = {
    total: comics.length,
    manga: comics.filter(c => c.type === 'Manga').length,
    comic: comics.filter(c => c.type === 'Comic').length,
    completed: comics.filter(c => c.status === 'completed').length,
    avgRating: comics.length > 0 ? (comics.reduce((sum, c) => sum + c.rating, 0) / comics.length).toFixed(1) : '0',
  };

  const handleSave = async (comicData: Omit<Comic, 'id'>) => {
    if (editingComic) {
      const updated = { ...comicData, id: editingComic.id };
      const { error } = await supabase.from('comics').update(comicToDb(updated)).eq('id', editingComic.id);
      if (error) { toast.error('Erro ao atualizar'); return; }
      setComics(comics.map(c => c.id === editingComic.id ? updated : c));
      toast.success('Atualizado!');
    } else {
      const newComic = { ...comicData, id: Date.now().toString() };
      const { error } = await supabase.from('comics').insert(comicToDb(newComic));
      if (error) { toast.error('Erro ao adicionar'); return; }
      setComics([...comics, newComic]);
      toast.success('Adicionado!');
    }
    setShowForm(false);
    setEditingComic(undefined);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deletar?')) return;
    const { error } = await supabase.from('comics').delete().eq('id', id);
    if (error) { toast.error('Erro ao deletar'); return; }
    setComics(comics.filter(c => c.id !== id));
    toast.success('Deletado!');
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-black">Carregando...</div>;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px), radial-gradient(circle, #000 2px, transparent 2px)', backgroundSize: '20px 20px, 40px 40px', backgroundPosition: '0 0, 10px 10px' }} />
      </div>
      <div className="absolute top-10 left-10 text-9xl font-black opacity-10 transform -rotate-12" style={{ color: '#00ffff', WebkitTextStroke: '4px #000' }}>BAM!</div>
      <div className="absolute top-20 right-20 text-7xl font-black opacity-10 transform rotate-12" style={{ color: '#ff00ff', WebkitTextStroke: '3px #000' }}>BOOM!</div>
      <div className="absolute bottom-20 left-1/4 text-8xl font-black opacity-10 transform rotate-6" style={{ color: '#ffff00', WebkitTextStroke: '4px #000' }}>POW!</div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-block bg-white p-6 border-8 border-black mb-4" style={{ boxShadow: '16px 16px 0 0 #00ffff, -16px -16px 0 0 #ff00ff' }}>
            <h1 className="text-6xl font-black text-black mb-2 uppercase" style={{ textShadow: '6px 6px 0 #00ffff, -6px -6px 0 #ff00ff' }}>MANGÁS & HQs</h1>
            <p className="text-xl font-black text-gray-700">POP ART STYLE</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total', val: stats.total, shadow: '#ffff00', icon: BookMarked },
            { label: 'Mangás', val: stats.manga, shadow: '#ff00ff', icon: Zap },
            { label: 'Comics', val: stats.comic, shadow: '#00ffff', icon: Zap },
            { label: 'Completos', val: stats.completed, shadow: '#00ff00', icon: Star },
            { label: 'Nota Média', val: stats.avgRating, shadow: '#ff0000', icon: Star },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-none p-6 border-4 border-black" style={{ boxShadow: `6px 6px 0 0 ${s.shadow}` }}>
              <div className="flex items-center justify-between mb-2"><s.icon className="text-black" size={28} strokeWidth={3} /><span className="text-4xl font-black text-black">{s.val}</span></div>
              <div className="text-sm font-black text-gray-700 uppercase">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 text-black px-8 py-4 rounded-none flex items-center gap-3 transition-all font-black text-xl border-4 border-black uppercase" style={{ boxShadow: '8px 8px 0 0 #000' }}>
            <Plus size={28} strokeWidth={4} />ADICIONAR
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {comics.map(comic => (
            <ComicCard key={comic.id} comic={comic} onEdit={(c) => { setEditingComic(c); setShowForm(true); }} onDelete={handleDelete} />
          ))}
        </div>
      </div>
      {showForm && <ComicForm comic={editingComic} onSave={handleSave} onClose={() => { setShowForm(false); setEditingComic(undefined); }} />}
    </div>
  );
}
