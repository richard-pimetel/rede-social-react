import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/home');
    } catch (err) {
      setError('Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A2A5E] flex items-center justify-center p-5">
      <div className="w-full max-w-[500px] bg-white rounded-[15px] p-10 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0A2A5E]">
            Esporte<span className="text-[#4CAF50]">ON</span>
          </h1>
          <p className="text-gray-600 mt-2">Faça login para acessar o melhor do esporte</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-0 pt-3 pb-2 text-gray-800 border-b-2 border-gray-300 focus:border-[#0A2A5E] focus:outline-none transition-colors"
              placeholder=" "
              required
            />
            <label className="absolute left-0 top-3 text-gray-600 transition-all duration-300 pointer-events-none transform origin-left">
              E-mail
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 pt-3 pb-2 text-gray-800 border-b-2 border-gray-300 focus:border-[#0A2A5E] focus:outline-none transition-colors"
              placeholder=" "
              required
            />
            <label className="absolute left-0 top-3 text-gray-600 transition-all duration-300 pointer-events-none transform origin-left">
              Senha
            </label>
          </div>

          {error && (
            <div className="text-red-500 text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0A2A5E] text-white py-3 rounded-lg font-medium hover:bg-[#09377B] transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center h-[48px]"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Entrar'
            )}
          </button>

          <div className="flex justify-between mt-6 text-sm">
            <a href="/register" className="text-[#0A2A5E] hover:underline font-medium">
              Criar uma conta
            </a>
            <a href="/forgot-password" className="text-[#0A2A5E] hover:underline font-medium">
              Esqueceu a senha?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;