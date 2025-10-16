import { ArrowDownCircle, ArrowUpCircle, ShoppingCart, DollarSign } from 'lucide-react';
import { Transaction } from '@/lib/mockData';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const getIcon = () => {
    switch (transaction.type) {
      case 'buy':
        return <ShoppingCart className="h-5 w-5 text-primary" />;
      case 'sell':
        return <DollarSign className="h-5 w-5 text-accent" />;
      case 'deposit':
        return <ArrowDownCircle className="h-5 w-5 text-success" />;
      case 'withdraw':
        return <ArrowUpCircle className="h-5 w-5 text-destructive" />;
    }
  };

  const getTitle = () => {
    switch (transaction.type) {
      case 'buy':
        return `Buy ${transaction.asset}`;
      case 'sell':
        return `Sell ${transaction.asset}`;
      case 'deposit':
        return 'Deposit';
      case 'withdraw':
        return 'Withdraw';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-md transition-shadow">
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{getTitle()}</p>
        <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">
          {transaction.type === 'buy' || transaction.type === 'withdraw' ? '-' : '+'}
          KSh {transaction.amount.toLocaleString()}
        </p>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          transaction.status === 'completed' 
            ? 'bg-success/10 text-success' 
            : 'bg-muted text-muted-foreground'
        }`}>
          {transaction.status}
        </span>
      </div>
    </div>
  );
};
