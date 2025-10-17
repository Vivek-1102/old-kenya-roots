import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Save, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockAssets, Asset } from '@/lib/mockData';
import { toast } from 'sonner';

export default function AssetManager() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({
    symbol: '',
    name: '',
    category: 'NSE' as 'NSE' | 'Crypto' | 'US Stock',
    price: '',
  });

  const handleEditClick = (asset: Asset) => {
    setEditingId(asset.id);
    setEditPrice(asset.price.toString());
  };

  const handleSavePrice = (id: string) => {
    const price = parseFloat(editPrice);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    setAssets(prev =>
      prev.map(asset =>
        asset.id === id ? { ...asset, price } : asset
      )
    );
    setEditingId(null);
    toast.success('Price updated successfully');
  };

  const handleAddAsset = () => {
    const price = parseFloat(newAsset.price);
    if (!newAsset.symbol || !newAsset.name || isNaN(price) || price <= 0) {
      toast.error('Please fill all fields correctly');
      return;
    }

    const asset: Asset = {
      id: `asset_${Date.now()}`,
      symbol: newAsset.symbol.toUpperCase(),
      name: newAsset.name,
      category: newAsset.category,
      price,
      change: 0,
      changePercent: 0,
    };

    setAssets(prev => [...prev, asset]);
    setNewAsset({ symbol: '', name: '', category: 'NSE', price: '' });
    setIsAddModalOpen(false);
    toast.success('Asset added successfully');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Asset Manager</h1>
          <p className="text-muted-foreground mt-1">Manage assets and update prices</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Asset
        </Button>
      </motion.div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>% Change</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell className="font-bold">{asset.symbol}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs bg-muted">
                    {asset.category}
                  </span>
                </TableCell>
                <TableCell>
                  {editingId === asset.id ? (
                    <Input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-32"
                      step="0.01"
                    />
                  ) : (
                    `KSh ${asset.price.toLocaleString()}`
                  )}
                </TableCell>
                <TableCell>
                  <span className={asset.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent}%
                  </span>
                </TableCell>
                <TableCell>
                  {editingId === asset.id ? (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSavePrice(asset.id)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditClick(asset)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Price
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
            <DialogDescription>
              Add a new asset to the platform
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Symbol</Label>
              <Input
                value={newAsset.symbol}
                onChange={(e) => setNewAsset({ ...newAsset, symbol: e.target.value })}
                placeholder="e.g., AAPL"
              />
            </div>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={newAsset.name}
                onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                placeholder="e.g., Apple Inc."
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={newAsset.category}
                onValueChange={(value: 'NSE' | 'Crypto' | 'US Stock') =>
                  setNewAsset({ ...newAsset, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NSE">NSE</SelectItem>
                  <SelectItem value="Crypto">Crypto</SelectItem>
                  <SelectItem value="US Stock">US Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Price (KSh)</Label>
              <Input
                type="number"
                value={newAsset.price}
                onChange={(e) => setNewAsset({ ...newAsset, price: e.target.value })}
                placeholder="0.00"
                step="0.01"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAsset}>Add Asset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
