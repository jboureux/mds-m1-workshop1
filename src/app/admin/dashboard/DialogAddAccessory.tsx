import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { toast } from "sonner";

function DialogAddAccessory() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category_id: '',
    description: '',
    isBase: false,
    price: '',
    deviceDiscount: '',
    variants: [{ id: '', name: '', hexcode: '', price: '', isTransparent: false, default: false }]
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleVariantChange = (index, e) => {
    const { id, value } = e.target;
    const newVariants = [...formData.variants];
    newVariants[index] = { ...newVariants[index], [id]: value };
    setFormData((prevData) => ({
      ...prevData,
      variants: newVariants
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accessory/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok');
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
          Ajouter un accessoire
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un Accessoire</DialogTitle>
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
              <Input name='name' id="name" type='text' className="col-span-3" value={formData.name} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category_id" className="text-right">
                Category ID
              </Label>
              <Input name='category_id' id="category_id" type='text' className="col-span-3" value={formData.category_id} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input name='description' id="description" type='text' className="col-span-3" value={formData.description} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isBase" className="text-right">
                Is Base
              </Label>
              <Input name='isBase' id="isBase" type='checkbox' className="col-span-3" checked={formData.isBase} onChange={(e) => setFormData((prevData) => ({ ...prevData, isBase: e.target.checked }))} />
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
            {formData.variants.map((variant, index) => (
              <div key={index} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`variant-id-${index}`} className="text-right">
                    Variant ID
                  </Label>
                  <Input name={`variant-id-${index}`} id="id" type='number' className="col-span-3" value={variant.id} onChange={(e) => handleVariantChange(index, e)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`variant-name-${index}`} className="text-right">
                    Variant Name
                  </Label>
                  <Input name={`variant-name-${index}`} id="name" type='text' className="col-span-3" value={variant.name} onChange={(e) => handleVariantChange(index, e)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`variant-hexcode-${index}`} className="text-right">
                    Variant Hexcode
                  </Label>
                  <Input name={`variant-hexcode-${index}`} id="hexcode" type='text' className="col-span-3" value={variant.hexcode} onChange={(e) => handleVariantChange(index, e)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`variant-price-${index}`} className="text-right">
                    Variant Price
                  </Label>
                  <Input name={`variant-price-${index}`} id="price" type='number' className="col-span-3" value={variant.price} onChange={(e) => handleVariantChange(index, e)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`variant-isTransparent-${index}`} className="text-right">
                    Is Transparent
                  </Label>
                  <Input name={`variant-isTransparent-${index}`} id="isTransparent" type='checkbox' className="col-span-3" checked={variant.isTransparent} onChange={(e) => handleVariantChange(index, e)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`variant-default-${index}`} className="text-right">
                    Default
                  </Label>
                  <Input name={`variant-default-${index}`} id="default" type='checkbox' className="col-span-3" checked={variant.default} onChange={(e) => handleVariantChange(index, e)} />
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-green-600">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogAddAccessory;