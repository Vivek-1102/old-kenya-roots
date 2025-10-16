import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Basket } from '@/lib/mockData';
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

interface BasketModalProps {
  isOpen: boolean;
  onClose: () => void;
  basket: Basket | null;
}

export const BasketModal = ({ isOpen, onClose, basket }: BasketModalProps) => {
  const [amount, setAmount] = useState('');

  if (!basket) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const investmentAmount = parseFloat(amount);
    
    if (!amount || investmentAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (investmentAmount < basket.minInvestment) {
      toast.error(`Minimum investment is KSh ${basket.minInvestment.toLocaleString()}`);
      return;
    }

    toast.success(`Investment in ${basket.name} successful!`);
    setAmount('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader>
            <DialogTitle>Invest in {basket.name}</DialogTitle>
            <DialogDescription>{basket.description}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Performance</Label>
              <p className="text-2xl font-bold text-success">+{basket.performance}%</p>
            </div>
            <div className="space-y-2">
              <Label>Minimum Investment</Label>
              <p className="text-lg font-semibold">KSh {basket.minInvestment.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Investment Amount (KSh)</Label>
              <Input
                id="amount"
                type="number"
                placeholder={`Min. ${basket.minInvestment}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={basket.minInvestment}
                step="100"
              />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Confirm Investment
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
