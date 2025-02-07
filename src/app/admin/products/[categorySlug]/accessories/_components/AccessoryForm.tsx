"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Accessory } from "@/models/accessory.model";
import {
  addAccessory,
  updateAccessory,
} from "@/repositories/accessory.repository";
import { useRouter } from "next/navigation";

interface AccessoryFormProps {
  categoryId: number | undefined;
  accessory?: Accessory;
  onSubmitSuccessful: () => void;
}

const formSchema = z.object({
  name: z.string({ message: "L'accessoire doit avoir un nom" }),
  description: z.string({
    message: "L'accessoire doit avoir une description",
  }),
  isBase: z.optional(z.boolean()),
});

const AccessoryForm = (props: AccessoryFormProps) => {
  const router = useRouter();
  if (props.categoryId === undefined) throw new Error("No category specified");
  const categoryId: number = props.categoryId;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.accessory ? props.accessory.name : "",
      description: props.accessory ? props.accessory.description : "",
      isBase: props.accessory ? props.accessory.isBase : false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      props.accessory
        ? await updateAccessory(props.accessory._id, {
            ...props.accessory,
            ...values,
          })
        : await addAccessory(categoryId, {
            ...values,
          });

      props.onSubmitSuccessful();
      toast.success(
        `${props.accessory ? "Modification" : "Création"} effectuée avec succès`
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
              <FormLabel>{"Nom de l'accessoire"}</FormLabel>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Description de l'accessoire"}</FormLabel>
              <FormControl>
                <Input
                  placeholder="Coque avant et arrière"
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
          name="isBase"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {"L'accessoire est-il la base de la console ?"}
                </FormLabel>
                <FormDescription>
                  {
                    "Utilisé pour l'affichage dynamique, la base est l'accessoire avec des images sans fond transparent"
                  }
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-4 justify-end">
          <DialogClose asChild>
            <Button variant={"secondary"}>
              Retour à la liste des consoles
            </Button>
          </DialogClose>
          <Button type="submit">
            {props.accessory ? "Modifier l'accessoire" : "Créer un accessoire"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccessoryForm;
