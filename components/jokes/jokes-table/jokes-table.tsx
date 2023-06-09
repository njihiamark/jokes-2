"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useAuthStore from "@/stores/auth"
import { JokeData } from "@/validation-schemas/jokes-form"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { convertKeysToPascalCase } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LoginRequired } from "@/components/auth/login-required"
import { Icons } from "@/components/icons/icons"

import { columns } from "./columns"
import { DataTable } from "./data-table"

const getJokes = async () => {
  try {
    const response = await axios.get(
      "https://retoolapi.dev/zu9TVE/jokes?_sort=views&_order=desc"
    )
    return response?.data
  } catch (error) {
    console.log(error)
    const data = null
    return data
  }
}

export function JokesTable() {
  const { accessToken } = useAuthStore()
  const [isLogin, setIsLogin] = useState<boolean>(true)

  const router = useRouter()

  const { data, isLoading } = useQuery({
    queryFn: () => getJokes(),
    queryKey: ["jokes"],
  })

  useEffect(() => {
    setIsLogin(accessToken)
  }, [accessToken])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const jokesData = convertKeysToPascalCase(data) as JokeData[]

  return (
    <>
      {isLogin ? (
        <>
          <div className="mb-4 flex w-full sm:mt-0 sm:w-6/12">
            <Button onClick={() => router.push("/joke/create")}>
              <span>Add joke</span>
              <Icons.add_joke className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <DataTable columns={columns} data={jokesData} />
        </>
      ) : (
        <LoginRequired />
      )}
    </>
  )
}
