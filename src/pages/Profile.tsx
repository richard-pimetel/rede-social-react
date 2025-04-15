import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Home as HomeIcon, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { unreadCount } = useChat();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState("(Apaixonado por futebol e corrida!)");
  const [profileBorderColor, setProfileBorderColor] = useState('#0A2A5E');

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    logout();
  };

  const borderColors = [
    { name: 'Azul', value: '#0A2A5E' },
    { name: 'Verde', value: '#4CAF50' },
    { name: 'Vermelho', value: '#F44336' },
    { name: 'Roxo', value: '#9C27B0' },
    { name: 'Laranja', value: '#FF9800' },
    { name: 'Preto', value: '#000000' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#0A2A5E]">
            Esporte<span className="text-[#4CAF50]">ON</span>
          </h1>
          <nav className="flex items-center gap-6">
            <button
              onClick={() => navigate('/home')}
              className="text-gray-600 hover:text-[#0A2A5E] transition-colors"
            >
              <HomeIcon size={24} />
            </button>
            <button className="text-gray-600 hover:text-[#0A2A5E] transition-colors relative">
              <MessageCircle size={24} />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="text-gray-600 hover:text-[#0A2A5E] transition-colors"
            >
              <Settings size={24} />
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content - Agora ocupa todo o espaço disponível */}
      <main className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6 h-full">
          {/* Left Column - Perfil */}
          <div className="lg:w-1/4 flex flex-col">
            <div className="bg-white rounded-lg shadow-sm p-6 flex-grow flex flex-col">
              <div className="flex flex-col items-center">
                <img
                  src={user?.imagemPerfil || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-40 h-40 rounded-full mb-4 border-4"
                  style={{ borderColor: profileBorderColor }}
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{user?.name || "Cazé tv"}</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6 flex-grow">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-[#0A2A5E]">2 mil</div>
                  <div className="text-sm text-gray-600">Publicações</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-[#0A2A5E]">989mil</div>
                  <div className="text-sm text-gray-600">Seguidores</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-[#0A2A5E]">459</div>
                  <div className="text-sm text-gray-600">Seguindo</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-[#0A2A5E]">1.2mi</div>
                  <div className="text-sm text-gray-600">Curtidas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Conteúdo principal */}
          <div className="lg:w-3/4 flex flex-col gap-6">
            {/* Bio Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex-grow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Biografia</h3>
                <button
                  onClick={() => setEditingBio(!editingBio)}
                  className="text-[#0A2A5E] hover:underline"
                >
                  {editingBio ? 'Salvar' : 'Editar'}
                </button>
              </div>
              
              {editingBio ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-[#0A2A5E] focus:border-[#0A2A5E]"
                  rows={4}
                />
              ) : (
                <p className="text-gray-600">{bio}</p>
              )}
              
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-[#0A2A5E]">→</span>
                  Esportes favoritos (futebol, basquete, corrida, etc.)
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-[#0A2A5E]">→</span>
                  Time do coração: Corinthians
                </li>
              </ul>
            </div>

            {/* Publications - Agora com mais itens e melhor espaçamento */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Publicações</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={`https://source.unsplash.com/random/300x300?sports&${i}`}
                      alt={`Publication ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Configurações</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Cor da borda do perfil</h4>
                <div className="grid grid-cols-3 gap-4">
                  {borderColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setProfileBorderColor(color.value)}
                      className={`p-4 rounded-lg border-2 ${
                        profileBorderColor === color.value ? 'border-[#0A2A5E]' : 'border-gray-200'
                      }`}
                    >
                      <div 
                        className="w-full h-8 rounded-full mb-2 mx-auto"
                        style={{ backgroundColor: color.value }}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-600 font-medium"
              >
                <LogOut size={20} />
                Sair da Conta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-sm p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirmar Saída</h3>
            <p className="text-gray-600 mb-6">Tem certeza que deseja sair da sua conta?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Sim, Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;