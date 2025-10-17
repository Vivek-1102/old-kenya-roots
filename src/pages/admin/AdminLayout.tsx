import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (!user.isAdmin) {
      navigate('/home');
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
