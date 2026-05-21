import React, { useState } from 'react';
import SubjectCreate from '../components/subjects/SubjectCreate';
import SubjectList from '../components/subjects/SubjectList';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import AIInsights from '../components/dashboard/AIInsights';
import ProgressCharts from '../components/dashboard/ProgressCharts';

function DashboardPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Painel de Controle
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Bem-vindo de volta! Aqui está o resumo dos seus estudos.</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <span className="text-xl">➕</span>
          Nova Disciplina
        </button>
      </div>

      {/* Dashboard Stats */}
      <DashboardSummary />

      {/* Progress Charts */}
      <ProgressCharts />

      {/* AI Insights */}
      <AIInsights />

      {/* Create Subject Form - Modal Overlay */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Criar Nova Disciplina</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 p-2 rounded-full transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SubjectCreate onSuccess={() => setShowCreateForm(false)} />
          </div>
        </div>
      )}

      {/* Subjects List */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📚</span>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Minhas Disciplinas</h2>
        </div>
        <SubjectList />
      </div>
    </div>
  );
}

export default DashboardPage;
