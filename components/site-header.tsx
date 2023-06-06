import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              className={buttonVariants()}
            >
              Logout
              <Icons.logout className="ml-2 h-5 w-5" />
            </Button>
            <Button
              className={buttonVariants()}
            >
              Login
              <Icons.login className="ml-2 h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
