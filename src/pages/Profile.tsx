import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { TopBar } from '@/components/TopBar';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { LogOut, Shield } from 'lucide-react';

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [idNumber, setIdNumber] = useState(user?.idNumber || '');

  if (!user) {
    navigate('/');
    return null;
  }

  const handleSave = () => {
    updateProfile({ name, phone, idNumber });
    toast.success('Profile updated successfully');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopBar />
      
      <main className="container mx-auto px-4 py-6 space-y-6 max-w-2xl">
        <h1 className="text-2xl font-bold">Profile Settings</h1>

        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              disabled
              className="opacity-50"
            />
            <p className="text-xs text-muted-foreground">Email cannot be changed</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+254 700 000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="id">ID Number</Label>
            <Input
              id="id"
              placeholder="12345678"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </Card>

        {user.isAdmin && (
          <Card className="p-4 bg-accent/10 border-accent">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">Admin Access</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              You have administrator privileges
            </p>
            <Button
              onClick={() => navigate('/admin')}
              variant="outline"
              className="w-full"
            >
              Go to Admin Panel
            </Button>
          </Card>
        )}

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </main>

      <Navbar />
    </div>
  );
}
