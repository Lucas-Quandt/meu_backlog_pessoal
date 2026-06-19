import { useState, useEffect } from 'react';
import { Plus, BookOpen, Star, CheckCircle, Clock } from 'lucide-react';
import { Book } from '../types';
import { BookCard } from '../components/BookCard';
import { BookForm } from '../components/BookForm';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>();

  useEffect(() => { fetchBooks(); }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase.from('books').select('*');
    if (error) { toast.error('Erro ao carregar livros'); return; }
    setBooks((data || []).map(dbToBook));
    setLoading(false);
  };

  const dbToBook = (d: any): Book => ({
    id: d.id, title: d.title, coverUrl: d.cover_url, author: d.author,
    releaseYear: d.release_year, totalPages: d.total_pages,
    readPages: d.read_pages, status: d.status, rating: d.rating,
    genre: d.genre, startedDate: d.started_date, completedDate: d.completed_date, notes: d.notes,
  });

  const bookToDb = (b: Book) => ({
    id: b.id, title: b.title, cover_url: b.coverUrl, author: b.author,
    release_year: b.releaseYear, total_pages: b.totalPages,
    read_pages: b.readPages, status: b.status, rating: b.rating,
    genre: b.genre, started_date: b.startedDate, completed_date: b.completedDate, notes: b.notes,
  });

  const stats = {
    total: books.length,
    reading: books.filter(b => b.status === 'reading').length,
    completed: books.filter(b => b.status === 'completed').length,
    totalPages: books.reduce((sum, b) => sum + b.readPages, 0),
    avgRating: books.length > 0 ? (books.reduce((sum, b) => sum + b.rating, 0) / books.length).toFixed(1) : '0',
  };

  const handleSave = async (bookData: Omit<Book, 'id'>) => {
    if (editingBook) {
      const updated = { ...bookData, id: editingBook.id };
      const { error } = await supabase.from('books').update(bookToDb(updated)).eq('id', editingBook.id);
      if (error) { toast.error('Erro ao atualizar'); return; }
      setBooks(books.map(b => b.id === editingBook.id ? updated : b));
      toast.success('Livro atualizado!');
    } else {
      const newBook = { ...bookData, id: Date.now().toString() };
      const { error } = await supabase.from('books').insert(bookToDb(newBook));
      if (error) { toast.error('Erro ao adicionar'); return; }
      setBooks([...books, newBook]);
      toast.success('Livro adicionado!');
    }
    setShowForm(false);
    setEditingBook(undefined);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deletar este livro?')) return;
    const { error } = await supabase.from('books').delete().eq('id', id);
    if (error) { toast.error('Erro ao deletar'); return; }
    setBooks(books.filter(b => b.id !== id));
    toast.success('Livro deletado!');
  };

  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-amber-950 to-yellow-950 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 mb-2" style={{ fontFamily: 'serif' }}>Biblioteca</h1>
          <p className="text-amber-200/60 italic">Dark Academia</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total', val: stats.total, icon: BookOpen },
            { label: 'Lendo', val: stats.reading, icon: Clock },
            { label: 'Concluídos', val: stats.completed, icon: CheckCircle },
            { label: 'Páginas Lidas', val: stats.totalPages, icon: BookOpen },
            { label: 'Nota Média', val: stats.avgRating, icon: Star },
          ].map((s, i) => (
            <div key={i} className="bg-gradient-to-br from-amber-900/60 to-yellow-900/60 backdrop-blur-sm rounded-xl p-6 border border-amber-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-2"><s.icon className="text-amber-400" size={24} /><span className="text-3xl font-bold text-amber-100">{s.val}</span></div>
              <div className="text-sm text-amber-200/70 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-amber-700 to-yellow-700 hover:from-amber-600 hover:to-yellow-600 text-amber-100 px-6 py-3 rounded-lg flex items-center gap-2 transition-all font-bold shadow-lg border border-amber-600">
            <Plus size={20} />Adicionar Livro
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map(book => (
            <BookCard key={book.id} book={book} onEdit={(b) => { setEditingBook(b); setShowForm(true); }} onDelete={handleDelete} />
          ))}
        </div>
      </div>
      {showForm && <BookForm book={editingBook} onSave={handleSave} onClose={() => { setShowForm(false); setEditingBook(undefined); }} />}
    </div>
  );
}
