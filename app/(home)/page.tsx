import { LoginButton } from "@/components/auth/login-button"
import { LoginRedirect } from "@/components/auth/login-redirect"

export default function IndexPage() {
  return (
    <section className="container flex min-h-[calc(100vh-65px)] flex-col items-center justify-center gap-6 pb-8 pt-6 text-center md:py-10 2xl:max-w-[1400px]">
      <LoginRedirect />
      <div className="flex flex-col">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Jokes is an App that will make you laugh!
        </h1>
      </div>
      <LoginButton />
    </section>
  )
}
