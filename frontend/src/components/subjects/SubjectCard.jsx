import React from 'react';
import { Link } from 'react-router-dom';

function SubjectCard({ subject }) {
  // Determinando o status baseado nas datas
  const now = new Date();
  const start = new Date(subject.start_date);
  const end = new Date(subject.end_date);
  
  let status = 'Em Andamento';
  let statusColor = 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400';
  
  if (now < start) {
    status = 'Em Breve';
    statusColor = 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400';
  } else if (now > end) {
    status = 'Concluída';
    statusColor = 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
  }

  return (
    <Link 
      to={`/subjects/${subject.id}`}
      className="block bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-xl border-2 border-transparent hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 group"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 truncate pr-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{subject.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${statusColor}`}>
            {status}
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p className="flex items-center gap-2">
            <span>👨‍🏫</span>
            <span className="truncate">{subject.professor || 'Não informado'}</span>
          </p>
          <p className="flex items-center gap-2">
            <span>⏱️</span>
            <span>{subject.course_load ? `${subject.course_load} horas` : 'Carga não definida'}</span>
          </p>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
            <span>📅</span>
            <span className="text-xs">
              {new Date(subject.start_date).toLocaleDateString('pt-BR')} - {new Date(subject.end_date).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SubjectCard;
