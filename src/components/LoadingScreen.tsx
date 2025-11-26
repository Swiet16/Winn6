import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 animate-pulse">
            <svg className="w-full h-full" viewBox="0 0 800 800" fill="none">
              <g className="animate-spin" style={{ transformOrigin: 'center', animationDuration: '20s' }}>
                <path d="M400 50 L420 350 M400 50 L380 350" stroke="hsl(var(--primary))" strokeWidth="3" opacity="0.3" strokeLinecap="round">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M400 50 L450 340 M400 50 L350 340" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.2" strokeLinecap="round">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" />
                </path>
              </g>
              <circle cx="400" cy="400" r="200" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.2">
                <animate attributeName="r" values="200;220;200" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="400" cy="400" r="150" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" opacity="0.3">
                <animate attributeName="r" values="150;170;150" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="relative text-center space-y-8 z-10">
        <div className="space-y-6">
          <div className="relative inline-block">
            <h1 className="text-7xl md:text-8xl font-black tracking-tight">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-primary blur-2xl opacity-50 animate-pulse"></span>
                <span className="relative bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  MYNE
                </span>
              </span>
            </h1>
            <h1 className="text-7xl md:text-8xl font-black tracking-tight mt-2">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/40 blur-2xl opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}></span>
                <span className="relative bg-gradient-to-br from-primary/80 via-primary to-primary/70 bg-clip-text text-transparent">
                  WINNER
                </span>
              </span>
            </h1>
          </div>
          
          <p className="text-muted-foreground text-lg md:text-xl font-medium animate-pulse">
            Unleashing Creative Power...
          </p>
        </div>
        
        <div className="w-80 max-w-[90vw] mx-auto space-y-3">
          <div className="h-2 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
