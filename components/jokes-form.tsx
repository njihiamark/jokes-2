"use client"

import useAuthStore from "@/stores/auth"

import { LoginRequired } from "./login-required"
import { useEffect, useState } from "react"

export function JokesForm() {
  const { accessToken } = useAuthStore()
  const [isLogin, setIsLogin] = useState<boolean>(false)

  useEffect(() => {
    setIsLogin(accessToken)
  }, [accessToken])
  return (
    <>
      {isLogin ? (
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          joke form comes here!
        </h1>
      ) : (
        <LoginRequired />
      )}
    </>
  )
}
