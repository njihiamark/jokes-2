"use client"

import { useEffect, useState } from "react"
import useAuthStore from "@/stores/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

import { LoginRequired } from "@/components/auth/login-required"

const FormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .trim()
    .nonempty()
    .min(5, {
      message: "Title must be at least 5 characters",
    })
    .max(200, {
      message: "Title must not be longer than 200 characters",
    }),
  body: z
    .string({
      required_error: "Body is required",
    })
    .trim()
    .nonempty()
    .min(5, {
      message: "Body must be at least 5 characters",
    })
    .max(500, {
      message: "Body must not be longer than 500 characters",
    }),
  views: z
    .number()
    .gt(0, {
      message: "Number of views are required",
    })
    .int()
    .positive(),
  author: z
    .string({
      required_error: "Author is required",
    })
    .trim()
    .min(3, {
      message: "Author must be at least 3 characters",
    })
    .max(200, {
      message: "Author must be at least 5 characters",
    }),
  createdAt: z
    .number({
      required_error: "A unix timestamp is required",
    })
    .gt(0, {
      message: "A unix timestamp is required",
    })
    .int()
    .positive(),
})

export function JokesForm() {
  const { accessToken } = useAuthStore()
  const [isLogin, setIsLogin] = useState<boolean>(true)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  useEffect(() => {
    setIsLogin(accessToken)
  }, [accessToken])
  return (
    <>
      {isLogin ? (
        <Card className="w-full sm:w-6/12">
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full justify-start space-y-6 text-left"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Joke title" {...field} />
                      </FormControl>
                      <FormDescription>
                        The joke title should be a short description of your
                        joke
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Body</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a joke!"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The content of your joke goes here
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="views"
                  render={() => (
                    <FormItem>
                      <FormLabel>Views</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...form.register("views", { valueAsNumber: true })}
                          defaultValue={0}
                          placeholder="100"
                        />
                      </FormControl>
                      <FormDescription>
                        Put an imaginary number of views for now
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Albert Pike" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your awesome name or alias goes here
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="createdAt"
                  render={() => (
                    <FormItem>
                      <FormLabel>createdAt</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1686158256"
                          type="number"
                          {...form.register("createdAt", {
                            valueAsNumber: true,
                          })}
                          defaultValue={0}
                        />
                      </FormControl>
                      <FormDescription>
                        The database is supposed to generate this value for you.
                        But for now, put a unix timestamp
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <LoginRequired />
      )}
    </>
  )
}
