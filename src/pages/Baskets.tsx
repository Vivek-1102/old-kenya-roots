import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { TopBar } from '@/components/TopBar';
import { Navbar } from '@/components/Navbar';
import { BasketCard } from '@/components/BasketCard';
import { BasketModal } from '@/components/BasketModal';
import { Basket, mockBaskets } from '@/lib/mockData';
import { Skeleton } from '@/components/ui/skeleton';
import kenyaBlueImg from '@/assets/baskets/kenya-blue.jpg';
import cryptoImg from '@/assets/baskets/crypto.jpg';
import techImg from '@/assets/baskets/tech.jpg';
import balancedImg from '@/assets/baskets/balanced.jpg';

export default function Baskets() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [basketModal, setBasketModal] = useState<{ isOpen: boolean; basket: Basket | null }>({
    isOpen: false,
    basket: null
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    navigate('/');
    return null;
  }

  // Map imported images to baskets
  const imageMap: Record<string, string> = {
    '/baskets/kenya-blue.jpg': kenyaBlueImg,
    '/baskets/crypto.jpg': cryptoImg,
    '/baskets/tech.jpg': techImg,
    '/baskets/balanced.jpg': balancedImg
  };

  const basketsWithImages = mockBaskets.map(basket => ({
    ...basket,
    image: imageMap[basket.image] || basket.image
  }));

  const handleInvest = (basket: Basket) => {
    setBasketModal({ isOpen: true, basket });
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopBar />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Investment Baskets</h1>
          <p className="text-muted-foreground">
            Curated portfolios designed for different investment goals
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border rounded-2xl overflow-hidden">
                <Skeleton className="h-48 w-full shimmer" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4 shimmer" />
                  <Skeleton className="h-4 w-full shimmer" />
                  <Skeleton className="h-4 w-2/3 shimmer" />
                  <Skeleton className="h-10 w-full shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {basketsWithImages.map((basket, index) => (
              <motion.div
                key={basket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <BasketCard
                  basket={basket}
                  onInvest={handleInvest}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <Navbar />
      
      <BasketModal
        isOpen={basketModal.isOpen}
        onClose={() => setBasketModal({ isOpen: false, basket: null })}
        basket={basketModal.basket}
      />
    </div>
  );
}
