
import { useState, useEffect } from 'react';
import NewsletterPopup from '@/components/NewsletterPopup';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-transparent">
      {/* Newsletter Popup */}
      <NewsletterPopup />
    </div>
  );
};

export default Index;
