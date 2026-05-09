import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubjects, deleteSubject } from '../../api';
import SubjectCard from './SubjectCard';

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (err) {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to see subjects. Please log in and try again.');
      } else {
        setError(err.response?.data?.message || 'An error occurred while fetching subjects.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await deleteSubject(id);
        setSubjects(subjects.filter(subject => subject.id !== id));
      } catch (err) {
        setError('Failed to delete subject.');
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin">
          <span className="text-5xl">📚</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-lg font-medium flex justify-between items-center">
          <span>❌ {error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 font-bold text-xl"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 mb-6">
        <button
          onClick={fetchSubjects}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 flex items-center gap-2 w-fit shadow-md hover:shadow-lg"
        >
          <span>🔄</span>
          Refresh Subjects
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.length > 0 ? (
          subjects.map(subject => (
            <SubjectCard key={subject.id} subject={subject} onDelete={handleDelete} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 bg-gradient-to-b from-blue-50 to-purple-50 rounded-xl border-2 border-dashed border-gray-300">
            <span className="text-6xl mb-4">📖</span>
            <p className="text-gray-600 text-lg font-medium mb-4">No subjects found yet</p>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              Start your learning journey by creating your first subject!
            </p>
            <Link
              to="/subjects/new"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <span>➕</span>
              Create First Subject
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubjectList;
