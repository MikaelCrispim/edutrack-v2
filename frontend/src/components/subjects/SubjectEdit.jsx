import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSubject, updateSubject } from '../../api';

function SubjectEdit() {
  const [subjectData, setSubjectData] = useState({
    name: '',
    professor: '',
    course_load: '',
    description: '',
    start_date: '',
    end_date: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await getSubject(id);
        const subject = response.data;
        const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : '';
        setSubjectData({
          name: subject.name || '',
          professor: subject.professor || '',
          course_load: subject.course_load || '',
          description: subject.description || '',
          start_date: formatDate(subject.start_date),
          end_date: formatDate(subject.end_date),
        });
      } catch (err) {
        setError('Could not fetch subject data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubject();
  }, [id]);

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
      await updateSubject(id, dataToSend);
      setSuccess('✅ Subject updated successfully! Redirecting...');
      setTimeout(() => navigate(`/subjects/${id}`), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating the subject.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin">
          <span className="text-6xl">📚</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          to={`/subjects/${id}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4 transition-colors"
        >
          <span>←</span>
          Back to Subject
        </Link>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Edit Subject
        </h1>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-lg font-medium flex justify-between items-center">
          <span>❌ {error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 text-xl">✕</button>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-lg font-medium flex justify-between items-center">
          <span>{success}</span>
          <button onClick={() => setSuccess(null)} className="text-green-500 hover:text-green-700 text-xl">✕</button>
        </div>
      )}

      {/* Form */}
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
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <span>💾</span>
            Save Changes
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

export default SubjectEdit;
