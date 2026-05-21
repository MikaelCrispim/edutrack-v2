import React, { useState, useEffect } from 'react';
import { getAIInsights, deleteAIInsight, getSubjects, getTasksBySubject, saveAIInsight } from '../../api';
import { generateInsightsWithGemini } from '../../services/geminiService';

const AIInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    try {
      setError(null);
      const response = await getAIInsights();
      setInsights(response.data.insights || []);
    } catch (err) {
      setError('Falha ao carregar os insights de IA');
      console.error('Error fetching insights:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInsights = async () => {
    setGenerating(true);
    setError(null);
    try {
      // 1. Fetch student data from Xano
      const subjectsRes = await getSubjects();
      const subjects = subjectsRes.data;

      if (!subjects || subjects.length === 0) {
        throw new Error('Adicione algumas disciplinas primeiro para gerar insights significativos.');
      }

      // 2. Fetch tasks for each subject to build full context
      const tasksBySubject = {};
      let userId = null;

      await Promise.all(subjects.map(async (subject) => {
        if (!userId && subject.user_id) userId = subject.user_id;
        const tasksRes = await getTasksBySubject(subject.id);
        tasksBySubject[subject.id] = tasksRes.data || [];
      }));

      // 3. Generate insights directly via Gemini
      const insightsArray = await generateInsightsWithGemini(subjects, tasksBySubject);

      // 4. Persist each insight to Xano
      await Promise.all(insightsArray.map(text => saveAIInsight(text, userId)));

      // 5. Refresh the list
      await fetchInsights();
    } catch (err) {
      setError(err.message || 'Falha ao gerar insights de IA. Tente novamente.');
      console.error('Error in AI direct integration flow:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteInsight = async (id) => {
    setDeletingId(id);
    setError(null);
    try {
      await deleteAIInsight(id);
      await fetchInsights();
    } catch (err) {
      setError('Falha ao deletar o insight. Tente novamente.');
      console.error('Error deleting insight:', err);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin">
          <span className="text-4xl">🤖</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border-2 border-gray-100 dark:border-slate-700 p-8 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🤖</span>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Insights da IA</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setLoading(true);
              fetchInsights();
            }}
            disabled={loading || generating}
            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-gray-50 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 p-2.5 rounded-lg transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
            title="Recarregar Insights"
          >
            <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={handleGenerateInsights}
            disabled={generating}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            {generating ? (
              <>
                <span className="animate-spin">⏳</span>
                <span className="hidden sm:inline">Gerando...</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span className="hidden sm:inline">Gerar Insights</span>
                <span className="sm:hidden">Gerar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg font-medium flex justify-between items-center">
          <span>❌ {error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 dark:hover:text-red-300 text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {insights.length > 0 ? (
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={insight.id || index}
              className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 border-2 border-blue-100 dark:border-slate-600 rounded-lg p-6 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-2xl pt-1">
                  {index === 0 ? '⭐' : '💡'}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed font-medium pr-8">{insight.text}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    📅 {new Date(insight.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteInsight(insight.id)}
                disabled={deletingId === insight.id}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-full transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                title="Deletar Insight"
              >
                {deletingId === insight.id ? (
                  <span className="animate-spin inline-block">⏳</span>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🌟</div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-4">Nenhum insight ainda!</p>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Continue concluindo tarefas para obter insights personalizados sobre seu progresso.
          </p>
          <button
            onClick={handleGenerateInsights}
            disabled={generating}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl cursor-pointer"
          >
            {generating ? (
              <>
                <span className="animate-spin">⏳</span>
                Gerando...
              </>
            ) : (
              <>
                <span>✨</span>
                Gerar Primeiro Insight
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
