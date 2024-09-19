"use client";
import React from 'react';
import { useReactTable, ColumnDef, SortingState, ColumnFiltersState, VisibilityState, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DialogAddAccessory from './DialogAddAccessory';
import DialogUpdateAccessory from './DialogUpdateAccessory';
import DialogDeleteAccessory from './DialogDeleteAccessory';
import { toast } from 'sonner';

export type Variant = {
  id: string;
  name: string;
  hexcode: string;
  price: number;
};

export type Accessory = {
  name: string;
  category_id: string;
  variants: Variant[];
  isBase: boolean;
  description?: string;
};

export const columns: ColumnDef<Accessory>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-center text-white">Name</div>,
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category_id",
    header: () => <div className="text-center text-white">Category ID</div>,
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("category_id")}</div>,
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center text-white">Description</div>,
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "isBase",
    header: () => <div className="text-center text-white">Is Base</div>,
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("isBase") ? 'Yes' : 'No'}</div>,
  },
  {
    accessorKey: "variants",
    header: () => <div className="text-center text-white">Variants</div>,
    cell: ({ row }) => (
      <div className="lowercase text-center">
        {(row.getValue("variants") as Variant[]).map((variant: Variant) => (
          <div key={variant.id}>
            <div>{variant.name}</div>
            <div>{variant.hexcode}</div>
            <div>{variant.price}</div>
          </div>
        ))}
      </div>
    ),
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
            <DialogUpdateAccessory id={consoleId}>
              <DropdownMenuItem
                className="focus:bg-green-600 focus:text-white"
                onSelect={(event) => event.preventDefault()}
              >
                Modifier
              </DropdownMenuItem>
            </DialogUpdateAccessory>
            <DialogDeleteAccessory id={consoleId}>
              <DropdownMenuItem
                className="focus:bg-destructive focus:text-destructive-foreground"
                onSelect={(event) => event.preventDefault()}
              >
                Supprimer
              </DropdownMenuItem>
            </DialogDeleteAccessory>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableAccessory() {
  const [data, setData] = React.useState<Accessory[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accessory/all`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        toast.error('Error fetching data:', error);
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Rechercher par nom"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-white"
        />
        <DialogAddAccessory />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto text-black">
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
                            header.column.columnDef.header,
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
                  data-state={row.getIsSelected() && "selected"}
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
            Précédent
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