import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { LoginButton } from "./login-button"

export function LoginRequired() {
  return (
    <Card className="w-full sm:w-2/5">
      <CardHeader>
        <CardTitle>Login required</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center">
          <p>You need to be logged in to view this page</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <LoginButton />
      </CardFooter>
    </Card>
  )
}
