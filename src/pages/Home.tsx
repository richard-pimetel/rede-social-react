import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Home as HomeIcon, Info, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';

interface Post {
  id: number;
  author: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

interface Comment {
  id: number;
  author: string;
  content: string;
}

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { unreadCount } = useChat();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "João Silva",
      content: "Que jogo incrível ontem! 🏆⚽ O Brasil jogou demais e garantiu mais uma vitória importante nas eliminatórias!",
      imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=1000",
      likes: 156,
      comments: [
        { id: 1, author: "Maria", content: "Concordo! Foi espetacular!" },
        { id: 2, author: "Pedro", content: "Melhor jogo do ano até agora!" }
      ],
      isLiked: false
    },
    {
      id: 2,
      author: "Ana Costa",
      content: "Treino concluído! 💪 Mais um dia de dedicação na academia. Foco total na preparação para o campeonato estadual de natação!",
      imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000",
      likes: 89,
      comments: [
        { id: 3, author: "Carlos", content: "Arrasou! Continue assim!" },
        { id: 4, author: "Julia", content: "Você é inspiração! 🏊‍♀️" }
      ],
      isLiked: false
    }
  ]);
  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: number, comment: string) => {
    if (!comment.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            author: user?.name || 'Anônimo',
            content: comment
          }]
        };
      }
      return post;
    }));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now(),
      author: user?.name || 'Anônimo',
      content: newPost,
      likes: 0,
      comments: [],
      isLiked: false
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#0A2A5E]">
            Esporte<span className="text-[#4CAF50]">ON</span>
          </h1>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-[#0A2A5E] transition-colors">
              <HomeIcon size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-[#0A2A5E] transition-colors">
              <Info size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-[#0A2A5E] transition-colors relative">
              <MessageCircle size={24} />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </a>
            <button
              onClick={() => navigate('/profile')}
              className="text-gray-600 hover:text-[#0A2A5E] transition-colors"
            >
              <User size={24} />
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto pt-24 px-4 pb-8">
        {/* Create Post */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#0A2A5E] rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.[0] || 'A'}
            </div>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="No que você está pensando?"
              className="flex-1 resize-none border-none focus:ring-0 text-gray-700"
              rows={3}
            />
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#0A2A5E] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Foto
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#0A2A5E] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Vídeo
              </button>
            </div>
            <button
              onClick={handlePost}
              className="bg-[#0A2A5E] text-white px-6 py-2 rounded-lg hover:bg-[#09377B] transition-colors"
            >
              Publicar
            </button>
          </div>
        </div>

        {/* Posts */}
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">{post.author}</h3>
                  <p className="text-sm text-gray-500">Agora mesmo</p>
                </div>
              </div>
              <p className="text-gray-800 mb-4">{post.content}</p>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex items-center gap-6 py-2 border-t border-b">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 ${
                    post.isLiked ? 'text-red-500' : 'text-gray-600'
                  } hover:text-red-500 transition-colors`}
                >
                  <svg className="w-6 h-6" fill={post.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600">
                  <MessageCircle size={24} />
                  <span>{post.comments.length}</span>
                </button>
              </div>
              {/* Comments */}
              <div className="mt-4 space-y-4">
                {post.comments.map(comment => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm text-gray-800">{comment.author}</h4>
                      <p className="text-gray-600 text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
                {/* Add Comment */}
                <div className="flex gap-3 mt-4">
                  <div className="w-8 h-8 bg-[#0A2A5E] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.[0] || 'A'}
                  </div>
                  <form
                    className="flex-1"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = e.currentTarget.elements.namedItem('comment') as HTMLInputElement;
                      handleComment(post.id, input.value);
                      input.value = '';
                    }}
                  >
                    <input
                      type="text"
                      name="comment"
                      className="w-full rounded-full bg-gray-50 border-gray-200 focus:ring-[#0A2A5E] focus:border-[#0A2A5E]"
                      placeholder="Escreva um comentário..."
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;