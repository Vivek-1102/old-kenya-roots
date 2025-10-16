import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import logoImg from '@/assets/logo.png';

export const TopBar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/wallet', label: 'Wallet' },
    { path: '/baskets', label: 'Baskets' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/profile', label: 'Profile' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/home" className="flex items-center gap-3">
          <img src={logoImg} alt="Old Mt. Kenya" className="h-10 w-10" />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">Old Mt. Kenya</h1>
            <p className="text-xs text-muted-foreground">Investing from the roots upward</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
};
