"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useAuthStore from "@/stores/auth"
import { JokeData } from "@/validation-schemas/jokes-form"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useMutation, useQuery, useQueryClient  } from "@tanstack/react-query"
import axios from "axios"

import { JokeId } from "@/types/joke"
import { UseCase } from "@/types/jokes-form"
import { convertKeysToPascalCase } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { JokesFormSkeleton } from "../loading-skeletons/jokes-form"
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

import { JokesForm } from "./jokes-form"

const getJoke = async ({ jokeId }: JokeId) => {
  try {
  const response = await axios.get(
    `https://retoolapi.dev/zu9TVE/jokes/${jokeId}`
  )
  return response?.data
  } catch (error) {
    console.log(error)
    const data = null
    return data;
  }
}

export function EditJoke({ jokeId }: JokeId) {
  const { accessToken } = useAuthStore()
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const router = useRouter()
  const queryClient = useQueryClient();
  const editId = jokeId

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
        queryClient.invalidateQueries(["jokes"]);
        queryClient.invalidateQueries(["joke", editId]);
        toast({
          itemID: "joke-toast",
          title: "Joke updated!",
          description: "Your joke has been updated.",
        })
        router.replace("/jokes")
      },
    }
  )

  const { mutate: deleteJoke } = useMutation(
    async () =>
      await axios.delete(`https://retoolapi.dev/zu9TVE/jokes/${jokeId}`),
    {
      onError: (error: any) => {
        console.log(error)
        toast({
          itemID: "delete-joke-toast",
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem deleting this joke.",
        })
      },
      onSuccess: () => {
        toast({
          itemID: "delete-joke-toast",
          title: "Joke deleted!",
          description: "Your joke has been deleted.",
        })
		router.replace("/jokes")
      },
    }
  )

  function onSubmit(data: JokeData) {
    mutate(data)
  }

  function deleteHandler() {
    deleteJoke()
  }

  if (!isLogin) return <LoginRequired />

  if (isLoading) {
    return <JokesFormSkeleton />
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
            This action cannot be undone. This will permanently delete your joke.
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
