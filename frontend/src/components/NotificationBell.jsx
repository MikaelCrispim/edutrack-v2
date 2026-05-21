import React, { useState, useEffect, useRef } from 'react';
import { getSubjects, getTasksBySubject } from '../api';

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const subjectsRes = await getSubjects();
      const subjects = subjectsRes.data || [];

      const allNotifications = [];
      const now = new Date();
      const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

      await Promise.all(
        subjects.map(async (subject) => {
          const tasksRes = await getTasksBySubject(subject.id);
          const tasks = tasksRes.data || [];

          tasks.forEach((task) => {
            if (task.status === 'completed') return;
            if (!task.due_date) return;

            const dueDate = new Date(task.due_date);
            const isOverdue = dueDate < now;
            const isUpcoming = dueDate <= threeDaysFromNow && dueDate >= now;

            if (isOverdue) {
              const daysLate = Math.ceil((now - dueDate) / (1000 * 60 * 60 * 24));
              allNotifications.push({
                id: task.id,
                type: 'overdue',
                title: task.title,
                subject: subject.name,
                message: `Atrasada há ${daysLate} dia${daysLate > 1 ? 's' : ''}`,
                dueDate,
                priority: 1,
              });
            } else if (isUpcoming) {
              const daysLeft = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
              allNotifications.push({
                id: task.id,
                type: 'upcoming',
                title: task.title,
                subject: subject.name,
                message: daysLeft === 0 ? 'Vence hoje!' : `Vence em ${daysLeft} dia${daysLeft > 1 ? 's' : ''}`,
                dueDate,
                priority: daysLeft === 0 ? 2 : 3,
              });
            }
          });
        })
      );

      // Ordena: atrasadas primeiro, depois por urgência
      allNotifications.sort((a, b) => a.priority - b.priority);
      setNotifications(allNotifications);
    } catch (err) {
      console.error('Erro ao buscar notificações:', err);
    } finally {
      setLoading(false);
    }
  };

  const count = notifications.length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg transition-all duration-200 hover:bg-white/20 cursor-pointer"
        title="Notificações"
        aria-label={`${count} notificações`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {count > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-600 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-gray-100 dark:border-slate-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              🔔 Notificações
              {count > 0 && (
                <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </h3>
          </div>

          {loading ? (
            <div className="p-6 text-center">
              <span className="animate-spin inline-block text-2xl">⏳</span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-6 text-center">
              <span className="text-3xl mb-2 block">🎉</span>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Tudo em dia! Nenhuma tarefa próxima do prazo.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors ${
                    notif.type === 'overdue' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-amber-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">
                      {notif.type === 'overdue' ? '🚨' : '⏰'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-800 dark:text-gray-100 truncate">
                        {notif.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        📚 {notif.subject}
                      </p>
                      <p
                        className={`text-xs font-medium mt-1 ${
                          notif.type === 'overdue'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {notif.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
