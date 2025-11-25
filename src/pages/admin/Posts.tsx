import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'photo' | 'video'>('photo');
  const [mediaUrl, setMediaUrl] = useState('');
  const [published, setPublished] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    setPosts(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('posts').insert({
      title,
      description,
      type,
      media_url: mediaUrl,
      published,
      author_id: user?.id,
    });

    if (error) {
      toast({
        title: 'Error creating post',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Post created successfully',
      });
      setOpen(false);
      resetForm();
      loadPosts();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Deleted',
        description: 'Post deleted successfully',
      });
      loadPosts();
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setMediaUrl('');
    setPublished(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-muted-foreground">Manage your photos and videos</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={(value: 'photo' | 'video') => setType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photo">Photo</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mediaUrl">Media URL</Label>
                <Input
                  id="mediaUrl"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={published}
                  onCheckedChange={setPublished}
                />
                <Label htmlFor="published">Published</Label>
              </div>

              <Button type="submit" className="w-full">Create Post</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="text-lg">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {post.type === 'photo' && post.media_url && (
                <img
                  src={post.media_url}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground line-clamp-2">{post.description}</p>
                <p className="text-xs">Type: {post.type}</p>
                <p className="text-xs">Status: {post.published ? 'Published' : 'Draft'}</p>
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(post.id)}
                className="w-full"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts yet. Create your first post!</p>
        </div>
      )}
    </div>
  );
}
