import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { requestPasswordReset, verifyPasswordReset } from '../../api';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await requestPasswordReset(email);
      setMessage(response.data.message || 'We have sent a verification code to your email.');
      setMessageType('success');
      setStep(2);
    } catch (err) {
      setMessage('If an account exists, we have sent a verification code to your email.');
      setMessageType('success');
      setStep(2);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters.');
      setMessageType('error');
      return;
    }
    setLoading(true);
    try {
      await verifyPasswordReset(email, code, newPassword);
      setMessage('Password reset successfully! Redirecting to login...');
      setMessageType('success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid code or failed to reset password.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2">🔑</h1>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Reset Password
          </h1>
          <p className="text-gray-600 mt-2">We'll help you get back to learning</p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg font-medium flex justify-between items-center border-2 ${
              messageType === 'success'
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            <span>{message}</span>
            <button
              onClick={() => setMessage(null)}
              className={`text-xl ${messageType === 'success' ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700'}`}
            >
              ✕
            </button>
          </div>
        )}

        {/* Forms */}
        {step === 1 ? (
          <form onSubmit={handleSubmitStep1} className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span>📧</span>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@example.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                Enter the email address associated with your account.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mb-4"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Sending...
                </>
              ) : (
                <>
                  <span>📬</span>
                  Send Verification Code
                </>
              )}
            </button>

            {/* Back to Login Button */}
            <Link
              to="/login"
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>←</span>
              Back to Login
            </Link>
          </form>
        ) : (
          <form onSubmit={handleSubmitStep2} className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100 animate-in fade-in zoom-in-95 duration-300">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="000000"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors outline-none text-center text-3xl tracking-[0.5em] font-mono"
                required
                maxLength="6"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Verifying...
                </>
              ) : (
                <>
                  <span>✅</span>
                  Verify & Reset
                </>
              )}
            </button>
          </form>
        )}

        {/* Help Text */}
        <div className="mt-8 text-center">
          <div className="text-sm text-gray-600 space-y-2">
            <p>💡 Check your email for a verification code to reset your password.</p>
            <p>Didn't receive an email? Check your spam folder.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>© 2024 EduTrack. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
