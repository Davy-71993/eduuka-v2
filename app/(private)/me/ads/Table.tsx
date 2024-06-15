"use client"

import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, CircleCheckBig, CircleHelp, Delete, MoreHorizontal, Pencil, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Ad } from "@/lib/types"
import Link from "next/link"
import { ActionButton } from "@/components/ActionButton"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export const columns: ColumnDef<Ad>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "views",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Views
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="w-full max-w-16 text-center">{row.getValue("views")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Date Created",
    cell: ({ row }) => (
      <div className="">{row.getValue("created_at")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ad = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col space-y-3">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-transparent p-0">
              <ActionButton action={()=>{}} title="Edit" Icon={Pencil} className="w-full bg-foreground/30 hover:bg-foreground/35" />
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-transparent p-0">
              <ActionButton action={()=>{}} title="Delete" className="w-full bg-red-500 hover:bg-red-600" Icon={Trash} />
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-transparent p-0">
              <ActionButton className="bg-green-500 text-primary-foreground w-full hover:bg-green-600" action={()=>{}} title="Mark as sold" Icon={CircleCheckBig} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function AdsTable({ ads }: { ads: Ad[]}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedAds, setSelectedAds] = React.useState<Ad[]>([])

  const table = useReactTable({
    data: ads,
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
  })

  React.useEffect(()=>{
    console.log(selectedAds)
  }, [selectedAds])

  React.useEffect(()=>{
    const adsRows = table.getSelectedRowModel().rows.map((row) => row.original)
    setSelectedAds(adsRows)
  }, [rowSelection, table])

  return (
    <div className="w-full">
      <ScrollArea>
        <div className="flex space-x-2 sm:space-x-5 items-center justify-between py-4">
          <Input
            placeholder="Filter by ad names..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm min-w-32 border border-primary rounded-sm ring-0 focus:ring-0 active:ring-0"
          />
          {
              selectedAds.length > 0 &&
              <div className="w-full flex space-x-2 justify-end">
                {
                  selectedAds.length === 1 &&
                  <ActionButton action={()=>{}} title="Edit" Icon={Pencil} className="w-fit bg-foreground/30 hover:bg-foreground/35" />
                }
                <ActionButton action={()=>{}} title="Delete" Icon={Trash} className="bg-red-500 hover:bg-red-600" />
                <ActionButton className="bg-green-500 hover:bg-green-600 text-primary-foreground" action={()=>{}} title="Mark as sold" Icon={CircleCheckBig} />
              </div>
          }
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto border-primary ring-0 focus:ring-0 active:ring-0 rounded-sm">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ScrollBar orientation="horizontal"/>
      </ScrollArea>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-secondary">
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
                  )
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
                    className="hover:bg-secondary"
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
                    className="text-center py-5"
                    >
                    <div className="flex flex-col justify-center pl-10 sm:pl-0 items-center max-w-52 sm:max-w-sm text-2xl text-accent-foreground/20 sm:mx-auto">
                        {
                          ads.length === 0 &&
                          <>
                            <CircleHelp size={120} />
                            <h1 >No Adverts yet.</h1>
                            <Link href="/me/ads/create">
                                <Button className="text-2xl font-bold my-3"><span>Create an Advert</span></Button>
                            </Link>
                          </>
                        }
                        {
                          ads.length>0 && table.getRowCount() === 0 &&
                          <>
                            <CircleHelp size={120}/>
                            <h1 >Nothing match your search.</h1>
                          </>
                        }
                      </div>
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
        </Table>
      </div>
      <ScrollArea className="w-full">
        <div className="w-max min-w-full flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {selectedAds.length} of{" "}
            {ads.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {table.previousPage(); window.scrollTo({ top: 0});}}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {table.nextPage(); window.scrollTo({ top: 0});}}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
          {
              ads.length > 0 && 
              <Link href="/me/ads/create">
                  <Button className="text-xl font-bold"><span>Create a new Ad</span></Button>
              </Link>
          }
        </div>
        <ScrollBar orientation="horizontal"/>
      </ScrollArea>
    </div>
  )
}
