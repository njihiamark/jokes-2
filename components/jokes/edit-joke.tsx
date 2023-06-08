"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useAuthStore from "@/stores/auth"
import { JokeData } from "@/validation-schemas/jokes-form"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

import { JokeId } from "@/types/joke"
import { UseCase } from "@/types/jokes-form"
import { convertKeysToPascalCase } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { LoginRequired } from "@/components/auth/login-required"
import { Icons } from "@/components/icons/icons"

import { Card, CardContent } from "../ui/card"
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

  function deleteHandler() {
    console.log("delete")
  }

  if (!isLogin) return <LoginRequired />

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return (
      <Card className="w-full sm:w-6/12">
        <CardContent className="p-6">
          <b>
            This joke does not exist.
            <br /> It has most likely been deleted!
          </b>
        </CardContent>
      </Card>
    )
  }

  const jokeData = convertKeysToPascalCase(data)

  return (
    <Dialog>
      <div className="mb-4 flex w-full justify-between sm:mt-0 sm:w-6/12">
        <Button onClick={() => router.push("/jokes")}>
          <Icons.back className="mr-2 h-5 w-5" />
          <span>Back</span>
        </Button>
        <DialogTrigger asChild>
          <Button type="button">
            <Icons.delete className="mr-2 h-5 w-5" />
            <span>Delete</span>
          </Button>
        </DialogTrigger>
      </div>

      <JokesForm
        useCase={UseCase.EDIT}
        submitFunction={onSubmit}
        joke={{ ...jokeData }}
      />

      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your joke
            and remove it from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogPrimitive.Close
            aria-label="Close"
            className={buttonVariants({ variant: "destructive" })}
            onClick={deleteHandler}
          >
            Delete
          </DialogPrimitive.Close>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
