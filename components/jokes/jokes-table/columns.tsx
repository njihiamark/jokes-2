"use client"

import { JokeData } from "@/validation-schemas/jokes-form"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { DataTableColumnHeader } from "./data-table-column-header"

import { convertUnixTimestamp, getColorByViews } from "@/lib/utils"

export const columns: ColumnDef<JokeData>[] = [
  {
    accessorKey: "Id",
    header: ({ column }) => <></>,
    cell: ({ row }) => <></>,
  },
  {
    accessorKey: "Title",
	header: ({ column }) => {
		return <span className="font-medium text-gray-500">Title</span>
	  },
    cell: ({ row }) => {
      return <Link href={`/joke/edit/${row.getValue("Id")}`} className="text-gray-500 hover:underline">{row.getValue("Title")}</Link>
    },
  },
  {
    accessorKey: "Body",
    header: "Body",
  },
  {
    accessorKey: "Author",
    header: "Author",
  },
  {
    accessorKey: "CreatedAt",
    header: ({ column }) => (
		<DataTableColumnHeader column={column} title="CreatedAt" />
	  ),
    cell: ({ row }) => {
      return <span>{convertUnixTimestamp(row.getValue("CreatedAt"))}</span>
    },
  },
  {
    accessorKey: "Views",
    header: ({ column }) => (
		<DataTableColumnHeader column={column} title="Views" />
	  ),
    cell: ({ row }) => {
      return (
        <span style={{ color: getColorByViews(row.getValue("Views")) }}>
          {row.getValue("Views")}
        </span>
      )
    },
  },
]
