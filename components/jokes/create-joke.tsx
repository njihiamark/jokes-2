"use client"

import { useEffect, useState } from "react"
import * as z from "zod"
import useAuthStore from "@/stores/auth"

import { UseCase } from "@/types/jokes-form"
import { LoginRequired } from "@/components/auth/login-required"

import { JokesForm } from "./jokes-form"
import { JokeSchema } from "@/validation-schemas/jokes-form"
import { toast } from "../ui/use-toast"

export function CreateJoke() {
  const { accessToken } = useAuthStore()
  const [isLogin, setIsLogin] = useState<boolean>(true)
  useEffect(() => {
    setIsLogin(accessToken)
  }, [accessToken])

  function onSubmit(data: z.infer<typeof JokeSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
    <>{isLogin ? <JokesForm useCase={UseCase.CREATE} submitFunction={onSubmit} /> : <LoginRequired />}</>
  )
}
