import React, { useEffect, useRef } from 'react';
import { Sparkles, Send, User, Bot } from 'lucide-react';
import KosCard from './KosCard'; // Asumsi kita punya KosCard di level organisme

const ChatBubble = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isUser ? 'bg-brand text-white' : 'bg-white border border-outline-light text-brand shadow-sm'
        }`}>
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>
        
        {/* Message Content */}
        <div className="flex flex-col gap-3">
          {/* Text content */}
          <div className={`p-4 rounded-2xl ${
            isUser 
              ? 'bg-brand text-white rounded-tr-sm' 
              : 'bg-white border border-outline-light text-ink rounded-tl-sm shadow-sm'
          }`}>
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          
          {/* Render KosCards if any (only for AI) */}
          {!isUser && message.kosCards && message.kosCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              {message.kosCards.map(kos => (
                <div key={kos.id} className="w-full">
                  <KosCard kos={kos} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HeroSection = ({ chatInput, setChatInput, handleChatSubmit, chatState, chatMessages, isChatLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // Tidak lagi scroll otomatis berdasarkan request user
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (chatState === 'active') {
      scrollToBottom();
    }
  }, [chatMessages, isChatLoading, chatState]);

  return (
    <section 
      id="ai-assistant" 
      className={`min-h-screen flex flex-col items-center relative overflow-hidden bg-brand-soft/30 pt-24 ${
        chatState === 'active' ? 'pb-24' : 'justify-center pb-16'
      }`}
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-[80px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-soft rounded-full blur-[100px] opacity-40 pointer-events-none"></div>

      {/* Main Content Area */}
      <div className={`w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ease-in-out ${
        chatState === 'active' ? 'flex-1 flex flex-col' : 'text-center animate-page-enter'
      }`}>
        
        {/* ====== IDLE STATE (Landing Page Mode) ====== */}
        {chatState === 'idle' && (
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-outline-light shadow-sm text-brand font-medium text-sm mb-8 animate-fade-in-up">
              <Sparkles size={16} />
              <span>AI Assistant</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink leading-tight">
              Cari kos impian Anda,<br/>dengan AI Assistant Kos Search.
            </h1>
          </div>
        )}

        {/* ====== ACTIVE STATE (Chat Mode) ====== */}
        {chatState === 'active' && (
          <div className="flex-1 w-full flex flex-col mb-8 pt-4">
            {chatMessages.map((msg, idx) => (
              <ChatBubble key={idx} message={msg} />
            ))}
            
            {isChatLoading && (
              <div className="flex w-full justify-start mb-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-white border border-outline-light text-brand shadow-sm flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-outline-light rounded-tl-sm shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand/50 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-brand/50 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-brand/50 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* AI Chat Input Box (Fixed at bottom if active, centered if idle) */}
        <div className={`w-full max-w-3xl mx-auto ${chatState === 'active' ? 'sticky bottom-8' : 'mt-6'}`}>
          <form 
            onSubmit={handleChatSubmit} 
            className={`relative bg-white rounded-2xl shadow-xl border p-2 flex items-center transition-all ${
              chatState === 'active' 
                ? 'shadow-brand/20 border-brand/30' 
                : 'shadow-brand/10 border-outline-light/50 focus-within:shadow-2xl focus-within:ring-2 focus-within:ring-brand/20 focus-within:border-brand'
            }`}
          >
            <textarea
              rows="1"
              className="w-full bg-transparent px-4 py-3 md:py-4 outline-none text-ink text-base md:text-lg resize-none placeholder:text-ink-muted"
              placeholder="Ketik kriteria kos yang Anda inginkan di sini..."
              value={chatInput}
              onChange={(e) => {
                setChatInput(e.target.value);
                // Auto-resize textarea
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              style={{ minHeight: '56px', maxHeight: '150px' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleChatSubmit(e);
                }
              }}
            />
            <button 
              type="submit"
              disabled={!chatInput.trim() || isChatLoading}
              className={`absolute right-4 bottom-4 p-3 bg-brand disabled:bg-surface-hover disabled:text-ink-muted text-white rounded-xl transition-all shadow-md flex items-center justify-center ${
                chatInput.trim() && !isChatLoading ? 'hover:scale-110' : ''
              }`}
            >
              <Send size={20} />
            </button>
          </form>
        </div>

        {/* ====== IDLE STATE (Suggestions) ====== */}
        {chatState === 'idle' && (
          <div className="flex flex-col items-center gap-3 mt-12">
            <span className="text-sm font-semibold text-ink-muted mt-3 mb-2">Saran pencarian:</span>
            <div className="flex flex-col items-center gap-3 w-full">
              {/* Baris 1: 3 tombol */}
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={() => setChatInput("Kos bebas jam malam di Jaksel")} className="text-xs bg-white border border-outline-light px-3 py-1.5 rounded-full text-ink-light hover:text-brand hover:border-brand transition-colors">"Kos bebas jam malam di Jaksel"</button>
                <button onClick={() => setChatInput("Kos AC kamar mandi dalam max 1.5jt")} className="text-xs bg-white border border-outline-light px-3 py-1.5 rounded-full text-ink-light hover:text-brand hover:border-brand transition-colors">"Kos AC max 1.5jt"</button>
                <button onClick={() => setChatInput("Kos putra dekat UGM include listrik")} className="text-xs bg-white border border-outline-light px-3 py-1.5 rounded-full text-ink-light hover:text-brand hover:border-brand transition-colors">"Kos putra dekat UGM include listrik"</button>
              </div>
              {/* Baris 2: 2 tombol */}
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={() => setChatInput("Kos eksklusif Bandung kolam renang")} className="text-xs bg-white border border-outline-light px-3 py-1.5 rounded-full text-ink-light hover:text-brand hover:border-brand transition-colors">"Kos eksklusif Bandung kolam renang"</button>
                <button onClick={() => setChatInput("Kos putri murah dekat stasiun Sudirman")} className="text-xs bg-white border border-outline-light px-3 py-1.5 rounded-full text-ink-light hover:text-brand hover:border-brand transition-colors">"Kos putri dekat stasiun Sudirman"</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
