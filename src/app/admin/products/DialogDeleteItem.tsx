import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';



function DialogDeleteItem({children}: {children: React.ReactNode}) {
  return (
        <Dialog>
          <DialogTrigger asChild>
            {children}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Supprimer un produit</DialogTitle>
              <DialogDescription>
                Etes vous sur de supprimer le produit ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit" className="bg-red-600">Supprimer le produit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

  );
}

export default DialogDeleteItem;