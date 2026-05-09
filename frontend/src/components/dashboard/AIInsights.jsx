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
      setError('Failed to fetch AI insights');
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
        throw new Error('Please add some subjects first to generate meaningful insights.');
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
      setError(err.message || 'Failed to generate AI insights. Please try again.');
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
      setError('Failed to delete AI insight. Please try again.');
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
    <div className="bg-white rounded-xl shadow-md border-2 border-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🤖</span>
          <h3 className="text-2xl font-bold text-gray-800">AI Insights</h3>
        </div>
        <button
          onClick={handleGenerateInsights}
          disabled={generating}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          {generating ? (
            <>
              <span className="animate-spin">⏳</span>
              Generating...
            </>
          ) : (
            <>
              <span>✨</span>
              Generate Insights
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-lg font-medium flex justify-between items-center">
          <span>❌ {error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 text-xl"
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
              className="relative bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100 rounded-lg p-6 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-2xl pt-1">
                  {index === 0 ? '⭐' : '💡'}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-lg leading-relaxed font-medium pr-8">{insight.text}</p>
                  <p className="text-sm text-gray-500 mt-3">
                    📅 {new Date(insight.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteInsight(insight.id)}
                disabled={deletingId === insight.id}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                title="Delete Insight"
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
          <p className="text-gray-600 text-lg font-medium mb-4">No insights yet!</p>
          <p className="text-gray-500 mb-6">
            Keep completing tasks to get personalized AI insights about your learning progress.
          </p>
          <button
            onClick={handleGenerateInsights}
            disabled={generating}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl"
          >
            {generating ? (
              <>
                <span className="animate-spin">⏳</span>
                Generating...
              </>
            ) : (
              <>
                <span>✨</span>
                Generate First Insight
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
