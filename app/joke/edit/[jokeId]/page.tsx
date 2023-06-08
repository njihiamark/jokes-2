import { JokePageProps } from "@/types/joke"
import { EditJoke } from "@/components/jokes/edit-joke"

export default function JokesPage({ params }: JokePageProps) {
  return (
    <section className="container flex min-h-[calc(100vh-65px)] flex-col items-center justify-center gap-6 pb-8 pt-6 text-center md:py-10 2xl:max-w-[1400px]">
      <EditJoke jokeId={params.jokeId}/>
    </section>
  )
}
