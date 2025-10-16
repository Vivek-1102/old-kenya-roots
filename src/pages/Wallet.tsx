import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { TopBar } from '@/components/TopBar';
import { Navbar } from '@/components/Navbar';
import { TransactionItem } from '@/components/TransactionItem';
import { WalletModal } from '@/components/WalletModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockTransactions } from '@/lib/mockData';
import { ArrowDownCircle, ArrowUpCircle, Eye, EyeOff } from 'lucide-react';

export default function Wallet() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [walletModal, setWalletModal] = useState<{ isOpen: boolean; type: 'deposit' | 'withdraw' }>({
    isOpen: false,
    type: 'deposit'
  });

  if (!user) {
    navigate('/');
    return null;
  }

  const balance = 125420.50;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopBar />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold">Wallet</h1>

        {/* Balance Card */}
        <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Available Balance</p>
              <p className="text-3xl font-bold">
                {showBalance ? `KSh ${balance.toLocaleString()}` : '••••••'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalance(!showBalance)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => setWalletModal({ isOpen: true, type: 'deposit' })}
              variant="secondary"
              className="flex-1"
            >
              <ArrowDownCircle className="mr-2 h-4 w-4" />
              Deposit
            </Button>
            <Button
              onClick={() => setWalletModal({ isOpen: true, type: 'withdraw' })}
              variant="secondary"
              className="flex-1"
            >
              <ArrowUpCircle className="mr-2 h-4 w-4" />
              Withdraw
            </Button>
          </div>
        </Card>

        {/* Transactions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      </main>

      <Navbar />
      
      <WalletModal
        isOpen={walletModal.isOpen}
        onClose={() => setWalletModal({ isOpen: false, type: 'deposit' })}
        type={walletModal.type}
      />
    </div>
  );
}
