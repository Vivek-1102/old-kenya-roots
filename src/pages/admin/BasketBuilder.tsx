import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockBaskets, mockAssets, Basket } from '@/lib/mockData';
import { toast } from 'sonner';

export default function BasketBuilder() {
  const [baskets, setBaskets] = useState<Basket[]>(mockBaskets);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newBasket, setNewBasket] = useState({
    name: '',
    description: '',
    image: '',
    minInvestment: '',
  });

  const handleCreateBasket = () => {
    const minInvestment = parseFloat(newBasket.minInvestment);
    if (!newBasket.name || !newBasket.description || isNaN(minInvestment) || minInvestment <= 0) {
      toast.error('Please fill all fields correctly');
      return;
    }

    const basket: Basket = {
      id: `basket_${Date.now()}`,
      name: newBasket.name,
      description: newBasket.description,
      image: newBasket.image || '/baskets/balanced.jpg',
      performance: 0,
      assets: [],
      minInvestment,
    };

    setBaskets(prev => [...prev, basket]);
    setNewBasket({ name: '', description: '', image: '', minInvestment: '' });
    setIsCreateModalOpen(false);
    toast.success('Basket created successfully');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Basket Builder</h1>
          <p className="text-muted-foreground mt-1">Create and manage investment baskets</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Basket
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {baskets.map((basket, index) => (
          <motion.div
            key={basket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={basket.image}
                  alt={basket.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{basket.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {basket.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Performance</span>
                  <span className="text-lg font-bold text-green-600">
                    +{basket.performance}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Min. Investment</span>
                  <span className="font-semibold">
                    KSh {basket.minInvestment.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Basket</DialogTitle>
            <DialogDescription>
              Create a new investment basket for users
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Basket Name</Label>
              <Input
                value={newBasket.name}
                onChange={(e) => setNewBasket({ ...newBasket, name: e.target.value })}
                placeholder="e.g., Tech Giants"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newBasket.description}
                onChange={(e) => setNewBasket({ ...newBasket, description: e.target.value })}
                placeholder="Brief description of the basket"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Image URL (Optional)</Label>
              <Input
                value={newBasket.image}
                onChange={(e) => setNewBasket({ ...newBasket, image: e.target.value })}
                placeholder="/baskets/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label>Minimum Investment (KSh)</Label>
              <Input
                type="number"
                value={newBasket.minInvestment}
                onChange={(e) => setNewBasket({ ...newBasket, minInvestment: e.target.value })}
                placeholder="5000"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateBasket}>Create Basket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
