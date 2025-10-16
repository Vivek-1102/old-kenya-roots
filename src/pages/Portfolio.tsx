import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { TopBar } from '@/components/TopBar';
import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { mockHoldings } from '@/lib/mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function Portfolio() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    navigate('/');
    return null;
  }

  // Calculate portfolio totals
  const totalInvested = mockHoldings.reduce((sum, holding) => 
    sum + (holding.quantity * holding.avgPrice), 0
  );
  
  const currentValue = mockHoldings.reduce((sum, holding) => 
    sum + (holding.quantity * holding.currentPrice), 0
  );
  
  const netGain = currentValue - totalInvested;
  const netGainPercent = (netGain / totalInvested) * 100;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopBar />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold">Portfolio</h1>

        {/* Portfolio Summary */}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 space-y-2">
                <Skeleton className="h-4 w-24 shimmer" />
                <Skeleton className="h-8 w-32 shimmer" />
              </Card>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid gap-4 sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
              <p className="text-2xl font-bold">KSh {totalInvested.toLocaleString()}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Current Value</p>
              <p className="text-2xl font-bold">KSh {currentValue.toLocaleString()}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Net Gain</p>
              <div className="flex items-center gap-2">
                <p className={`text-2xl font-bold ${netGain >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {netGain >= 0 ? '+' : ''}KSh {netGain.toLocaleString()}
                </p>
                {netGain >= 0 ? <TrendingUp className="h-5 w-5 text-success" /> : <TrendingDown className="h-5 w-5 text-destructive" />}
              </div>
              <p className={`text-sm ${netGain >= 0 ? 'text-success' : 'text-destructive'}`}>
                {netGain >= 0 ? '+' : ''}{netGainPercent.toFixed(2)}%
              </p>
            </Card>
          </motion.div>
        )}

        {/* Holdings */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Holdings</h2>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-24 shimmer" />
                      <Skeleton className="h-4 w-32 shimmer" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-24 shimmer" />
                      <Skeleton className="h-4 w-16 shimmer" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20 shimmer" />
                    <Skeleton className="h-4 w-28 shimmer" />
                  </div>
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
              {mockHoldings.map((holding, index) => {
                const holdingValue = holding.quantity * holding.currentPrice;
                const holdingGain = holdingValue - (holding.quantity * holding.avgPrice);
                const holdingGainPercent = (holdingGain / (holding.quantity * holding.avgPrice)) * 100;

                return (
                  <motion.div
                    key={holding.assetId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{holding.symbol}</h3>
                          <p className="text-sm text-muted-foreground">{holding.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">KSh {holdingValue.toLocaleString()}</p>
                          <div className={`flex items-center gap-1 text-sm ${holdingGain >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {holdingGain >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            <span>{holdingGain >= 0 ? '+' : ''}{holdingGainPercent.toFixed(2)}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Quantity: {holding.quantity}</span>
                        <span>Avg. Price: KSh {holding.avgPrice.toLocaleString()}</span>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </main>

      <Navbar />
    </div>
  );
}
