
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
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

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

  const backdropClasses = cn(
    'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
    isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
    isAnimating ? 'animate-fade-in reverse' : 'animate-fade-in'
  );

  const popupClasses = cn(
    'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
    'w-[90%] max-w-3xl aspect-[1.8/1] rounded-full overflow-hidden',
    'flex flex-col md:flex-row shadow-2xl',
    'transition-all duration-500',
    isVisible ? 'scale-100' : 'scale-90 opacity-0 pointer-events-none',
    isAnimating ? 'animate-scale-in reverse' : 'animate-scale-in'
  );

  return (
    <>
      <div className={backdropClasses} onClick={handleClose} />
      <div className={popupClasses}>
        {/* Yellow Section */}
        <div className="relative w-full md:w-1/2 h-full bg-brand-yellow flex items-center justify-center overflow-hidden">
          <div className="absolute w-[150%] h-[150%] bg-brand-yellow rounded-full -top-[50%] -left-[25%] animate-float" />
          <div className="absolute w-[130%] h-[130%] bg-brand-lightYellow rounded-full opacity-60 -bottom-[30%] -right-[15%] animate-float animation-delay-1000" />
          
          <div className="relative z-10 p-6 flex flex-col items-center justify-center text-brand-black h-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight animate-slide-up opacity-0 [animation-delay:200ms]">
              Join Our Newsletter
            </h2>
            <p className="text-sm md:text-base max-w-xs animate-slide-up opacity-0 [animation-delay:400ms]">
              Get exclusive updates and content delivered straight to your inbox
            </p>
          </div>
        </div>

        {/* Black Section */}
        <div className="relative w-full md:w-1/2 h-full bg-brand-black flex items-center justify-center p-6 md:p-8">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 text-white/70 hover:text-white transition-colors duration-200"
            aria-label="Close popup"
          >
            <X size={20} />
          </button>

          {!isSubmitted ? (
            <div className="w-full max-w-xs animate-slide-right opacity-0 [animation-delay:500ms]">
              <h3 className="text-white text-lg md:text-xl font-semibold mb-4">
                Subscribe now
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-brand-yellow hover:bg-brand-lightYellow text-brand-black font-medium rounded-full px-6 py-2 transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={16} />
                </button>
                <p className="text-white/60 text-xs text-center pt-2">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          ) : (
            <div className="text-center animate-scale-in">
              <CheckCircle size={64} className="mx-auto mb-4 text-brand-yellow" />
              <h3 className="text-white text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-white/70">You've successfully subscribed to our newsletter.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsletterPopup;
