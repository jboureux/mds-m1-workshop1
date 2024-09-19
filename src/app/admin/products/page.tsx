import React from 'react';
import { DataTableProduct } from './DataTableProduct';


function PageProduct() {
  return (
    <div className='bg-[#686de0] min-h-screen'>
      <h2 className="flex items-center justify-center pt-9 text-4xl">Consoles 🎮​</h2>
    <DataTableProduct />
    </div>
  );
}

export default PageProduct;