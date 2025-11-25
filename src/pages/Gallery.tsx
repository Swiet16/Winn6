import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LoadingScreen } from '@/components/LoadingScreen';
import { supabase } from '@/integrations/supabase/client';

export default function Gallery() {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    const loadPhotos = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('type', 'photo')
        .eq('published', true)
        .order('created_at', { ascending: false });

      setPhotos(data || []);
      setLoading(false);
    };

    loadPhotos();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Photo Gallery</h1>
          
          {photos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No photos available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative overflow-hidden rounded-lg aspect-square bg-muted cursor-pointer transition-transform hover:scale-105"
                >
                  <img
                    src={photo.media_url}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold">{photo.title}</h3>
                      {photo.description && (
                        <p className="text-white/80 text-sm line-clamp-2">{photo.description}</p>
                      )}
                    </div>
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
