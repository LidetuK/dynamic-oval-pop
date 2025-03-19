
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Show popup after a short delay for a better entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimating(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call
    setIsSubmitted(true);
    toast({
      title: "Success!",
      description: "You've been added to our newsletter.",
    });
  };

  // Updated backdrop classes
  const backdropClasses = cn(
    'fixed inset-0 z-50 bg-transparent transition-opacity duration-300',
    isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
    isAnimating ? 'animate-fade-out' : 'animate-fade-in'
  );

  // Updated popup classes with larger size
  const popupClasses = cn(
    'fixed z-50',
    'w-[98vw] max-w-[1800px] aspect-[1.8/1] rounded-full overflow-hidden', // Increased max width to 1800px and width to 98vw
    'flex flex-col md:flex-row shadow-2xl',
    'transition-all duration-700',
    'inset-0 m-auto', // This ensures the popup is absolutely centered
    isVisible ? 'scale-100 rotate-0 opacity-100' : 'scale-75 rotate-6 opacity-0 pointer-events-none',
    isAnimating ? 'animate-scale-out' : 'animate-scale-in'
  );

  return (
    <>
      <div className={backdropClasses} onClick={handleClose} />
      <div className={popupClasses} style={{ height: 'fit-content' }}>
        {/* Yellow Section */}
        <div className="relative w-full md:w-1/2 h-full bg-brand-yellow flex items-center justify-center overflow-hidden">
          <div className="absolute w-[150%] h-[150%] bg-brand-yellow rounded-full -top-[25%] -left-[25%] animate-float" />
          <div className="absolute w-[130%] h-[130%] bg-brand-lightYellow rounded-full opacity-60 -bottom-[30%] -right-[15%] animate-float animation-delay-1000" />
          
          <div className="relative z-10 p-6 md:p-12 flex flex-col items-center justify-center text-brand-black h-full">
            <h2 className="text-4xl md:text-7xl font-bold mb-3 md:mb-6 tracking-tight animate-slide-up opacity-0 [animation-delay:200ms]">
              Join Our Newsletter
            </h2>
            <p className="text-base md:text-2xl max-w-xs md:max-w-xl text-center animate-slide-up opacity-0 [animation-delay:400ms]">
              Get exclusive updates and content delivered straight to your inbox
            </p>
          </div>
        </div>

        {/* Black Section */}
        <div className="relative w-full md:w-1/2 h-full bg-brand-black flex items-center justify-center p-6 md:p-16">
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 z-20 text-white/70 hover:text-white transition-colors duration-200"
            aria-label="Close popup"
          >
            <X size={28} />
          </button>

          {!isSubmitted ? (
            <div className="w-full max-w-md animate-slide-right opacity-0 [animation-delay:500ms]">
              <h3 className="text-white text-xl md:text-4xl font-semibold mb-4 md:mb-8">
                Subscribe now
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-8">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-5 py-4 text-base md:text-xl md:px-6 md:py-5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-3 bg-brand-yellow hover:bg-brand-lightYellow text-brand-black font-medium rounded-full px-6 py-4 md:px-8 md:py-5 transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  <span className="text-lg md:text-2xl">Subscribe</span>
                  <ArrowRight size={24} />
                </button>
                <p className="text-white/60 text-sm md:text-base text-center pt-2 md:pt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          ) : (
            <div className="text-center animate-scale-in">
              <CheckCircle size={80} className="mx-auto mb-6 text-brand-yellow" />
              <h3 className="text-white text-2xl md:text-4xl font-semibold mb-3 md:mb-4">Thank You!</h3>
              <p className="text-white/70 text-lg md:text-xl">You've successfully subscribed to our newsletter.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsletterPopup;
