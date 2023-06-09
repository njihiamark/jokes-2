"use client"

import { ColumnDef } from "@tanstack/react-table"
import { JokeData } from "@/validation-schemas/jokes-form"

import { convertUnixTimestamp } from "@/lib/utils"


export const columns: ColumnDef<JokeData>[] = [
  {
    accessorKey: "Title",
    header: "Title",
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
    header: "CreatedAt",
	cell: ({ row }) => {
		return (
			<span>
			  {convertUnixTimestamp(row.getValue("CreatedAt"))}
			</span>
		)
	  },
  },
  {
    accessorKey: "Views",
    header: "Views",
  },
]
