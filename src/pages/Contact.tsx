import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast({
        title: 'Message sent!',
        description: 'Thank you for reaching out. I will get back to you soon.',
      });
      setName('');
      setEmail('');
      setMessage('');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Get In Touch</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="text-muted-foreground mb-6">
                  Feel free to reach out for collaborations, commissions, or just to say hello!
                </p>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5" />
                <span>contact@mynewinner.com</span>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Youtube className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
