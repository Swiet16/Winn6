import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

export default function Comments() {
  const [comments, setComments] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select(`
        *,
        profiles:user_id (full_name),
        posts:post_id (title)
      `)
      .order('created_at', { ascending: false });
    
    setComments(data || []);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('comments').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Deleted',
        description: 'Comment deleted successfully',
      });
      loadComments();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Comments</h1>
        <p className="text-muted-foreground">Manage user comments</p>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader>
              <CardTitle className="text-base">
                {(comment.profiles as any)?.full_name || 'Unknown User'} on {(comment.posts as any)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{comment.content}</p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(comment.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No comments yet</p>
        </div>
      )}
    </div>
  );
}
