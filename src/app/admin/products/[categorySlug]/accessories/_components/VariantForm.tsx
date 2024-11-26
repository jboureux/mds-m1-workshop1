"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Variant } from "@/models/variant.model";
import { addVariant, updateVariant } from "@/repositories/variant.reporsitory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface VariantFormProps {
  variant?: Variant;
  accessoryId: string | undefined;
  onSubmitSuccessful: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "La variante doit avoir un nom" }),
  hexcode: z
    .string()
    .regex(
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      "La couleur doit être une valeure hexadécimale"
    )
    .optional()
    .or(z.literal("")),
  price: z.coerce.number().optional(),
  isDefault: z.optional(z.boolean()),
  isTransparent: z.optional(z.boolean()),
});

const VariantForm = (props: VariantFormProps) => {
  if (!props.accessoryId) throw new Error("No accessory specified");
  const accessoryId = props.accessoryId;
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.variant ? props.variant.name : "",
      hexcode: props.variant ? props.variant.hexcode : "",
      price: props.variant ? props.variant.price : undefined,
      isDefault: props.variant ? props.variant.isDefault : false,
      isTransparent: props.variant ? props.variant.isTransparent : false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      props.variant
        ? await updateVariant(props.variant.id, {
            ...props.variant,
            ...values,
          })
        : await addVariant(accessoryId, {
            ...values,
          });

      props.onSubmitSuccessful();
      toast.success(
        `${props.variant ? "Modification" : "Création"} effectuée avec succès`
      );
      router.refresh();
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Nom de la variante"}</FormLabel>
              <FormControl>
                <Input
                  placeholder="Coque"
                  type="text"
                  autoComplete="off"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hexcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Couleur (en héxadécimal)"}</FormLabel>
              <FormControl>
                <Input
                  placeholder="#FFFFFFF"
                  type="text"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isTransparent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{"Couleur transparente ?"}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Prix (en €)"}</FormLabel>
              <FormControl>
                <Input
                  placeholder="10"
                  type="number"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{"Utiliser cette variante par défaut ?"}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-4 justify-end">
          <DialogClose asChild>
            <Button variant={"secondary"}>
              Retour à la liste des accessoires
            </Button>
          </DialogClose>
          <Button type="submit">
            {props.variant ? "Modifier la variante" : "Créer une variante"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VariantForm;
