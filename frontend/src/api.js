import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:flaeHzNh';

const apiClient = axios.create({
  baseURL: API_URL,
  // keep default timeout; requests that take too long will still fail
});

// Retry on 429 (Too Many Requests) using axios-retry
axiosRetry(apiClient, {
  retries: 3,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 429;
  },
  retryDelay: (retryCount, error) => {
    const retryAfter = error?.response?.headers?.['retry-after'];
    const parsed = retryAfter ? parseInt(retryAfter, 10) : NaN;
    if (!isNaN(parsed)) return parsed * 1000;
    // exponential backoff capped at 5s
    return Math.min(1000 * 2 ** retryCount, 5000);
  },
});

// Simple in-memory cache for GET requests to mitigate bursty calls.
// This prevents duplicate simultaneous requests and caches responses for a short TTL.
const GET_TTL_MS = 7000; // 7 seconds
const inMemoryCache = new Map();

function makeCacheKey(path) {
  return path;
}

async function cachedGet(path) {
  const key = makeCacheKey(path);
  const now = Date.now();
  const entry = inMemoryCache.get(key);

  if (entry) {
    if (entry.expiry && entry.expiry > now && entry.response) {
      return entry.response;
    }
    if (entry.promise) {
      return entry.promise;
    }
    // expired
    inMemoryCache.delete(key);
  }

  const promise = apiClient.get(path)
    .then((res) => {
      inMemoryCache.set(key, { response: res, expiry: Date.now() + GET_TTL_MS });
      return res;
    })
    .catch((err) => {
      inMemoryCache.delete(key);
      throw err;
    });

  // store pending promise to dedupe parallel calls
  inMemoryCache.set(key, { promise });
  return promise;
}

function invalidateCacheByPrefix(prefix) {
  for (const key of Array.from(inMemoryCache.keys())) {
    if (key.startsWith(prefix)) {
      inMemoryCache.delete(key);
    }
  }
}

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
  return cachedGet('/subjects');
};

export const getSubject = (id) => {
  return cachedGet(`/subjects/${id}`);
};

export const createSubject = (subjectData) => {
  return apiClient.post('/subjects', subjectData).then((res) => {
    invalidateCacheByPrefix('/subjects');
    invalidateCacheByPrefix('/summary');
    return res;
  });
};

export const updateSubject = (id, subjectData) => {
  return apiClient.patch(`/subjects/${id}`, subjectData).then((res) => {
    invalidateCacheByPrefix('/subjects');
    invalidateCacheByPrefix('/summary');
    return res;
  });
};

export const deleteSubject = (id) => {
  return apiClient.delete(`/subjects/${id}`).then((res) => {
    invalidateCacheByPrefix('/subjects');
    invalidateCacheByPrefix('/summary');
    invalidateCacheByPrefix('/academic_tasks');
    return res;
  });
};

export const getTasksBySubject = (subjectId) => {
  return cachedGet(`/academic_tasks?subject_id=${subjectId}`);
};

export const getAllTasks = () => {
  return cachedGet('/academic_tasks');
};

export const createTask = (taskData) => {
  return apiClient.post('/academic_tasks', taskData).then((res) => {
    invalidateCacheByPrefix('/academic_tasks');
    invalidateCacheByPrefix('/summary');
    return res;
  });
};

export const updateTask = (taskId, taskData) => {
  return apiClient.patch(`/academic_tasks/${taskId}`, taskData).then((res) => {
    invalidateCacheByPrefix('/academic_tasks');
    invalidateCacheByPrefix('/summary');
    return res;
  });
};

export const deleteTask = (taskId) => {
  return apiClient.delete(`/academic_tasks/${taskId}`).then((res) => {
    invalidateCacheByPrefix('/academic_tasks');
    invalidateCacheByPrefix('/summary');
    return res;
  });
};

// --- Dashboard Endpoints ---

export const getDashboardSummary = () => {
  return cachedGet('/summary');
};

export const generateAIInsights = () => {
  return apiClient.post('/generate_insights').then((res) => {
    // generation may create insights server-side; invalidate insights cache
    invalidateCacheByPrefix('/ai_insights');
    return res;
  });
};

export const getAIInsights = () => {
  return cachedGet('/ai_insights');
};

export const deleteAIInsight = (id) => {
  return apiClient.delete(`/ai_insights/${id}`).then((res) => {
    invalidateCacheByPrefix('/ai_insights');
    return res;
  });
};

export const saveAIInsight = (text, userId) => {
  return apiClient.post('/ai_insights', { text, user_id: userId }).then((res) => {
    invalidateCacheByPrefix('/ai_insights');
    return res;
  });
};

