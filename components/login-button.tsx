"use client"

import { useEffect, useState } from "react"
import useAuthStore from "@/stores/auth"

import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function LoginButton() {
  const { accessToken, setAccessToken } = useAuthStore()

  const [isLogin, setIsLogin] = useState<boolean>(false)

  useEffect(() => {
    setIsLogin(accessToken)
  }, [accessToken])

  return (
    <>
      <Button
        className={buttonVariants()}
        onClick={() => {
          accessToken ? setAccessToken(false) : setAccessToken(true)
        }}
      >
        {isLogin ? <span>Logout</span> : <span>Login</span>}
        {accessToken ? (
          <Icons.logout className="ml-2 h-5 w-5" />
        ) : (
          <Icons.login className="ml-2 h-5 w-5" />
        )}
      </Button>
    </>
  )
}
