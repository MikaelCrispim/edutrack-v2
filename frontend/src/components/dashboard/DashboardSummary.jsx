import React, { useState, useEffect } from 'react';
import { getDashboardSummary } from '../../api';

const DashboardSummary = () => {
  const [summaryData, setSummaryData] = useState({
    totalSubjects: 0,
    pendingActivities: 0,
    completionPercentage: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await getDashboardSummary();
        setSummaryData(response.data);
      } catch (err) {
        setError('Failed to fetch summary data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin">
          <span className="text-4xl">⏳</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-lg font-medium">
        ❌ {error}
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Subjects',
      value: summaryData.totalSubjects,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      icon: '📚',
    },
    {
      title: 'Pending Activities',
      value: summaryData.pendingActivities,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-100',
      icon: '⏰',
    },
    {
      title: 'Completion Rate',
      value: `${summaryData.completionPercentage}%`,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-100',
      icon: '✅',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${stat.bgGradient} rounded-xl border-2 border-opacity-20 border-gray-200 p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">{stat.title}</p>
              <p className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
            <span className="text-4xl">{stat.icon}</span>
          </div>
          <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${stat.gradient}`}
              style={{ width: `${Math.min(summaryData.completionPercentage, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummary;
