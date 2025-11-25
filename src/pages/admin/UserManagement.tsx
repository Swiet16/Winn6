import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const { toast } = useToast();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data: profiles } = await supabase
      .from('profiles')
      .select(`
        *,
        user_roles (role)
      `)
      .order('created_at', { ascending: false });

    setUsers(profiles || []);
  };

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin' | 'super_admin') => {
    if (userId === currentUser?.id) {
      toast({
        title: 'Error',
        description: 'You cannot change your own role',
        variant: 'destructive',
      });
      return;
    }

    const { error: deleteError } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId);

    if (deleteError) {
      toast({
        title: 'Error',
        description: deleteError.message,
        variant: 'destructive',
      });
      return;
    }

    const { error: insertError } = await supabase
      .from('user_roles')
      .insert({ user_id: userId, role: newRole });

    if (insertError) {
      toast({
        title: 'Error',
        description: insertError.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'User role updated successfully',
      });
      loadUsers();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage user roles and permissions</p>
      </div>

      <div className="space-y-4">
        {users.map((user) => {
          const userRole = (user.user_roles as any)?.[0]?.role || 'user';
          
          return (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle className="text-lg">{user.full_name || 'No name'}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-4">
                  <Select
                    value={userRole}
                    onValueChange={(value: 'user' | 'admin' | 'super_admin') =>
                      handleRoleChange(user.id, value)
                    }
                    disabled={user.id === currentUser?.id}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No users found</p>
        </div>
      )}
    </div>
  );
}
