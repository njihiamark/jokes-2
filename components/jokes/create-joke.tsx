"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useAuthStore from "@/stores/auth"
import { JokeData } from "@/validation-schemas/jokes-form"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { UseCase } from "@/types/jokes-form"
import { LoginRequired } from "@/components/auth/login-required"

import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"
import { JokesForm } from "./jokes-form"
import { Icons } from "../icons/icons"

export function CreateJoke() {
  const { accessToken } = useAuthStore()
  const [isLogin, setIsLogin] = useState<boolean>(true)
  useEffect(() => {
    setIsLogin(accessToken)
  }, [accessToken])

  const router = useRouter()

  const { mutate } = useMutation(
    async (data: JokeData) =>
      await axios.post("https://retoolapi.dev/zu9TVE/jokes", data),
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
          title: "Joke created!",
          description: "Your joke has been created.",
        })
        console.log(data.data)
        router.replace("/jokes")
      },
    }
  )

  function onSubmit(data: JokeData) {
    mutate(data)
  }
  return (
    <>
      {isLogin ? (
        <>
          <div className="mb-4 flex w-full sm:mt-0 sm:w-6/12">
            <Button onClick={() => router.push("/jokes")}><Icons.back className="mr-2 h-5 w-5" /><span>Back</span></Button>
          </div>
          <JokesForm useCase={UseCase.CREATE} submitFunction={onSubmit} />
        </>
      ) : (
        <LoginRequired />
      )}
    </>
  )
}
