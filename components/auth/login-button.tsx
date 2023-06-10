"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useAuthStore from "@/stores/auth"

import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons/icons"

export function LoginButton() {
  const router = useRouter()
  const { accessToken, setAccessToken } = useAuthStore()

  const [isLogin, setIsLogin] = useState<boolean>(true)

  useEffect(() => {
    setIsLogin(accessToken)
  }, [accessToken])

  function handleLogin() {
	setAccessToken(true)
	if (location.pathname === "/"){
		router.push("/jokes")
	}
  }

  return (
    <>
      <Button
        className={buttonVariants()}
        onClick={() => {
          accessToken ? setAccessToken(false) : handleLogin()
        }}
      >
        {isLogin ? <span>Logout</span> : <span>Login</span>}
        {isLogin ? (
          <Icons.logout className="ml-2 h-5 w-5" />
        ) : (
          <Icons.login className="ml-2 h-5 w-5" />
        )}
      </Button>
    </>
  )
}
