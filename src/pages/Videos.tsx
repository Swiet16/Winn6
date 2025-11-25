import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LoadingScreen } from '@/components/LoadingScreen';
import { supabase } from '@/integrations/supabase/client';

export default function Videos() {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('type', 'video')
        .eq('published', true)
        .order('created_at', { ascending: false });

      setVideos(data || []);
      setLoading(false);
    };

    loadVideos();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Video Showcase</h1>
          
          {videos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No videos available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((video) => (
                <div key={video.id} className="space-y-4">
                  <div className="relative overflow-hidden rounded-lg aspect-video bg-muted">
                    <video
                      src={video.media_url}
                      controls
                      poster={video.thumbnail_url}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{video.title}</h3>
                    {video.description && (
                      <p className="text-muted-foreground text-sm mt-1">{video.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
