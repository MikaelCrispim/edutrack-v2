import React, { useState, useEffect } from 'react';
import { getSubjects, getAllTasks } from '../../api';

function ProgressCharts() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsRes, tasksRes] = await Promise.all([
          getSubjects(),
          getAllTasks()
        ]);
        
        const subjects = subjectsRes.data || [];
        const allTasks = tasksRes.data || [];

        const data = subjects.map((subject) => {
          const tasks = allTasks.filter(t => t.subject_id === subject.id);
          const total = tasks.length;
          const completed = tasks.filter((t) => t.status === 'completed').length;
          return {
            name: subject.name,
            total,
            completed,
            pending: total - completed,
            percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
            courseLoad: subject.course_load || 0,
          };
        });
        
        // Apenas manter disciplinas que têm tarefas (opcional, mas bom para limpar) ou mostrar todas.
        // Vamos mostrar todas.
        setChartData(data);
      } catch (err) {
        console.error('Erro ao carregar dados dos gráficos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin">
          <span className="text-4xl">📊</span>
        </div>
      </div>
    );
  }

  // Remove early return to allow empty states to render


  const totalTasks = chartData.reduce((sum, d) => sum + d.total, 0);
  const totalCompleted = chartData.reduce((sum, d) => sum + d.completed, 0);
  const totalPending = totalTasks - totalCompleted;
  const overallPercentage = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  // Cores para as disciplinas
  const colors = [
    '#3B82F6', '#8B5CF6', '#EC4899', '#10B981',
    '#F59E0B', '#EF4444', '#06B6D4', '#84CC16',
  ];

  return (
    <div className="mb-8 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <span className="text-2xl">📊</span> Progresso Gráfico
        </h2>
        <button 
          onClick={() => {
            setLoading(true);
            const fetchData = async () => {
              try {
                const [subjectsRes, tasksRes] = await Promise.all([
                  getSubjects(),
                  getAllTasks()
                ]);
                const subjects = subjectsRes.data || [];
                const allTasks = tasksRes.data || [];
                const data = subjects.map((subject) => {
                  const tasks = allTasks.filter(t => t.subject_id === subject.id);
                  const total = tasks.length;
                  const completed = tasks.filter((t) => t.status === 'completed').length;
                  return {
                    name: subject.name,
                    total,
                    completed,
                    pending: total - completed,
                    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
                    courseLoad: subject.course_load || 0,
                  };
                });
                setChartData(data);
              } catch (err) {
                console.error('Erro ao recarregar dados:', err);
              } finally {
                setLoading(false);
              }
            };
            fetchData();
          }}
          disabled={loading}
          className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600 p-2 rounded-lg transition-all flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer disabled:opacity-50"
          title="Recarregar Gráficos"
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden sm:inline">Atualizar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart — Progresso Geral */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-100 dark:border-slate-700 p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <span className="text-2xl">🥧</span>
            Progresso Geral
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* SVG Pie */}
            <div className="relative w-40 h-40 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {/* Fundo */}
                <circle
                  cx="18" cy="18" r="15.915"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-gray-200 dark:text-slate-600"
                />
                {/* Progresso */}
                <circle
                  cx="18" cy="18" r="15.915"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="3"
                  strokeDasharray={`${overallPercentage} ${100 - overallPercentage}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  style={{ animation: 'pieIn 1s ease-out' }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {overallPercentage}%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">concluído</span>
              </div>
            </div>
            {/* Legenda */}
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Concluídas: <strong>{totalCompleted}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-slate-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Pendentes: <strong>{totalPending}</strong>
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Total de {totalTasks} tarefas em {chartData.length} disciplinas
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart — Progresso por Disciplina */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-100 dark:border-slate-700 p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Progresso por Disciplina
          </h3>
          <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
            {chartData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[60%]">
                    {item.name}
                  </span>
                  <span className="text-sm font-bold" style={{ color: colors[index % colors.length] }}>
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: colors[index % colors.length],
                      animation: `barIn 1s ease-out ${index * 0.15}s both`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.completed}/{item.total} tarefas
                  </span>
                  {item.courseLoad > 0 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.courseLoad}h carga
                    </span>
                  )}
                </div>
              </div>
            ))}
            {chartData.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                Adicione disciplinas e tarefas para ver os gráficos.
              </p>
            )}
          </div>
        </div>

        <style>{`
          @keyframes pieIn {
            from { stroke-dasharray: 0 100; }
          }
          @keyframes barIn {
            from { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default ProgressCharts;
