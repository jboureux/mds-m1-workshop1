"use client";

import { Button } from "@/components/ui/button";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { DataTable } from "@/components/ui/data-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Category } from "@/models/category.model";
import { MoreHorizontal } from "lucide-react";
import { useAdminCategories } from "../_providers/admin-categories-provider";
import { useCategoryDialog } from "../_providers/category-dialog-provider";
import DialogCreateCategory from "./DialogCreateCategory";

export function DataTableCategories() {
    const dialogContext = useCategoryDialog();
    const { categories } = useAdminCategories();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);

    const columns: ColumnDef<Category>[] = [
        {
            accessorKey: "name",
            header: () => <span>Nom</span>,
        },
        {
            accessorKey: "price",
            header: () => <span>Prix</span>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("price"));

                // Format the price as a euro currency
                const formatted = new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                }).format(amount);

                return <span className=" font-medium">{formatted}</span>;
            },
        },
        {
            accessorKey: "deviceDiscount",
            header: () => <span>Réduction (si base console)</span>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("deviceDiscount"));

                // Format the discount as a percentage
                const formatted = new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                }).format(amount);

                return <div className="font-medium">{formatted}</div>;
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                className=" focus:bg-green-600 focus:text-white"
                                onSelect={(event) => {
                                    event.preventDefault();
                                    dialogContext.setCategory(row.original);
                                    dialogContext.openUpdate();
                                }}
                            >
                                Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="focus:bg-destructive focus:text-destructive-foreground"
                                onSelect={(event) => {
                                    event.preventDefault();
                                    dialogContext.setCategory(row.original);
                                    dialogContext.openDelete();
                                }}
                            >
                                Supprimer
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
    const table = useReactTable<Category>({
        data: categories,
        columns: columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <div className="w-full px-14 text-2xl">
            <div className="flex items-center py-4 ">
                <Input
                    placeholder="Rechercher par nom"
                    value={
                        (table.getColumn("name")?.getFilterValue() as string) ??
                        ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("name")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DialogCreateCategory />
            </div>
            <DataTable table={table} columns={columns} />
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2 text-black">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Precédent
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Suivant
                    </Button>
                </div>
            </div>
        </div>
    );
}
