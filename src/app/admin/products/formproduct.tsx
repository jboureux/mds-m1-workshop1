"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  price: z.number().int().min(0, "Price must be at least 0"),
  discount: z.number().int().min(0, "Discount must be at least 0"),
});

const FormProduct = () => {
  const  form  = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          <FormItem className="space-y-4">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</Label>
              <Input id="name" {...form.register("name")} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {form.formState.errors.name && <FormMessage className="text-red-600">{form.formState.errors.name.message}</FormMessage>}
            </div>
            <div>
              <Label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</Label>
              <Input id="price" {...form.register("price", { valueAsNumber: true })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {form.formState.errors.price && <FormMessage className="text-red-600">{form.formState.errors.price.message}</FormMessage>}
            </div>
            <div>
              <Label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount</Label>
              <Input id="discount" {...form.register("discount", { valueAsNumber: true })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {form.formState.errors.discount && <FormMessage className="text-red-600">{form.formState.errors.discount.message}</FormMessage>}
            </div>
          </FormItem>
          <Button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Envoyer</Button>
        </form>
      </Form>
    </div>
  );

 
  
};

export default FormProduct;