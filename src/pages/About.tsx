import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LoadingScreen } from '@/components/LoadingScreen';
import { supabase } from '@/integrations/supabase/client';

export default function About() {
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'bio')
        .single();

      if (data?.value) {
        setBio(data.value as string);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">About Myne Winner</h1>
          
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <div className="bg-muted/30 rounded-lg p-8 mb-8">
              <p className="text-lg leading-relaxed">
                {bio || "Myne Winner is a visionary artist known for creating stunning visual experiences that captivate audiences worldwide."}
              </p>
            </div>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Artistic Journey</h2>
                <p className="text-muted-foreground">
                  With years of experience in visual arts, Myne Winner has developed a unique style that blends traditional techniques with modern innovation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Recognition</h2>
                <p className="text-muted-foreground">
                  An award-winning artist whose work has been featured in galleries and exhibitions around the world.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Philosophy</h2>
                <p className="text-muted-foreground">
                  Creating art that connects with people on an emotional level and inspires them to see the world differently.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
