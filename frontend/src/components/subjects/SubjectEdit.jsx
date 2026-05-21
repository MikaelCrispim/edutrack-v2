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
        setError('Não foi possível carregar os dados da disciplina.');
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
      setSuccess('✅ Disciplina atualizada com sucesso! Redirecionando...');
      setTimeout(() => navigate(`/subjects/${id}`), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Ocorreu um erro ao atualizar a disciplina.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
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
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold mb-4 transition-colors"
        >
          <span>←</span>
          Voltar para Disciplina
        </Link>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Editar Disciplina
        </h1>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg font-medium flex justify-between items-center">
          <span>❌ {error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 dark:hover:text-red-300 text-xl cursor-pointer">✕</button>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-green-50 dark:bg-green-900/30 border-2 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-6 py-4 rounded-lg font-medium flex justify-between items-center">
          <span>{success}</span>
          <button onClick={() => setSuccess(null)} className="text-green-500 hover:text-green-700 dark:hover:text-green-300 text-xl cursor-pointer">✕</button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-slate-700 rounded-xl p-8 shadow-md transition-colors duration-300">
        {/* Subject Name */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-3 flex items-center gap-2" htmlFor="name">
            <span>📚</span>
            Nome da Disciplina *
          </label>
          <input
            className="w-full px-4 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            id="name"
            type="text"
            name="name"
            placeholder="Ex: Cálculo I"
            value={subjectData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Professor & Course Load */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-3 flex items-center gap-2" htmlFor="professor">
              <span>👨‍🏫</span>
              Professor
            </label>
            <input
              className="w-full px-4 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              id="professor"
              type="text"
              name="professor"
              placeholder="Ex: Dr. Silva"
              value={subjectData.professor}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-3 flex items-center gap-2" htmlFor="course_load">
              <span>⏱️</span>
              Carga Horária (horas)
            </label>
            <input
              className="w-full px-4 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              id="course_load"
              type="number"
              name="course_load"
              placeholder="Ex: 60"
              value={subjectData.course_load}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-3 flex items-center gap-2" htmlFor="description">
            <span>📝</span>
            Descrição
          </label>
          <textarea
            className="w-full px-4 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            id="description"
            name="description"
            placeholder="Adicione detalhes sobre a disciplina..."
            rows={4}
            value={subjectData.description}
            onChange={handleChange}
          />
        </div>

        {/* Start Date & End Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-3 flex items-center gap-2" htmlFor="start_date">
              <span>📅</span>
              Data de Início
            </label>
            <input
              className="w-full px-4 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              id="start_date"
              type="date"
              name="start_date"
              value={subjectData.start_date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-3 flex items-center gap-2" htmlFor="end_date">
              <span>🏁</span>
              Data de Término
            </label>
            <input
              className="w-full px-4 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              id="end_date"
              type="date"
              name="end_date"
              value={subjectData.end_date}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-8 rounded-lg transition-all duration-200 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>💾</span>
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubjectEdit;
