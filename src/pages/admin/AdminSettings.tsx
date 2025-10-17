import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const { user, updateProfile, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSave = () => {
    updateProfile(formData);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your admin account</p>
      </motion.div>

      <Card className="p-6 max-w-2xl">
        <h2 className="text-xl font-semibold mb-6">Admin Profile</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+254 7XX XXX XXX"
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="p-6 max-w-2xl border-destructive">
        <h2 className="text-xl font-semibold mb-4 text-destructive">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Logout from your admin account
        </p>
        <Button variant="destructive" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </Card>
    </div>
  );
}
