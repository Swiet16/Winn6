import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Image, Video, MessageSquare, Users, Settings } from 'lucide-react';
import Overview from './Overview';
import Posts from './Posts';
import Media from './Media';
import Comments from './Comments';
import UserManagement from './UserManagement';
import SiteSettings from './SiteSettings';

export default function AdminDashboard() {
  const { userRole } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Posts', href: '/admin/posts', icon: Image },
    { name: 'Media', href: '/admin/media', icon: Video },
    { name: 'Comments', href: '/admin/comments', icon: MessageSquare },
    ...(userRole === 'super_admin' ? [
      { name: 'Users', href: '/admin/users', icon: Users },
      { name: 'Settings', href: '/admin/settings', icon: Settings },
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 min-h-screen border-r bg-muted/30 p-4">
          <div className="mb-8">
            <h2 className="text-xl font-bold px-3">Admin Dashboard</h2>
            <p className="text-sm text-muted-foreground px-3">
              {userRole === 'super_admin' ? 'Super Admin' : 'Admin'}
            </p>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  asChild
                >
                  <Link to={item.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </nav>

          <div className="mt-8">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/">Back to Website</Link>
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="posts" element={<Posts />} />
            <Route path="media" element={<Media />} />
            <Route path="comments" element={<Comments />} />
            {userRole === 'super_admin' && (
              <>
                <Route path="users" element={<UserManagement />} />
                <Route path="settings" element={<SiteSettings />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </div>
  );
}
