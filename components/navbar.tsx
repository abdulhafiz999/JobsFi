"use client"

import { Button } from "@/components/ui/button"
import { Briefcase, Menu } from "lucide-react"
import Link from "next/link"
import { WalletConnect } from "@/components/wallet-connect"
import { AuthStatus } from "@/components/auth-status"
import { NotificationBell } from "@/components/notification-bell"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const { user } = useAuth()

  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-purple-400" />
          <span className="text-xl font-bold text-white">Web3Jobs</span>
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/jobs">
            <Button variant="ghost" className="text-white hover:text-purple-300">
              Browse Jobs
            </Button>
          </Link>
          <Link href="/post-job">
            <Button variant="ghost" className="text-white hover:text-purple-300">
              Post a Job
            </Button>
          </Link>
          <WalletConnect />
          {user && <NotificationBell />}
          <AuthStatus />
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-purple-400 text-white hover:bg-purple-900/20">
                <Menu className="h-5 w-5 text-purple-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700 text-white">
              <DropdownMenuItem asChild>
                <Link href="/jobs" className="w-full cursor-pointer">
                  Browse Jobs
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/post-job" className="w-full cursor-pointer">
                  Post a Job
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <div className="p-2">
                <WalletConnect />
              </div>
              {user && (
                <>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <div className="p-2">
                    <NotificationBell />
                  </div>
                </>
              )}
              <DropdownMenuSeparator className="bg-gray-700" />
              <div className="p-2">
                <AuthStatus />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}
