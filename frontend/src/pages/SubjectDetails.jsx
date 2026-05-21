import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubject, getTasksBySubject, createTask, updateTask, deleteTask, generateAIInsights } from '../api';

function SubjectDetails() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '' });
  
  // Filtros
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, completed
  const [sortBy, setSortBy] = useState('date_asc'); // date_asc, date_desc

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [subjectRes, tasksRes] = await Promise.all([
        getSubject(id),
        getTasksBySubject(id)
      ]);
      setSubject(subjectRes.data);
      setTasks(tasksRes.data || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Falha ao carregar disciplina ou tarefas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await createTask({
        ...newTask,
        status: 'pending',
        subject_id: parseInt(id)
      });
      setNewTask({ title: '', description: '', due_date: '' });
      setShowForm(false);
      fetchData();
    } catch (err) {
      setError('Falha ao criar tarefa');
    }
  };

  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
      await updateTask(taskId, { status: newStatus });
      if (newStatus === 'completed') {
        generateAIInsights().catch(err => {
          console.error("Failed to trigger AI insight generation:", err);
        });
      }
      fetchData();
    } catch (err) {
      setError('Falha ao atualizar status da tarefa');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Tem certeza de que deseja excluir esta tarefa?')) {
      try {
        await deleteTask(taskId);
        fetchData();
      } catch (err) {
        setError('Falha ao excluir tarefa');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin">
          <span className="text-6xl">📚</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-8 py-6 rounded-lg font-medium max-w-2xl mx-auto mt-8 flex justify-between items-center">
        <span>❌ Erro: {error}</span>
        <Link to="/dashboard" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">
          Voltar
        </Link>
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Aplicação dos filtros e ordenação
  let filteredTasks = [...tasks];
  
  if (filterStatus !== 'all') {
    filteredTasks = filteredTasks.filter(t => t.status === filterStatus);
  }

  filteredTasks.sort((a, b) => {
    const dateA = a.due_date ? new Date(a.due_date).getTime() : 0;
    const dateB = b.due_date ? new Date(b.due_date).getTime() : 0;
    if (sortBy === 'date_asc') return dateA - dateB;
    if (sortBy === 'date_desc') return dateB - dateA;
    return 0;
  });

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold mb-4 transition-colors"
          >
            <span>←</span>
            Voltar ao Painel
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {subject?.name}
          </h1>
        </div>
        <Link
          to={`/subjects/${id}/edit`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
        >
          <span>✏️</span>
          Editar
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg font-medium flex justify-between items-center">
          <span>❌ {error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 dark:hover:text-red-300 text-xl cursor-pointer">✕</button>
        </div>
      )}

      {/* Subject Info Card */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border-2 border-blue-100 dark:border-slate-600 p-8 shadow-md transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
          <span className="text-3xl">📋</span>
          Detalhes da Disciplina
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-slate-600">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">👨‍🏫 Professor</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white truncate" title={subject?.professor}>{subject?.professor || '-'}</p>
          </div>
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-slate-600">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">⏱️ Carga Horária</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{subject?.course_load || 0} horas</p>
          </div>
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-slate-600">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">📅 Data Início</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {subject?.start_date ? new Date(subject.start_date).toLocaleDateString('pt-BR') : '-'}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-slate-600">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">🏁 Data Término</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {subject?.end_date ? new Date(subject.end_date).toLocaleDateString('pt-BR') : '-'}
            </p>
          </div>
        </div>
        {subject?.description && (
          <p className="text-gray-700 dark:text-gray-300 mt-6 leading-relaxed bg-white/50 dark:bg-slate-700/50 p-4 rounded-lg border border-gray-100 dark:border-slate-600">
            {subject.description}
          </p>
        )}
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 rounded-xl border-2 border-blue-200 dark:border-blue-800/50 p-6 text-center shadow-sm">
          <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">Total de Tarefas</p>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{tasks.length}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/40 dark:to-amber-800/40 rounded-xl border-2 border-amber-200 dark:border-amber-800/50 p-6 text-center shadow-sm">
          <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">Pendentes</p>
          <p className="text-4xl font-bold text-amber-600 dark:text-amber-400">{tasks.length - completedCount}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-xl border-2 border-green-200 dark:border-green-800/50 p-6 text-center shadow-sm relative overflow-hidden">
          <p className="text-gray-600 dark:text-gray-300 font-medium mb-2 z-10 relative">Taxa de Conclusão</p>
          <p className="text-4xl font-bold text-green-600 dark:text-green-400 z-10 relative">{completionRate}%</p>
          <div 
            className="absolute bottom-0 left-0 h-1 bg-green-500 dark:bg-green-400 transition-all duration-1000"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Tasks Section Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <span className="text-3xl">✓</span>
          Tarefas
        </h2>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Filters */}
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
          >
            <option value="all">Todas as tarefas</option>
            <option value="pending">Pendentes</option>
            <option value="completed">Concluídas</option>
          </select>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
          >
            <option value="date_asc">Data (Mais próximas)</option>
            <option value="date_desc">Data (Mais distantes)</option>
          </select>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap ml-auto md:ml-0"
          >
            <span className="text-lg">➕</span>
            Nova Tarefa
          </button>
        </div>
      </div>

      {/* Add New Task Form */}
      {showForm && (
        <form onSubmit={handleCreateTask} className="bg-white dark:bg-slate-800 rounded-xl border-2 border-blue-100 dark:border-slate-700 p-8 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <span className="text-2xl">✏️</span>
              Criar Nova Tarefa
            </h2>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold transition-colors cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="task-title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Nome da Tarefa *
              </label>
              <input
                id="task-title"
                type="text"
                placeholder="Ex: Ler Capítulo 5"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="due-date" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Data de Entrega *
              </label>
              <input
                id="due-date"
                type="date"
                value={newTask.due_date}
                onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                className="w-full px-4 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Descrição
            </label>
            <textarea
              id="description"
              placeholder="Adicione detalhes adicionais sobre esta tarefa..."
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-4 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
              rows={4}
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg transition-all duration-200 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>✅</span>
              Adicionar Tarefa
            </button>
          </div>
        </form>
      )}

      {/* Tasks List */}
      <div>
        {filteredTasks.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-600">
            <span className="text-6xl mb-4 block">📝</span>
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-4">
              {tasks.length === 0 ? "Nenhuma tarefa ainda" : "Nenhuma tarefa corresponde aos filtros"}
            </p>
            {tasks.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 mb-6">Clique no botão "Nova Tarefa" acima para criar sua primeira tarefa!</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                  task.status === 'completed'
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50'
                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className={`text-2xl mt-0.5 ${task.status === 'completed' ? '✅' : '⭕'}`} />
                  <h3 className={`flex-1 font-bold text-lg leading-tight ${task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                    {task.title}
                  </h3>
                </div>

                <p className={`mb-4 text-sm line-clamp-3 min-h-[3rem] ${task.status === 'completed' ? 'text-gray-500 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'}`}>
                  {task.description || "Sem descrição."}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs px-2.5 py-1 rounded-md font-medium flex items-center gap-1">
                    📅 {task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : 'Sem data'}
                  </span>
                  {task.status !== 'completed' && task.due_date && new Date(task.due_date) < new Date() && (
                    <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 text-xs px-2.5 py-1 rounded-md font-medium animate-pulse">
                      Atrasada
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-slate-700/50">
                  <button
                    onClick={() => toggleTaskStatus(task.id, task.status)}
                    className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      task.status === 'completed'
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                    title={task.status === 'completed' ? 'Marcar como pendente' : 'Marcar como concluída'}
                  >
                    {task.status === 'completed' ? '↩️ Desfazer' : '✓ Concluir'}
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer"
                    title="Excluir tarefa"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SubjectDetails;
