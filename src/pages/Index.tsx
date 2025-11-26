import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) {
          console.error('Error loading posts:', error);
        }

        setFeaturedPosts(data || []);
      } catch (err) {
        console.error('Failed to load posts:', err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Video Background */}
        <section className="relative h-screen min-h-[600px] overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4"
                type="video/mp4"
              />
            </video>
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/70 to-background/95" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
              {/* Main Title with Lightning Effect */}
              <div className="relative">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
                  <span className="relative inline-block">
                    <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent opacity-50 animate-pulse" />
                    <span className="relative bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                      Myne Winner
                    </span>
                  </span>
                </h1>
                {/* Lightning Accent Lines */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 md:w-64 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              </div>

              {/* Subtitle */}
              <div className="space-y-3">
                <p className="text-2xl md:text-4xl font-semibold text-foreground/90">
                  Award-Winning Artist & Creator
                </p>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Creating stunning visual experiences that captivate audiences worldwide
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button size="lg" className="text-lg px-8 py-6 group" asChild>
                  <a href="/gallery">
                    View Gallery 
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 backdrop-blur-sm" asChild>
                  <a href="/about">Learn More</a>
                </Button>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
                <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
                  <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Work - Modern Grid Layout */}
        {featuredPosts.length > 0 && (
          <section className="py-20 md:py-32 relative">
            <div className="container mx-auto px-4">
              {/* Section Header */}
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Featured Work
                  </span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
              </div>

              {/* Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {featuredPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="group relative overflow-hidden rounded-2xl aspect-square bg-muted cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image/Thumbnail */}
                    {post.type === 'photo' && post.media_url && (
                      <img
                        src={post.media_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                    {post.type === 'video' && post.thumbnail_url && (
                      <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    
                    {/* Border Accent */}
                    <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-300 rounded-2xl" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold text-lg md:text-xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {post.title}
                      </h3>
                      {post.description && (
                        <p className="text-white/90 text-sm md:text-base line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                          {post.description}
                        </p>
                      )}
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {post.type}
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-12">
                <Button size="lg" variant="outline" asChild>
                  <a href="/gallery" className="group">
                    View All Work
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
