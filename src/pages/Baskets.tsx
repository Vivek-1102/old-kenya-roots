import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { TopBar } from '@/components/TopBar';
import { Navbar } from '@/components/Navbar';
import { BasketCard } from '@/components/BasketCard';
import { BasketModal } from '@/components/BasketModal';
import { Basket, mockBaskets } from '@/lib/mockData';
import kenyaBlueImg from '@/assets/baskets/kenya-blue.jpg';
import cryptoImg from '@/assets/baskets/crypto.jpg';
import techImg from '@/assets/baskets/tech.jpg';
import balancedImg from '@/assets/baskets/balanced.jpg';

export default function Baskets() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [basketModal, setBasketModal] = useState<{ isOpen: boolean; basket: Basket | null }>({
    isOpen: false,
    basket: null
  });

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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {basketsWithImages.map((basket) => (
            <BasketCard
              key={basket.id}
              basket={basket}
              onInvest={handleInvest}
            />
          ))}
        </div>
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
