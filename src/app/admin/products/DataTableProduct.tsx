"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import DialogAddItem from "./DialogAddItem";
import DialogDeleteItem from "./DialogDeleteItem";
import DialogUpdateItem from "./DialogUpdateItem";

export type Console = {
    id: number;
    name: string;
    price: number;
    deviceDiscount: number;
};

export const columns: ColumnDef<Console>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-center text-white">ID</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: () => <div className="text-center text-white">Name</div>,
        cell: ({ row }) => (
            <div className="lowercase text-center">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "price",
        header: () => <div className="text-center text-white">Price</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"));

            // Format the price as a euro currency
            const formatted = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
            }).format(amount);

            return <div className="text-center font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "deviceDiscount",
        header: () => <div className="text-center text-white">Discount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("deviceDiscount"));

            // Format the discount as a percentage
            const formatted = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
            }).format(amount);

            return <div className="text-center font-medium">{formatted}</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const consoleId = row.getValue("id");

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
                        <DialogUpdateItem id={consoleId as string}>
                            <DropdownMenuItem
                                className=" focus:bg-green-600 focus:text-white"
                                onSelect={(event) => event.preventDefault()}
                            >
                                Modifier
                            </DropdownMenuItem>
                        </DialogUpdateItem>

                        <DialogDeleteItem id={consoleId as string}>
                            <DropdownMenuItem
                                className="focus:bg-destructive focus:text-destructive-foreground"
                                onSelect={(event) => event.preventDefault()}
                            >
                                Supprimer
                            </DropdownMenuItem>
                        </DialogDeleteItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function DataTableProduct() {
    const [data, setData] = React.useState<Console[]>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/category/all`
                );
                const result = await response.json();
                setData(result);
            } catch (error) {
                toast.error((error as Error).message);
            }
        };

        fetchData();
    }, []);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full px-14 text-white text-2xl">
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
                    className="max-w-sm text-white"
                />
                <DialogAddItem />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="ml-auto text-black"
                        >
                            Colonne <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="rounded-md border bg-[#30336b]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Aucun résultat.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
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
