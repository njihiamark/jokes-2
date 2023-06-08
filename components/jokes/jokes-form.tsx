"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { JokeSchema } from "@/validation-schemas/jokes-form"
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
import { JokesFormProps, UseCase, EditJokeProps } from "@/types/jokes-form"



export function JokesForm({ useCase, submitFunction, joke }: EditJokeProps<UseCase.EDIT> | JokesFormProps) {
  const form = useForm<z.infer<typeof JokeSchema>>({
    resolver: zodResolver(JokeSchema),
    defaultValues: useCase === UseCase.EDIT ? { ...joke } : undefined,
  })

  return  (
        <Card className="w-full sm:w-6/12">
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitFunction)}
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
                  name="createdat"
                  render={() => (
                    <FormItem>
                      <FormLabel>CreatedAt</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1686158256"
                          type="number"
                          {...form.register("createdat", {
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
                <Button type="submit">{useCase == UseCase.CREATE ? "Submit" : "Edit"}</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )
}
