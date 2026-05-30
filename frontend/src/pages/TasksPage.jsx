import React, { useEffect, useState } from 'react';
import { getAllTasks, createTask, updateTask, deleteTask } from '../api';
import SearchBar from '../components/SearchBar';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | pending | completed
  const [query, setQuery] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllTasks();
      setTasks(res.data || []);
    } catch (err) {
      setError('Falha ao carregar tarefas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    try {
      const payload = { title: newTitle.trim(), status: 'pending' };
      await createTask(payload);
      setNewTitle('');
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError('Falha ao criar tarefa');
    }
  };

  const toggleComplete = async (task) => {
    try {
      const nextStatus = (task.status === 'completed' || task.status === 'concluida') ? 'pending' : 'completed';
      await updateTask(task.id, { ...task, status: nextStatus });
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError('Falha ao atualizar tarefa');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Excluir esta tarefa?')) return;
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError('Falha ao excluir tarefa');
    }
  };

  const matchesFilter = (task) => {
    const status = (task.status || '').toLowerCase();
    if (filter === 'pending') return !(status === 'completed' || status === 'concluida' || status === 'done');
    if (filter === 'completed') return (status === 'completed' || status === 'concluida' || status === 'done');
    return true;
  };

  const matchesQuery = (task) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (task.title || '').toLowerCase().includes(q) || (task.description || '').toLowerCase().includes(q);
  };

  const visible = tasks.filter(t => matchesFilter(t) && matchesQuery(t));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tarefas</h1>
          <p className="text-gray-500">Veja e gerencie todas as suas tarefas aqui.</p>
        </div>
        <div className="flex items-center gap-3 w-full max-w-xl">
          <SearchBar value={query} onChange={setQuery} placeholder="Buscar tarefas..." />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-slate-800 border'}`}
        >Todas</button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1 rounded-lg ${filter === 'pending' ? 'bg-orange-500 text-white' : 'bg-white dark:bg-slate-800 border'}`}
        >Pendentes</button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded-lg ${filter === 'completed' ? 'bg-green-500 text-white' : 'bg-white dark:bg-slate-800 border'}`}
        >Concluídas</button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border shadow-sm">
        <div className="flex gap-2 mb-4">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Nova tarefa..."
            className="flex-1 px-3 py-2 rounded-lg border bg-transparent"
          />
          <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Criar</button>
        </div>

        {error && (
          <div className="mb-3 text-red-600">{error}</div>
        )}

        {loading ? (
          <div className="py-8 text-center">Carregando tarefas...</div>
        ) : (
          <div className="space-y-3">
            {visible.length === 0 && (
              <div className="py-8 text-center text-gray-500">Nenhuma tarefa encontrada.</div>
            )}
            {visible.map((task) => (
              <div key={task.id} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-gray-50 dark:bg-slate-900 border">
                <div className="flex items-start gap-3">
                  <button onClick={() => toggleComplete(task)} className="mt-1 text-xl">
                    { (task.status === 'completed' || task.status === 'concluida' || task.status === 'done') ? '✅' : '⬜' }
                  </button>
                  <div>
                    <div className="font-medium">{task.title}</div>
                    {task.description && <div className="text-sm text-gray-500">{task.description}</div>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-500">{task.due_date ? new Date(task.due_date).toLocaleDateString() : ''}</div>
                  <button onClick={() => handleDelete(task.id)} className="text-red-500">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TasksPage;
