import { callFunction } from './firebase';

// Wallet operations
export const initiateDeposit = async (amount: number) => {
  const fn = callFunction('initiateDeposit');
  const res = await fn({ amount });
  return res.data;
};

export const requestWithdrawal = async (amount: number, phone: string) => {
  const fn = callFunction('requestWithdrawal');
  const res = await fn({ amount, phone });
  return res.data;
};

// Admin operations
export const approveWithdrawal = async (txId: string) => {
  const fn = callFunction('approveWithdrawal');
  const res = await fn({ txId });
  return res.data;
};

export const rejectWithdrawal = async (txId: string) => {
  const fn = callFunction('rejectWithdrawal');
  const res = await fn({ txId });
  return res.data;
};

export const approveBuy = async (txId: string) => {
  const fn = callFunction('approveBuy');
  const res = await fn({ txId });
  return res.data;
};

export const rejectBuy = async (txId: string) => {
  const fn = callFunction('rejectBuy');
  const res = await fn({ txId });
  return res.data;
};

export const updateAssetPrice = async (assetId: string, newPrice: number) => {
  const fn = callFunction('updateAssetPrice');
  const res = await fn({ assetId, newPrice });
  return res.data;
};

export const createAsset = async (assetData: {
  symbol: string;
  name: string;
  type: string;
  price: number;
  description?: string;
}) => {
  const fn = callFunction('createAsset');
  const res = await fn(assetData);
  return res.data;
};

export const createBasket = async (basketData: {
  name: string;
  description: string;
  assets: Array<{ id: string; weight: number }>;
  image?: string;
}) => {
  const fn = callFunction('createBasket');
  const res = await fn(basketData);
  return res.data;
};
