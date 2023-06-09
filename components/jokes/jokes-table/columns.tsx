"use client"

import { ColumnDef } from "@tanstack/react-table"
import { JokeData } from "@/validation-schemas/jokes-form"


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
  },
  {
    accessorKey: "Views",
    header: "Views",
  },
]
