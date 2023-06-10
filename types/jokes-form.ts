import * as z from "zod"
import { JokeSchema } from "@/validation-schemas/jokes-form"

export enum UseCase {
	CREATE = "CREATE",
	EDIT = "EDIT",
}

export interface JokesFormProps {
	useCase: UseCase,
	submitFunction: (data: z.infer<typeof JokeSchema>) => void
	joke?: {}
}

export type EditJokeProps<T extends JokesFormProps["useCase"]> = T extends UseCase.EDIT ? {
	useCase: UseCase,
	submitFunction: (data: z.infer<typeof JokeSchema>) => void,
	joke: z.infer<typeof JokeSchema>
} : never