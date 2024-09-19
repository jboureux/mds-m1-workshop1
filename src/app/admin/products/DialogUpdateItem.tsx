import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';



function DialogUpdateItem({children}: {children: React.ReactNode}) {
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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Prix
                </Label>
                <Input id="price" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="discount" className="text-right">
                  Remise
                </Label>
                <Input id="discount" className="col-span-3" />
              </div>
              {/* <div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="frontImage" className="text-right">
    Front Image
  </Label>
  <Input type="file" id="frontImage" className="col-span-3" />
</div>
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="backImage" className="text-right">
    Back Image
  </Label>
  <Input type="file" id="backImage" className="col-span-3" />
</div>
<div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="sideImage" className="text-right">
    Side Image
  </Label>
  <Input type="file" id="sideImage" className="col-span-3" />
</div> */}
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-green-600">Enregistrer les modifications</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

  );
}

export default DialogUpdateItem;