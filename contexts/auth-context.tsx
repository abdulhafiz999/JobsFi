"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Define user type
export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

// Define auth context type
interface AuthContextType {
  user: User | null
  isLoading: boolean
  signUp: (email: string, password: string, name: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: () => {},
})

// Create provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("web3jobs_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Sign up function
  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would call an API here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem("web3jobs_users") || "[]")
      const existingUser = users.find((u: any) => u.email === email)

      if (existingUser) {
        throw new Error("User with this email already exists")
      }

      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        email,
        name,
        createdAt: new Date().toISOString(),
      }

      // Store user in localStorage (in a real app, this would be in a database)
      users.push({ ...newUser, password })
      localStorage.setItem("web3jobs_users", JSON.stringify(users))

      // Set current user
      setUser(newUser)
      localStorage.setItem("web3jobs_user", JSON.stringify(newUser))

      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would call an API here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user exists
      const users = JSON.parse(localStorage.getItem("web3jobs_users") || "[]")
      const user = users.find((u: any) => u.email === email && u.password === password)

      if (!user) {
        throw new Error("Invalid email or password")
      }

      // Set current user (without password)
      const { password: _, ...userWithoutPassword } = user
      setUser(userWithoutPassword)
      localStorage.setItem("web3jobs_user", JSON.stringify(userWithoutPassword))

      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Sign out function
  const signOut = () => {
    setUser(null)
    localStorage.removeItem("web3jobs_user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut }}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
