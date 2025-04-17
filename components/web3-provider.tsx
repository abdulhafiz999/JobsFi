"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"

interface Web3ContextType {
  isConnected: boolean
  address: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  contract: any
}

export const Web3Context = createContext<Web3ContextType>({
  isConnected: false,
  address: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  contract: null,
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [contract, setContract] = useState<any>(null)

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      // Check if MetaMask is installed
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          // Check if already connected
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            setIsConnected(true)
            setAddress(accounts[0])
            console.log("Wallet already connected:", accounts[0])
            // In a real app, you would initialize the contract here
          }
        } catch (error) {
          console.error("Error checking connection:", error)
        }
      } else {
        console.log("MetaMask not detected during initial check")
      }
    }

    checkConnection()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Accounts changed:", accounts)
        if (accounts.length === 0) {
          // User disconnected
          setIsConnected(false)
          setAddress(null)
        } else {
          // Account changed
          setIsConnected(true)
          setAddress(accounts[0])
        }
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [])

  const connectWallet = async () => {
    console.log("Attempting to connect wallet...")

    if (typeof window === "undefined") {
      console.error("Window is undefined - not in browser context")
      throw new Error("Cannot connect wallet outside of browser context")
    }

    if (!window.ethereum) {
      console.error("MetaMask not installed")
      throw new Error("MetaMask not installed. Please install MetaMask to connect your wallet.")
    }

    try {
      console.log("Requesting accounts...")
      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      console.log("Accounts received:", accounts)

      if (accounts.length > 0) {
        setIsConnected(true)
        setAddress(accounts[0])
        console.log("Wallet connected successfully:", accounts[0])

        // In a real app, you would initialize the contract here
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const signer = provider.getSigner()
        // const jobBoardContract = new ethers.Contract(contractAddress, contractABI, signer)
        // setContract(jobBoardContract)
      } else {
        console.error("No accounts returned after connection")
        throw new Error("No accounts returned. Please try again.")
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    }
  }

  const disconnectWallet = () => {
    // Clear the connection state
    setIsConnected(false)
    setAddress(null)
    setContract(null)
    console.log("Wallet disconnected")

    // Force MetaMask to require reconnection on next attempt
    if (typeof window !== "undefined" && window.ethereum) {
      console.log("Wallet disconnected. You'll need to reconnect.")
    }
  }

  return (
    <Web3Context.Provider
      value={{
        isConnected,
        address,
        connectWallet,
        disconnectWallet,
        contract,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}
