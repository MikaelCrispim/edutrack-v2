import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup, verifyRegistration } from '../../api';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("❌ As senhas não coincidem!");
      return;
    }

    if (formData.password.length < 6) {
      setError("❌ A senha deve ter no mínimo 6 caracteres!");
      return;
    }

    setError('');
    setLoading(true);
    try {
      const response = await signup(formData);
      localStorage.setItem('token', response.data.authToken);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyRegistration(code);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100">
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2">🚀</h1>
          <h2 className="text-3xl font-bold text-gray-800">
            {step === 1 ? 'Create an Account' : 'Verify Your Email'}
          </h2>
          <p className="text-gray-600 mt-2">Start your learning journey today</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg font-medium flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-red-500 hover:text-red-700 text-xl">✕</button>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSubmitStep1} className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100">
            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span>👤</span>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span>📧</span>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span>🔐</span>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span>🔒</span>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Creating account...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Create Account
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitStep2} className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center mb-6">
              <p className="text-gray-600">We've sent a 6-digit code to <span className="font-semibold">{formData.email}</span>.</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                Verification Code
              </label>
              <input
                type="text"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors outline-none text-center text-3xl tracking-[0.5em] font-mono"
                placeholder="000000"
                maxLength="6"
              />
            </div>

            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Verifying...
                </>
              ) : (
                <>
                  <span>✅</span>
                  Verify & Login
                </>
              )}
            </button>
          </form>
        )}

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors">
              Login here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>© 2024 EduTrack. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
