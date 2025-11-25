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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-pulse">
            Myne Winner
          </h1>
          <p className="text-muted-foreground text-lg">Loading amazing content...</p>
        </div>
        
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
