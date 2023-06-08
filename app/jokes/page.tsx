import { JokesTable } from "@/components/jokes/jokes-table"

export default function JokesPage() {
  return (
    <section className="container flex min-h-[calc(100vh-65px)] flex-col items-center justify-center gap-6 pb-8 pt-6 text-center md:py-10 2xl:max-w-[1400px]">
        <JokesTable />
    </section>
  )
}
