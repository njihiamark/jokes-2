"use client"

import { useEffect, useState } from "react"
import useAuthStore from "@/stores/auth"
import { useRouter } from "next/navigation"
import { JokeData } from "@/validation-schemas/jokes-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

import { JokeId } from "@/types/joke"
import { UseCase } from "@/types/jokes-form"
import { toast } from "@/components/ui/use-toast"
import { LoginRequired } from "@/components/auth/login-required"
import { convertKeysToPascalCase } from "@/lib/utils"

import { JokesForm } from "./jokes-form"
import { Card, CardContent } from "../ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons/icons"

const getJoke = async ({ jokeId }: JokeId) => {
  const response = await axios.get(
    `https://retoolapi.dev/zu9TVE/jokes/${jokeId}`
  )
  return response?.data
}

export function EditJoke({ jokeId }: JokeId) {
  const { accessToken } = useAuthStore()
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    setIsLogin(accessToken)
  }, [accessToken])

  const { data, isLoading } = useQuery({
    queryFn: () => getJoke({ jokeId }),
    queryKey: ["joke", jokeId],
  })

  const { mutate } = useMutation(
    async (data: JokeData) =>
      await axios.put(`https://retoolapi.dev/zu9TVE/jokes/${jokeId}`, data),
    {
      onError: (error: any) => {
        console.log(error)
        toast({
          itemID: "joke-toast",
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      },
      onSuccess: (data) => {
        toast({
          itemID: "joke-toast",
          title: "Joke updated!",
          description: "Your joke has been updated.",
        })
        console.log(data.data)
      },
    }
  )

  function onSubmit(data: JokeData) {
    mutate(data)
  }

  if(!isLogin) return <LoginRequired />

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
	return(
		<Card className="w-full sm:w-6/12">
          <CardContent className="p-6">
            <b>This joke does not exist.<br/> It has most likely been deleted!</b>
          </CardContent>
        </Card>
	)
  }

  const jokeData = convertKeysToPascalCase(data)

  return (
		<>
		<div className="mb-4 flex w-full justify-between sm:mt-0 sm:w-6/12">
            <Button onClick={() => router.push("/jokes")}><Icons.back className="mr-2 h-5 w-5" /><span>Back</span></Button>
			<Button onClick={() => router.push("/jokes")}><Icons.delete className="mr-2 h-5 w-5" /><span>Delete</span></Button>
          </div>
        <JokesForm
          useCase={UseCase.EDIT}
          submitFunction={onSubmit}
          joke={{...jokeData}}
        />
		</>
  )
}
