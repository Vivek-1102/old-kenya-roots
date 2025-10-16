import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { TopBar } from '@/components/TopBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockPendingActions } from '@/lib/mockData';
import { Check, X, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pendingActions, setPendingActions] = useState(mockPendingActions);

  if (!user) {
    navigate('/');
    return null;
  }

  if (!user.isAdmin) {
    navigate('/home');
    return null;
  }

  const handleApprove = (id: string) => {
    setPendingActions(prev => prev.filter(action => action.id !== id));
    toast.success('Action approved successfully');
  };

  const handleReject = (id: string) => {
    setPendingActions(prev => prev.filter(action => action.id !== id));
    toast.success('Action rejected');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage pending transactions and requests</p>
          </div>
        </div>

        {/* Pending Buys */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Pending Buy Orders</h2>
          {pendingActions.filter(a => a.type === 'buy').length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No pending buy orders</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {pendingActions.filter(a => a.type === 'buy').map((action) => (
                <Card key={action.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{action.userName}</p>
                      <p className="text-sm text-muted-foreground">Buy {action.asset}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(action.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">KSh {action.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(action.id)}
                      className="flex-1"
                      size="sm"
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(action.id)}
                      variant="destructive"
                      className="flex-1"
                      size="sm"
                    >
                      <X className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Pending Withdrawals */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Pending Withdrawals</h2>
          {pendingActions.filter(a => a.type === 'withdraw').length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No pending withdrawals</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {pendingActions.filter(a => a.type === 'withdraw').map((action) => (
                <Card key={action.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{action.userName}</p>
                      <p className="text-sm text-muted-foreground">Withdrawal Request</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(action.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">KSh {action.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(action.id)}
                      className="flex-1"
                      size="sm"
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(action.id)}
                      variant="destructive"
                      className="flex-1"
                      size="sm"
                    >
                      <X className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
