import axios from 'axios';

const API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:flaeHzNh';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Use an interceptor to automatically add the auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Auth Endpoints ---

export const signup = (userData) => {
  return apiClient.post('/auth/signup', userData);
};

export const verifyRegistration = (code) => {
  return apiClient.post('/verify', {code});
};

export const login = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

export const requestPasswordReset = (email) => {
  return apiClient.post('/password-reset', { email });
};

export const verifyPasswordReset = (email, code, new_password) => {
  return apiClient.post('/reset-password-verify', { email, code, new_password });
};

// --- Subjects Endpoints ---

// The token is now added automatically by the interceptor,
// so we no longer need to pass it as an argument.
export const getSubjects = () => {
  return apiClient.get('/subjects');
};

export const getSubject = (id) => {
  return apiClient.get(`/subjects/${id}`);
};

export const createSubject = (subjectData) => {
  return apiClient.post('/subjects', subjectData);
};

export const updateSubject = (id, subjectData) => {
  return apiClient.patch(`/subjects/${id}`, subjectData);
};

export const deleteSubject = (id) => {
  return apiClient.delete(`/subjects/${id}`);
};

export const getTasksBySubject = (subjectId) => {
  return apiClient.get(`/academic_tasks?subject_id=${subjectId}`);
};

export const getAllTasks = () => {
  return apiClient.get('/academic_tasks');
};

export const createTask = (taskData) => {
  return apiClient.post('/academic_tasks', taskData);
};

export const updateTask = (taskId, taskData) => {
  return apiClient.patch(`/academic_tasks/${taskId}`, taskData);
};

export const deleteTask = (taskId) => {
  return apiClient.delete(`/academic_tasks/${taskId}`);
};

// --- Dashboard Endpoints ---

export const getDashboardSummary = () => {
  return apiClient.get('/summary');
};

export const generateAIInsights = () => {
  return apiClient.post('/generate_insights');
};

export const getAIInsights = () => {
  return apiClient.get('/ai_insights');
};

export const deleteAIInsight = (id) => {
  return apiClient.delete(`/ai_insights/${id}`);
};

export const saveAIInsight = (text, userId) => {
  return apiClient.post('/ai_insights', { text, user_id: userId });
};

