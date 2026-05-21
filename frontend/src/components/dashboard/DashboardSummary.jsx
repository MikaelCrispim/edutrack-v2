import React, { useState, useEffect } from 'react';
import { getSubjects, getAllTasks } from '../../api';

const DashboardSummary = () => {
  const [summaryData, setSummaryData] = useState({
    totalSubjects: 0,
    pendingActivities: 0,
    completionPercentage: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const [subjectsRes, tasksRes] = await Promise.all([
          getSubjects(),
          getAllTasks()
        ]);
        
        const subjects = subjectsRes.data || [];
        const allTasks = tasksRes.data || [];
        
        const totalTasksCount = allTasks.length;
        const completedTasksCount = allTasks.filter(t => t.status === 'completed').length;
        const pendingCount = totalTasksCount - completedTasksCount;
        
        const completionPercentage = totalTasksCount > 0 
          ? Math.round((completedTasksCount / totalTasksCount) * 100) 
          : 0;

        setSummaryData({
          totalSubjects: subjects.length,
          pendingActivities: pendingCount,
          completionPercentage: completionPercentage,
        });
      } catch (err) {
        setError('Falha ao carregar os dados de resumo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin">
          <span className="text-4xl">⏳</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg font-medium">
        ❌ {error}
      </div>
    );
  }

  const stats = [
    {
      title: 'Total de Disciplinas',
      value: summaryData.totalSubjects,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40',
      borderColor: 'border-blue-200 dark:border-blue-800/50',
      icon: '📚',
    },
    {
      title: 'Tarefas Pendentes',
      value: summaryData.pendingActivities,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-100 dark:from-orange-900/40 dark:to-red-900/40',
      borderColor: 'border-orange-200 dark:border-orange-800/50',
      icon: '⏰',
    },
    {
      title: 'Taxa de Conclusão',
      value: `${summaryData.completionPercentage}%`,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40',
      borderColor: 'border-green-200 dark:border-green-800/50',
      icon: '✅',
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <span className="text-2xl">📈</span> Visão Geral
        </h2>
        <button 
          onClick={() => {
            setLoading(true);
            const fetchSummaryData = async () => {
              try {
                const [subjectsRes, tasksRes] = await Promise.all([
                  getSubjects(),
                  getAllTasks()
                ]);
                const subjects = subjectsRes.data || [];
                const allTasks = tasksRes.data || [];
                const totalTasksCount = allTasks.length;
                const completedTasksCount = allTasks.filter(t => t.status === 'completed').length;
                const pendingCount = totalTasksCount - completedTasksCount;
                const completionPercentage = totalTasksCount > 0 
                  ? Math.round((completedTasksCount / totalTasksCount) * 100) 
                  : 0;
                setSummaryData({
                  totalSubjects: subjects.length,
                  pendingActivities: pendingCount,
                  completionPercentage: completionPercentage,
                });
              } catch (err) {
                setError('Falha ao atualizar os dados');
              } finally {
                setLoading(false);
              }
            };
            fetchSummaryData();
          }}
          disabled={loading}
          className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600 p-2 rounded-lg transition-all flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer disabled:opacity-50"
          title="Recarregar Visão Geral"
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden sm:inline">Atualizar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.bgGradient} rounded-xl border-2 ${stat.borderColor} p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">{stat.title}</p>
                <p className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent drop-shadow-sm`}>
                  {stat.value}
                </p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
            <div className="mt-4 h-1.5 bg-white/50 dark:bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${stat.gradient}`}
                style={{ width: `${Math.min(summaryData.completionPercentage, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSummary;
