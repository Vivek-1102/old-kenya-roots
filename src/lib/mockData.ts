export interface Asset {
  id: string;
  symbol: string;
  name: string;
  category: 'NSE' | 'Crypto' | 'US Stock';
  price: number;
  change: number;
  changePercent: number;
}

export interface Basket {
  id: string;
  name: string;
  description: string;
  image: string;
  performance: number;
  assets: string[];
  minInvestment: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdraw';
  asset?: string;
  amount: number;
  price?: number;
  date: string;
  status: 'completed' | 'pending';
}

export interface Holding {
  assetId: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
}

export interface PendingAction {
  id: string;
  userId: string;
  userName: string;
  type: 'buy' | 'withdraw';
  asset?: string;
  amount: number;
  date: string;
}

export const mockAssets: Asset[] = [
  // NSE Stocks
  {
    id: 'saf',
    symbol: 'SCOM',
    name: 'Safaricom PLC',
    category: 'NSE',
    price: 24.50,
    change: 0.50,
    changePercent: 2.08
  },
  {
    id: 'eqty',
    symbol: 'EQTY',
    name: 'Equity Group',
    category: 'NSE',
    price: 52.25,
    change: -0.75,
    changePercent: -1.42
  },
  {
    id: 'kcb',
    symbol: 'KCB',
    name: 'KCB Group',
    category: 'NSE',
    price: 38.00,
    change: 1.25,
    changePercent: 3.40
  },
  {
    id: 'eabl',
    symbol: 'EABL',
    name: 'East African Breweries',
    category: 'NSE',
    price: 145.00,
    change: 2.50,
    changePercent: 1.75
  },
  // Crypto
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    category: 'Crypto',
    price: 43250.00,
    change: 1250.00,
    changePercent: 2.97
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    category: 'Crypto',
    price: 2280.00,
    change: -45.00,
    changePercent: -1.94
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    category: 'Crypto',
    price: 98.50,
    change: 5.25,
    changePercent: 5.63
  },
  // US Stocks
  {
    id: 'aapl',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    category: 'US Stock',
    price: 178.25,
    change: 2.15,
    changePercent: 1.22
  },
  {
    id: 'tsla',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    category: 'US Stock',
    price: 242.50,
    change: -5.75,
    changePercent: -2.32
  },
  {
    id: 'msft',
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    category: 'US Stock',
    price: 420.80,
    change: 8.30,
    changePercent: 2.01
  }
];

export const mockBaskets: Basket[] = [
  {
    id: 'ken-blue',
    name: 'Kenyan Blue Chips',
    description: 'Top-performing NSE companies with stable dividends',
    image: '/baskets/kenya-blue.jpg',
    performance: 12.5,
    assets: ['saf', 'eqty', 'kcb', 'eabl'],
    minInvestment: 5000
  },
  {
    id: 'crypto-starter',
    name: 'Crypto Starter Pack',
    description: 'Diversified crypto portfolio for beginners',
    image: '/baskets/crypto.jpg',
    performance: 24.8,
    assets: ['btc', 'eth', 'sol'],
    minInvestment: 10000
  },
  {
    id: 'us-tech',
    name: 'US Tech Giants',
    description: 'Leading technology companies driving innovation',
    image: '/baskets/tech.jpg',
    performance: 18.3,
    assets: ['aapl', 'msft', 'tsla'],
    minInvestment: 15000
  },
  {
    id: 'balanced',
    name: 'Balanced Growth',
    description: 'Mix of NSE, Crypto, and US stocks for stability',
    image: '/baskets/balanced.jpg',
    performance: 15.7,
    assets: ['saf', 'kcb', 'btc', 'aapl'],
    minInvestment: 8000
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'txn1',
    type: 'deposit',
    amount: 50000,
    date: '2025-10-15T10:30:00',
    status: 'completed'
  },
  {
    id: 'txn2',
    type: 'buy',
    asset: 'SCOM',
    amount: 10000,
    price: 24.50,
    date: '2025-10-14T14:20:00',
    status: 'completed'
  },
  {
    id: 'txn3',
    type: 'buy',
    asset: 'BTC',
    amount: 20000,
    price: 43250.00,
    date: '2025-10-13T09:15:00',
    status: 'completed'
  },
  {
    id: 'txn4',
    type: 'sell',
    asset: 'EQTY',
    amount: 5000,
    price: 52.25,
    date: '2025-10-12T16:45:00',
    status: 'completed'
  },
  {
    id: 'txn5',
    type: 'buy',
    asset: 'AAPL',
    amount: 15000,
    price: 178.25,
    date: '2025-10-10T11:00:00',
    status: 'pending'
  }
];

export const mockHoldings: Holding[] = [
  {
    assetId: 'saf',
    symbol: 'SCOM',
    name: 'Safaricom PLC',
    quantity: 408,
    avgPrice: 24.50,
    currentPrice: 24.50
  },
  {
    assetId: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    quantity: 0.462,
    avgPrice: 43250.00,
    currentPrice: 43250.00
  },
  {
    assetId: 'aapl',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 84,
    avgPrice: 178.25,
    currentPrice: 178.25
  },
  {
    assetId: 'kcb',
    symbol: 'KCB',
    name: 'KCB Group',
    quantity: 263,
    avgPrice: 38.00,
    currentPrice: 38.00
  }
];

export const mockPendingActions: PendingAction[] = [
  {
    id: 'pa1',
    userId: 'user1',
    userName: 'John Mwangi',
    type: 'buy',
    asset: 'AAPL',
    amount: 15000,
    date: '2025-10-16T08:30:00'
  },
  {
    id: 'pa2',
    userId: 'user2',
    userName: 'Grace Wanjiru',
    type: 'withdraw',
    amount: 25000,
    date: '2025-10-16T09:15:00'
  },
  {
    id: 'pa3',
    userId: 'user3',
    userName: 'David Ochieng',
    type: 'buy',
    asset: 'BTC',
    amount: 50000,
    date: '2025-10-16T10:00:00'
  },
  {
    id: 'pa4',
    userId: 'user4',
    userName: 'Sarah Kamau',
    type: 'buy',
    asset: 'SCOM',
    amount: 8000,
    date: '2025-10-17T11:20:00'
  },
  {
    id: 'pa5',
    userId: 'user5',
    userName: 'Peter Njoroge',
    type: 'withdraw',
    amount: 15000,
    date: '2025-10-17T14:30:00'
  }
];
