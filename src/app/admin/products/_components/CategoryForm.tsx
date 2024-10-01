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
import { Category } from "@/models/category.model";
import {
    addCategory,
    getCategories,
    updateCategory,
} from "@/repositories/category.repository";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAdminCategories } from "../_providers/admin-categories-provider";

interface CategoryFormProps {
    category?: Category;
    onSubmitSuccessful: () => void;
}

const formSchema = z
    .object({
        name: z.string({ message: "La console doit avoir un nom" }),
        price: z.coerce
            .number({ message: "La console doit avoir un prix" })
            .min(0, "Le prix ne peux pas être en dessous de 0"),
        deviceDiscount: z.coerce
            .number({
                message: "La console doit avoir une réduction",
            })
            .min(0, "La réduction ne peux pas être en dessous de 0"),
    })
    .refine((data) => data.price >= data.deviceDiscount, {
        message:
            "La réduction doit être inferieure ou égale au prix de la console",
        path: ["deviceDiscount"],
    });

const CategoryForm = (props: CategoryFormProps) => {
    const { setCategories } = useAdminCategories();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: props.category ? props.category.name : "",
            price: props.category ? props.category.price : undefined,
            deviceDiscount: props.category
                ? props.category.deviceDiscount
                : undefined,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            props.category
                ? await updateCategory(props.category.id, {
                      ...props.category,
                      ...values,
                  })
                : await addCategory({
                      id: Date.now(),
                      ...values,
                  });

            const newData = await getCategories();
            setCategories(newData);
            props.onSubmitSuccessful();
            toast.success(
                `${
                    props.category ? "Modification" : "Création"
                } effectuée avec succès`
            );
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
                            <FormLabel>Nom de la console</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Gameboy Advance"
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
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prix de la console (en €)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="100"
                                    type="number"
                                    {...field}
                                    value={field.value ? field.value : ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="deviceDiscount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reduction console (en €)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="25"
                                    type="number"
                                    {...field}
                                    value={field.value ? field.value : ""}
                                />
                            </FormControl>
                            <FormDescription>
                                {`Réduction appliquée si le client décide
                                d'envoyer sa propre console`}
                            </FormDescription>
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
                        {props.category
                            ? "Modifier la console"
                            : "Créer une console"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CategoryForm;
