import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

// Organisms
import HeroSection from '../../components/organisms/HeroSection';
import ExploreSection from '../../components/organisms/ExploreSection';
import AboutSection from '../../components/organisms/AboutSection';
import FacilitySection from '../../components/organisms/FacilitySection';
import HowItWorksSection from '../../components/organisms/HowItWorksSection';
import FaqSection from '../../components/organisms/FaqSection';
import ContactSection from '../../components/organisms/ContactSection';

const Home = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatState, setChatState] = useState('idle'); // 'idle' | 'active'
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [type, setType] = useState('');
  const [kosList, setKosList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchKosData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/kos/search', {
        params: {
          city: city || undefined,
          keyword: keyword || undefined,
          minPrice: minPrice ? parseInt(minPrice) : undefined,
          maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
          type: type || undefined
        }
      });
      
      if (response.data.success) {
        setKosList(response.data.data);
      } else {
        setKosList([]);
      }
    } catch (error) {
      console.error("Error fetching kos data:", error);
      setKosList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKosData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchKosData();
  };

  const handleChatSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Pindah ke state aktif saat user pertama kali chat
    if (chatState === 'idle') {
      setChatState('active');
      // window.scrollTo(0, 0); // Scroll dimatikan berdasarkan request user
    }

    const userMessage = chatInput;
    setChatInput(''); // Kosongkan input
    
    // Tambahkan pesan user ke UI
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatLoading(true);

    try {
      const response = await api.post('/chat', { message: userMessage });
      
      if (response.data.success) {
        const { reply, kosCards } = response.data.data;
        // Tambahkan pesan AI ke UI
        setChatMessages(prev => [...prev, { 
          role: 'ai', 
          content: reply,
          kosCards: kosCards || []
        }]);
      }
    } catch (error) {
      console.error("Error from AI API:", error);
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        content: "Maaf, sistem AI sedang mengalami gangguan saat ini. Silakan coba lagi nanti." 
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeroSection 
        chatInput={chatInput} 
        setChatInput={setChatInput} 
        handleChatSubmit={handleChatSubmit}
        chatState={chatState}
        chatMessages={chatMessages}
        isChatLoading={isChatLoading}
      />
      
      <ExploreSection 
        handleSearch={handleSearch}
        city={city}
        setCity={setCity}
        keyword={keyword}
        setKeyword={setKeyword}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        type={type}
        setType={setType}
        isLoading={isLoading}
        kosList={kosList}
      />
      <AboutSection />
      <FacilitySection />
      <HowItWorksSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default Home;
