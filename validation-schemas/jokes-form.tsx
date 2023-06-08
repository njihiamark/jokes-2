import * as z from "zod"

export const JokeSchema = z.object({
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