import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    senhaRecuperacao: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      await register({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        senhaRecuperacao: formData.senhaRecuperacao
      });
      navigate('/home');
    } catch (err) {
      setError('Erro ao cadastrar usuário');
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
          <p className="text-gray-600 mt-2">Cadastre-se para acessar o melhor do esporte</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full px-0 pt-3 pb-2 text-gray-800 border-b-2 border-gray-300 focus:border-[#0A2A5E] focus:outline-none transition-colors"
              placeholder=" "
              required
            />
            <label className="absolute left-0 top-3 text-gray-600 transition-all duration-300 pointer-events-none transform origin-left">
              Nome Completo
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="w-full px-0 pt-3 pb-2 text-gray-800 border-b-2 border-gray-300 focus:border-[#0A2A5E] focus:outline-none transition-colors"
              placeholder=" "
              required
            />
            <label className="absolute left-0 top-3 text-gray-600 transition-all duration-300 pointer-events-none transform origin-left">
              Senha
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              className="w-full px-0 pt-3 pb-2 text-gray-800 border-b-2 border-gray-300 focus:border-[#0A2A5E] focus:outline-none transition-colors"
              placeholder=" "
              required
            />
            <label className="absolute left-0 top-3 text-gray-600 transition-all duration-300 pointer-events-none transform origin-left">
              Confirmar Senha
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              name="senhaRecuperacao"
              value={formData.senhaRecuperacao}
              onChange={handleChange}
              className="w-full px-0 pt-3 pb-2 text-gray-800 border-b-2 border-gray-300 focus:border-[#0A2A5E] focus:outline-none transition-colors"
              placeholder=" "
              required
            />
            <label className="absolute left-0 top-3 text-gray-600 transition-all duration-300 pointer-events-none transform origin-left">
              Palavra de Recuperação
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
              'Cadastrar'
            )}
          </button>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <a href="/login" className="text-[#0A2A5E] hover:underline font-medium">
                Faça login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;