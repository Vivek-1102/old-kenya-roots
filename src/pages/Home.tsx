import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { TopBar } from '@/components/TopBar';
import { Navbar } from '@/components/Navbar';
import { AssetCard } from '@/components/AssetCard';
import { TradeModal } from '@/components/TradeModal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Asset, mockAssets } from '@/lib/mockData';
import { Search, Plus } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'NSE' | 'Crypto' | 'US Stock'>('All');
  const [tradeModal, setTradeModal] = useState<{ isOpen: boolean; asset: Asset | null; type: 'buy' | 'sell' }>({
    isOpen: false,
    asset: null,
    type: 'buy'
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    navigate('/');
    return null;
  }

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: Array<'All' | 'NSE' | 'Crypto' | 'US Stock'> = ['All', 'NSE', 'Crypto', 'US Stock'];

  const handleBuy = (asset: Asset) => {
    setTradeModal({ isOpen: true, asset, type: 'buy' });
  };

  const handleSell = (asset: Asset) => {
    setTradeModal({ isOpen: true, asset, type: 'sell' });
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopBar />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Greeting */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Track and manage your investments</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Asset List */}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-4 border rounded-2xl space-y-3">
                <Skeleton className="h-4 w-3/4 shimmer" />
                <Skeleton className="h-8 w-1/2 shimmer" />
                <Skeleton className="h-4 w-1/3 shimmer" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-9 flex-1 shimmer" />
                  <Skeleton className="h-9 flex-1 shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AssetCard
                  asset={asset}
                  onBuy={handleBuy}
                  onSell={handleSell}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No assets found</p>
          </div>
        )}

        {/* Floating Baskets Button */}
        <Button
          onClick={() => navigate('/baskets')}
          className="fixed bottom-24 right-4 md:bottom-8 rounded-full h-14 px-6 shadow-lg"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Invest in Baskets
        </Button>
      </main>

      <Navbar />
      
      <TradeModal
        isOpen={tradeModal.isOpen}
        onClose={() => setTradeModal({ isOpen: false, asset: null, type: 'buy' })}
        asset={tradeModal.asset}
        type={tradeModal.type}
      />
    </div>
  );
}
