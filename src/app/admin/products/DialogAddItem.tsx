import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster } from '@/components/ui/sonner';
import React, { useState } from 'react';
import { toast } from "sonner"



function DialogAddItem() {

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    deviceDiscount: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error( data.message || 'Network response was not ok');
      }
      
      console.log('Success:', data);
      toast.success('Produit ajouté avec succès', data);
      // Fermer la modal ?

    } catch (error) {
      toast.error(error.message || error);
    }
  };

  return (
<Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-500 text-white px-4 py-2 ml-2 rounded-md">
              Ajouter un produit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter un produit</DialogTitle>
              <DialogDescription>
                Remplissez les informations du produit ci-dessous.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  ID
                </Label>
                <Input name='id' id="id" type='number' className="col-span-3" value={formData.id} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input name='name' id="name" type='string' className="col-span-3" value={formData.name} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Prix
                </Label>
                <Input name='price' id="price" type='number' className="col-span-3" value={formData.price} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deviceDiscount" className="text-right">
                  Remise
                </Label>
                <Input name='deviceDiscount' id="deviceDiscount" type='number' className="col-span-3" value={formData.deviceDiscount} onChange={handleChange} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-green-600">Ajouter</Button>
            </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
  );
}

export default DialogAddItem;