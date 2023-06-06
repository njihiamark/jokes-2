"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useAuthStore from "@/stores/auth"

export function LoginRedirect() {
  const router = useRouter()
  const { accessToken } = useAuthStore()

  useEffect(() => {
    if (accessToken) {
      router.replace("/jokes")
    }
  }, [accessToken, router])
  return null
}
