import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSubject } from '../../api';

function SubjectCreate({ onSuccess }) {
  const [subjectData, setSubjectData] = useState({
    name: '',
    professor: '',
    course_load: '',
    description: '',
    start_date: '',
    end_date: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubjectData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const dataToSend = {
      ...subjectData,
      course_load: subjectData.course_load ? parseInt(subjectData.course_load, 10) : null,
      start_date: subjectData.start_date ? new Date(subjectData.start_date).toISOString() : null,
      end_date: subjectData.end_date ? new Date(subjectData.end_date).toISOString() : null,
    };

    try {
      const response = await createSubject(dataToSend);
      setSuccess(`✅ Successfully created subject: ${response.data.name}`);
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/subjects');
        }
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while creating the subject.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl">
      {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-lg font-medium flex justify-between items-center">
          <span>❌ {error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 text-xl">✕</button>
        </div>
      )}
      {success && (
        <div className="mb-6 bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-lg font-medium flex justify-between items-center">
          <span>{success}</span>
          <button onClick={() => setSuccess(null)} className="text-green-500 hover:text-green-700 text-xl">✕</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border-2 border-blue-100 rounded-xl p-8 shadow-md">
        {/* Subject Name */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-3 flex items-center gap-2" htmlFor="name">
            <span>📚</span>
            Subject Name *
          </label>
          <input
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            id="name"
            type="text"
            name="name"
            placeholder="e.g., Advanced Python Programming"
            value={subjectData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Professor & Course Load */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-3 flex items-center gap-2" htmlFor="professor">
              <span>👨‍🏫</span>
              Professor
            </label>
            <input
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              id="professor"
              type="text"
              name="professor"
              placeholder="e.g., Dr. Smith"
              value={subjectData.professor}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-3 flex items-center gap-2" htmlFor="course_load">
              <span>⏱️</span>
              Course Load (hours)
            </label>
            <input
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              id="course_load"
              type="number"
              name="course_load"
              placeholder="e.g., 40"
              value={subjectData.course_load}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-3 flex items-center gap-2" htmlFor="description">
            <span>📝</span>
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            id="description"
            name="description"
            placeholder="Add a detailed description about this subject..."
            rows={4}
            value={subjectData.description}
            onChange={handleChange}
          />
        </div>

        {/* Start Date & End Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-3 flex items-center gap-2" htmlFor="start_date">
              <span>📅</span>
              Start Date
            </label>
            <input
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              id="start_date"
              type="date"
              name="start_date"
              value={subjectData.start_date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-3 flex items-center gap-2" htmlFor="end_date">
              <span>🏁</span>
              End Date
            </label>
            <input
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              id="end_date"
              type="date"
              name="end_date"
              value={subjectData.end_date}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <span>✅</span>
            Create Subject
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubjectCreate;
