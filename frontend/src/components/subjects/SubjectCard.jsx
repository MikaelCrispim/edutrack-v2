import React from 'react';
import { Link } from 'react-router-dom';

function SubjectCard({ subject, onDelete }) {
  const colors = [
    { bg: 'from-blue-50 to-blue-100', border: 'border-blue-200', accent: 'bg-blue-500', icon: '📘' },
    { bg: 'from-purple-50 to-purple-100', border: 'border-purple-200', accent: 'bg-purple-500', icon: '📙' },
    { bg: 'from-pink-50 to-pink-100', border: 'border-pink-200', accent: 'bg-pink-500', icon: '📕' },
    { bg: 'from-green-50 to-green-100', border: 'border-green-200', accent: 'bg-green-500', icon: '📗' },
  ];
  const colorScheme = colors[subject.id % colors.length];

  return (
    <div className={`bg-gradient-to-br ${colorScheme.bg} rounded-xl border-2 ${colorScheme.border} p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between h-full group`}>
      <div>
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{colorScheme.icon}</span>
          <span className="text-sm font-semibold px-3 py-1 bg-white bg-opacity-70 rounded-full text-gray-700">
            {subject.course_load}h
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {subject.name}
        </h3>

        <div className="space-y-2 mb-4">
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">👨‍🏫 Professor:</span> {subject.professor}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed hover:text-gray-900 transition-colors">
            {subject.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-600 bg-white bg-opacity-50 rounded-lg px-3 py-2">
          <span>📅</span>
          <span>
            {new Date(subject.start_date).toLocaleDateString()} → {new Date(subject.end_date).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-2 flex-wrap">
        <Link
          to={`/subjects/${subject.id}`}
          className={`flex-1 min-w-max ${colorScheme.accent} text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center`}
        >
          📋 View
        </Link>
        <Link
          to={`/subjects/${subject.id}/edit`}
          className="flex-1 min-w-max bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
        >
          ✏️ Edit
        </Link>
        <button
          onClick={() => onDelete(subject.id)}
          className="flex-1 min-w-max bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default SubjectCard;
