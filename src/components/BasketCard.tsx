import { TrendingUp } from 'lucide-react';
import { Basket } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BasketCardProps {
  basket: Basket;
  onInvest: (basket: Basket) => void;
}

export const BasketCard = ({ basket, onInvest }: BasketCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={basket.image} 
          alt={basket.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-success text-success-foreground px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          +{basket.performance}%
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{basket.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {basket.description}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground">Min. Investment</span>
          <span className="font-semibold">KSh {basket.minInvestment.toLocaleString()}</span>
        </div>
        <Button 
          onClick={() => onInvest(basket)}
          className="w-full"
        >
          Invest Now
        </Button>
      </div>
    </Card>
  );
};
