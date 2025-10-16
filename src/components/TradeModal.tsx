import { useState } from 'react';
import { Asset } from '@/lib/mockData';
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

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  type: 'buy' | 'sell';
}

export const TradeModal = ({ isOpen, onClose, asset, type }: TradeModalProps) => {
  const [amount, setAmount] = useState('');

  if (!asset) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    toast.success(`${type === 'buy' ? 'Purchase' : 'Sale'} order submitted for approval`);
    setAmount('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{type === 'buy' ? 'Buy' : 'Sell'} {asset.symbol}</DialogTitle>
          <DialogDescription>{asset.name}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Current Price</Label>
            <p className="text-2xl font-bold">
              {asset.category === 'Crypto' ? '$' : 'KSh'} {asset.price.toLocaleString()}
            </p>
          </div>
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
          {amount && (
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground">You will {type}</p>
              <p className="text-lg font-semibold">
                {(parseFloat(amount) / asset.price).toFixed(6)} {asset.symbol}
              </p>
            </div>
          )}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Confirm {type === 'buy' ? 'Purchase' : 'Sale'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
