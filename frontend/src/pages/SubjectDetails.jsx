import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubject, getTasksBySubject, createTask, updateTask, deleteTask, generateAIInsights } from 'C:/Users/Administrator/Downloads/edutrack-refaz/frontend/src/api.js';

function SubjectDetails() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '' });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [subjectRes, tasksRes] = await Promise.all([
        getSubject(id),
        getTasksBySubject(id)
      ]);
      setSubject(subjectRes.data);
      setTasks(tasksRes.data || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load subject or tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await createTask({
        ...newTask,
        status: 'pending',
        subject_id: parseInt(id)
      });
      setNewTask({ title: '', description: '', due_date: '' });
      setShowForm(false);
      fetchData();
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
      await updateTask(taskId, { status: newStatus });
      if (newStatus === 'completed') {
        // Fire-and-forget call to generate insights
        generateAIInsights().catch(err => {
          console.error("Failed to trigger AI insight generation:", err);
        });
      }
      fetchData();
    } catch (err) {
      setError('Failed to update task status');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        fetchData();
      } catch (err) {
        setError('Failed to delete task');
      }
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

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 text-red-700 px-8 py-6 rounded-lg font-medium max-w-2xl mx-auto mt-8 flex justify-between items-center">
        <span>❌ Error: {error}</span>
        <Link to="/dashboard" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
          Back
        </Link>
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-8">
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4 transition-colors"
          >
            <span>←</span>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {subject?.name}
          </h1>
        </div>
        <Link
          to={`/subjects/${id}/edit`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <span>✏️</span>
          Edit
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-lg font-medium flex justify-between items-center">
          <span>❌ {error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 text-xl">✕</button>
        </div>
      )}

      {/* Subject Info Card */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100 p-8 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-3xl">📋</span>
          Subject Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 font-medium">👨‍🏫 Professor</p>
            <p className="text-lg font-semibold text-gray-900">{subject?.professor}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 font-medium">⏱️ Course Load</p>
            <p className="text-lg font-semibold text-gray-900">{subject?.course_load} hours</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 font-medium">📅 Start Date</p>
            <p className="text-lg font-semibold text-gray-900">{new Date(subject?.start_date).toLocaleDateString()}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 font-medium">🏁 End Date</p>
            <p className="text-lg font-semibold text-gray-900">{new Date(subject?.end_date).toLocaleDateString()}</p>
          </div>
        </div>
        <p className="text-gray-700 mt-6 leading-relaxed">{subject?.description}</p>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 p-6 text-center">
          <p className="text-gray-600 font-medium mb-2">Total Tasks</p>
          <p className="text-4xl font-bold text-blue-600">{tasks.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 p-6 text-center">
          <p className="text-gray-600 font-medium mb-2">Completed</p>
          <p className="text-4xl font-bold text-green-600">{completedCount}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 p-6 text-center">
          <p className="text-gray-600 font-medium mb-2">Completion Rate</p>
          <p className="text-4xl font-bold text-purple-600">{completionRate}%</p>
        </div>
      </div>

      {/* Add New Task Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          <span className="text-xl">➕</span>
          New Task
        </button>
      </div>

      {/* Add New Task Form */}
      {showForm && (
        <form onSubmit={handleCreateTask} className="bg-white rounded-xl border-2 border-blue-100 p-8 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">✏️</span>
              Create New Task
            </h2>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="task-title" className="block text-sm font-semibold text-gray-700 mb-2">
                Task Name *
              </label>
              <input
                id="task-title"
                type="text"
                placeholder="e.g., Read Chapter 5"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="due-date" className="block text-sm font-semibold text-gray-700 mb-2">
                Due Date *
              </label>
              <input
                id="due-date"
                type="date"
                value={newTask.due_date}
                onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Add any additional details about this task..."
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows={4}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <span>✅</span>
              Add Task
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Tasks List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-3xl">✓</span>
          Tasks ({tasks.length})
        </h2>

        {tasks.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-b from-blue-50 to-purple-50 rounded-xl border-2 border-dashed border-gray-300">
            <span className="text-6xl mb-4 block">📝</span>
            <p className="text-gray-600 text-lg font-medium mb-4">No tasks yet</p>
            <p className="text-gray-500 mb-6">Click the "New Task" button above to create your first task!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                  task.status === 'completed'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className={`text-2xl ${task.status === 'completed' ? '✅' : '⭕'}`} />
                  <h3 className={`flex-1 font-bold text-lg ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h3>
                </div>

                <p className={`mb-4 text-sm ${task.status === 'completed' ? 'text-gray-500' : 'text-gray-600'}`}>
                  {task.description}
                </p>

                {task.due_date && (
                  <p className="text-xs text-gray-600 mb-4 flex items-center gap-1">
                    📅 {new Date(task.due_date).toLocaleDateString()}
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTaskStatus(task.id, task.status)}
                    className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      task.status === 'completed'
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {task.status === 'completed' ? '✓ Undo' : '○ Mark Done'}
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SubjectDetails;

