import { TrendingUp, TrendingDown } from 'lucide-react';
import { Asset } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AssetCardProps {
  asset: Asset;
  onBuy: (asset: Asset) => void;
  onSell: (asset: Asset) => void;
}

export const AssetCard = ({ asset, onBuy, onSell }: AssetCardProps) => {
  const isPositive = asset.changePercent >= 0;

  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{asset.symbol}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {asset.category}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{asset.name}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">
            {asset.category === 'Crypto' ? '$' : 'KSh'} {asset.price.toLocaleString()}
          </p>
          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>{isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          onClick={() => onBuy(asset)} 
          className="flex-1"
          size="sm"
        >
          Buy
        </Button>
        <Button 
          onClick={() => onSell(asset)} 
          variant="outline"
          className="flex-1"
          size="sm"
        >
          Sell
        </Button>
      </div>
    </Card>
  );
};
