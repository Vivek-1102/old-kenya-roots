import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { TopBar } from '@/components/TopBar';
import { Navbar } from '@/components/Navbar';
import { TransactionItem } from '@/components/TransactionItem';
import { WalletModal } from '@/components/WalletModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { mockTransactions } from '@/lib/mockData';
import { ArrowDownCircle, ArrowUpCircle, Eye, EyeOff } from 'lucide-react';

export default function Wallet() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [walletModal, setWalletModal] = useState<{ isOpen: boolean; type: 'deposit' | 'withdraw' }>({
    isOpen: false,
    type: 'deposit'
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

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
        {isLoading ? (
          <Card className="p-6">
            <Skeleton className="h-4 w-32 mb-2 shimmer" />
            <Skeleton className="h-10 w-48 mb-6 shimmer" />
            <div className="flex gap-3">
              <Skeleton className="h-10 flex-1 shimmer" />
              <Skeleton className="h-10 flex-1 shimmer" />
            </div>
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        )}

        {/* Transactions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="p-4 flex justify-between items-center">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 shimmer" />
                    <Skeleton className="h-3 w-24 shimmer" />
                  </div>
                  <Skeleton className="h-4 w-20 shimmer" />
                </Card>
              ))}
            </div>
          ) : (
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {mockTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <TransactionItem transaction={transaction} />
                </motion.div>
              ))}
            </motion.div>
          )}
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
