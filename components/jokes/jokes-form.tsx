"use client"

import { JokeSchema } from "@/validation-schemas/jokes-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { EditJokeProps, JokesFormProps, UseCase } from "@/types/jokes-form"
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
import { Icons } from "@/components/icons/icons"

export function JokesForm({
  useCase,
  submitFunction,
  joke,
}: EditJokeProps<UseCase.EDIT> | JokesFormProps) {
  const form = useForm<z.infer<typeof JokeSchema>>({
    resolver: zodResolver(JokeSchema),
    defaultValues: useCase === UseCase.EDIT ? { ...joke } : undefined,
  })

  return (
    <Card className="w-full sm:w-6/12">
      <CardContent className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitFunction)}
            className="w-full justify-start space-y-6 text-left"
          >
            <FormField
              control={form.control}
              name="Title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Joke title" {...field} />
                  </FormControl>
                  <FormDescription>
                    The joke title should be a short description of your joke
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Body"
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
              name="Views"
              render={() => (
                <FormItem>
                  <FormLabel>Views</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...form.register("Views", { valueAsNumber: true })}
                      defaultValue={0}
                      placeholder="100"
                    />
                  </FormControl>
                  <FormDescription>
                    An imaginary number of views, get creative!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="albert@pike.com" {...field} />
                  </FormControl>
                  <FormDescription>Your email address </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CreatedAt"
              render={() => (
                <FormItem>
                  <FormLabel>CreatedAt</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1686158256"
                      type="number"
                      {...form.register("CreatedAt", {
                        valueAsNumber: true,
                      })}
                      defaultValue={0}
                    />
                  </FormControl>
                  <FormDescription>
                    The database is supposed to generate this value for you. But
                    for now, input a unix timestamp
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">
                {useCase == UseCase.CREATE ? (
                  <Icons.send className="mr-2 h-5 w-5" />
                ) : (
                  <Icons.edit className="mr-2 h-5 w-5" />
                )}
                {useCase == UseCase.CREATE ? "Submit" : "Edit"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
