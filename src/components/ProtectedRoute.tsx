import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingScreen } from './LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin, requireSuperAdmin }: ProtectedRouteProps) {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireSuperAdmin && userRole !== 'super_admin') {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !['admin', 'super_admin'].includes(userRole || '')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
