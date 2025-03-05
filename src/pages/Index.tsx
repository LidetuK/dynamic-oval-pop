
import { useState, useEffect } from 'react';
import NewsletterPopup from '@/components/NewsletterPopup';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6">
      <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Welcome to Your Application</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          This minimalist design puts focus on content and user experience. Seamless interactions and careful attention to detail create an intuitive interface.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-brand-black text-white hover:bg-gray-800 font-medium px-6 py-3 rounded-full transition-all duration-300 transform hover:translate-y-[-2px]">
            Get Started
          </button>
          <button className="bg-white text-brand-black border border-gray-300 hover:border-gray-400 font-medium px-6 py-3 rounded-full transition-all duration-300 transform hover:translate-y-[-2px]">
            Learn More
          </button>
        </div>
      </div>
      
      {/* Newsletter Popup */}
      <NewsletterPopup />
    </div>
  );
};

export default Index;
