import * as z from "zod"

export const JokeSchema = z.object({
	Id: z
	.union([z.number(), z.string()])
	.optional()
	.transform(e => e === "" ? undefined : e),
	Title: z
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
	Body: z
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
	Views: z
	  .number()
	  .gt(0, {
		message: "Number of views are required",
	  })
	  .int()
	  .positive(),
	Author: z
	  .string({
		required_error: "Author is required",
	  })
	  .trim()
	  .email("Please enter a valid email address"),
	CreatedAt: z
	  .number({
		required_error: "A unix timestamp is required",
	  })
	  .gt(0, {
		message: "A unix timestamp is required",
	  })
	  .int()
	  .positive(),
  })

  export type JokeData = z.infer<typeof JokeSchema>