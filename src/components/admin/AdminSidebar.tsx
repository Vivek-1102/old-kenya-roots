import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Wallet, Package, FolderKanban, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: ShoppingCart, label: 'Pending Buys', path: '/admin/buys' },
  { icon: Wallet, label: 'Pending Withdrawals', path: '/admin/withdrawals' },
  { icon: Package, label: 'Asset Manager', path: '/admin/assets' },
  { icon: FolderKanban, label: 'Basket Builder', path: '/admin/baskets' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export function AdminSidebar() {
  const { logout } = useAuth();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 min-h-screen bg-card border-r border-border flex flex-col"
    >
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
        <p className="text-sm text-muted-foreground mt-1">Old Mt. Kenya</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground border-l-4 border-accent'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}
