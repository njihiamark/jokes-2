"use client"

import { useEffect, useState } from "react"
import useAuthStore from "@/stores/auth"
import { JokeData } from "@/validation-schemas/jokes-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

import { JokeId } from "@/types/joke"
import { UseCase } from "@/types/jokes-form"
import { toast } from "@/components/ui/use-toast"
import { LoginRequired } from "@/components/auth/login-required"
import { convertKeysToLowerCase } from "@/lib/utils"

import { JokesForm } from "./jokes-form"

const getJoke = async ({ jokeId }: JokeId) => {
  const response = await axios.get(
    `https://retoolapi.dev/zu9TVE/jokes/${jokeId}`
  )
  return response?.data
}

export function EditJoke({ jokeId }: JokeId) {
  const { accessToken } = useAuthStore()
  const [isLogin, setIsLogin] = useState<boolean>(true)

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

  const jokeData = convertKeysToLowerCase(data)

  return (
        <JokesForm
          useCase={UseCase.EDIT}
          submitFunction={onSubmit}
          joke={{...jokeData}}
        />
  )
}
