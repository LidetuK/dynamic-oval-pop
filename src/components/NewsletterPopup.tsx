
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
    'w-[95%] max-w-4xl aspect-[1.8/1] rounded-full overflow-hidden', // Increased from max-w-3xl to max-w-4xl and width from 90% to 95%
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
          
          <div className="relative z-10 p-5 md:p-8 flex flex-col items-center justify-center text-brand-black h-full">
            <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3 tracking-tight animate-slide-up opacity-0 [animation-delay:200ms]">
              Join Our Newsletter
            </h2>
            <p className="text-sm md:text-lg max-w-xs md:max-w-sm text-center animate-slide-up opacity-0 [animation-delay:400ms]">
              Get exclusive updates and content delivered straight to your inbox
            </p>
          </div>
        </div>

        {/* Black Section */}
        <div className="relative w-full md:w-1/2 h-full bg-brand-black flex items-center justify-center p-5 md:p-10">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 md:top-5 md:right-5 z-20 text-white/70 hover:text-white transition-colors duration-200"
            aria-label="Close popup"
          >
            <X size={20} />
          </button>

          {!isSubmitted ? (
            <div className="w-full max-w-sm animate-slide-right opacity-0 [animation-delay:500ms]">
              <h3 className="text-white text-lg md:text-2xl font-semibold mb-3 md:mb-5">
                Subscribe now
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 text-sm md:text-base md:px-5 md:py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-brand-yellow hover:bg-brand-lightYellow text-brand-black font-medium rounded-full px-5 py-3 md:px-6 md:py-3 transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  <span className="text-base md:text-lg">Subscribe</span>
                  <ArrowRight size={18} />
                </button>
                <p className="text-white/60 text-xs md:text-sm text-center pt-2 md:pt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          ) : (
            <div className="text-center animate-scale-in">
              <CheckCircle size={56} className="mx-auto mb-4 text-brand-yellow" />
              <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 md:mb-3">Thank You!</h3>
              <p className="text-white/70 text-sm md:text-base">You've successfully subscribed to our newsletter.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsletterPopup;
