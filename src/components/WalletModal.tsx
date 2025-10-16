import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'withdraw';
}

export const WalletModal = ({ isOpen, onClose, type }: WalletModalProps) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (type === 'deposit') {
      toast.success('Redirecting to payment gateway...', {
        description: 'IntaSend checkout will open shortly'
      });
    } else {
      toast.success('Withdrawal request submitted for approval');
    }
    
    setAmount('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{type === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds'}</DialogTitle>
          <DialogDescription>
            {type === 'deposit' 
              ? 'Add money to your Old Mt. Kenya wallet' 
              : 'Withdraw money from your wallet'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (KSh)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          {type === 'deposit' && (
            <div className="p-3 rounded-lg bg-muted text-sm">
              <p className="text-muted-foreground">
                You will be redirected to IntaSend to complete your payment securely.
              </p>
            </div>
          )}
          {type === 'withdraw' && (
            <div className="p-3 rounded-lg bg-muted text-sm">
              <p className="text-muted-foreground">
                Withdrawal requests are processed within 24 hours to your registered M-Pesa number.
              </p>
            </div>
          )}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {type === 'deposit' ? 'Continue to Payment' : 'Request Withdrawal'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
