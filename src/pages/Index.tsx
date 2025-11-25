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
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      setFeaturedPosts(data || []);
      
      setTimeout(() => {
        setLoading(false);
      }, 1500);
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
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Myne Winner
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Award-Winning Artist & Creator
              </p>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Creating stunning visual experiences that captivate audiences worldwide
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button size="lg" asChild>
                  <a href="/gallery">
                    View Gallery <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/about">Learn More</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Work */}
        {featuredPosts.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Featured Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="group relative overflow-hidden rounded-lg aspect-square bg-muted cursor-pointer transition-transform hover:scale-105"
                  >
                    {post.type === 'photo' && post.media_url && (
                      <img
                        src={post.media_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold">{post.title}</h3>
                        {post.description && (
                          <p className="text-white/80 text-sm">{post.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
