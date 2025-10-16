import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { TopBar } from '@/components/TopBar';
import { Navbar } from '@/components/Navbar';
import { AssetCard } from '@/components/AssetCard';
import { TradeModal } from '@/components/TradeModal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Asset, mockAssets } from '@/lib/mockData';
import { Search, Plus } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'NSE' | 'Crypto' | 'US Stock'>('All');
  const [tradeModal, setTradeModal] = useState<{ isOpen: boolean; asset: Asset | null; type: 'buy' | 'sell' }>({
    isOpen: false,
    asset: null,
    type: 'buy'
  });

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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onBuy={handleBuy}
              onSell={handleSell}
            />
          ))}
        </div>

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
