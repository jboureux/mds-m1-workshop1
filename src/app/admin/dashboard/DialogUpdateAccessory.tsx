import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, {useState, useEffect} from 'react';
import { toast } from 'sonner';



function DialogUpdateAccessory({children, id}: {children: React.ReactNode}) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    deviceDiscount: ''
  });

  useEffect(() => {
    // Initialiser l'état avec l'ID passé en prop
    setFormData(prevState => ({
      ...prevState,
      id: id
    }));
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok');
      }
      toast.success('Produit mis à jour avec succès');
      // Fermer la modal et réinitialiser le formulaire si nécessaire
      setFormData({
        id: '',
        name: '',
        price: '',
        deviceDiscount: ''
      });
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  return (
    <Dialog>
    <DialogTrigger asChild>
      {children}
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Modifier un produit</DialogTitle>
        <DialogDescription>
          Modifier les informations du produit ci-dessous.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input id="name" className="col-span-3" value={formData.name} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Prix
            </Label>
            <Input id="price" className="col-span-3" value={formData.price} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deviceDiscount" className="text-right">
              Remise
            </Label>
            <Input id="deviceDiscount" className="col-span-3" value={formData.deviceDiscount} onChange={handleChange} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-green-600">Enregistrer les modifications</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
  );
}

export default DialogUpdateAccessory;