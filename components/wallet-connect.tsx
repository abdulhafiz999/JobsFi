"use client"

import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/hooks/use-web3"
import { AlertCircle, Check, ChevronRight, Shield, Wallet, X } from "lucide-react"
import { useState, useEffect } from "react"

export function WalletConnect() {
  const { isConnected, connectWallet, disconnectWallet, address } = useWeb3()
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [showMetaMaskSimulation, setShowMetaMaskSimulation] = useState(false)
  const [simulationStep, setSimulationStep] = useState(0)

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Simulate MetaMask connection flow
  useEffect(() => {
    if (showMetaMaskSimulation) {
      // Step 1: Show the popup
      const step1Timer = setTimeout(() => {
        setSimulationStep(1)
      }, 500)

      // Step 2: Show connecting
      const step2Timer = setTimeout(() => {
        setSimulationStep(2)
      }, 2000)

      // Step 3: Show connected
      const step3Timer = setTimeout(() => {
        setSimulationStep(3)
      }, 3500)

      // Step 4: Close popup and update state
      const step4Timer = setTimeout(() => {
        setShowMetaMaskSimulation(false)
        setIsConnecting(false)
        // Simulate successful connection
        connectWallet().catch((error) => {
          console.error("Error in simulated connection:", error)
        })
      }, 4500)

      return () => {
        clearTimeout(step1Timer)
        clearTimeout(step2Timer)
        clearTimeout(step3Timer)
        clearTimeout(step4Timer)
      }
    }
  }, [showMetaMaskSimulation, connectWallet])

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true)
      setConnectionError(null)

      // Check if we're in a browser environment
      if (typeof window === "undefined") {
        setConnectionError("Not in browser environment")
        setIsConnecting(false)
        return
      }

      // Check if MetaMask is installed
      if (!window.ethereum) {
        // In preview environment, show simulation instead
        setShowMetaMaskSimulation(true)
        return
      }

      // If MetaMask is available, try to connect
      await connectWallet()
    } catch (error) {
      console.error("Error connecting wallet:", error)
      setConnectionError(error instanceof Error ? error.message : "Unknown error connecting wallet")
      setIsConnecting(false)
    }
  }

  return (
    <div className="relative">
      {isConnected ? (
        <Button
          variant="outline"
          className="border-purple-400 text-white hover:bg-purple-900/20"
          onClick={disconnectWallet}
        >
          <Wallet className="mr-2 h-4 w-4 text-purple-400" />
          {address && formatAddress(address)}
          <span className="ml-2 border-l border-gray-600 pl-2 text-xs text-red-400">Disconnect</span>
        </Button>
      ) : (
        <Button
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          onClick={handleConnectWallet}
          disabled={isConnecting}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isConnecting && !showMetaMaskSimulation ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}

      {connectionError && (
        <div className="absolute right-0 mt-2 w-64 rounded-md bg-red-900/80 p-2 text-xs text-white">
          {connectionError}
          <div className="mt-1 text-xs">
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline"
            >
              Install MetaMask
            </a>
          </div>
        </div>
      )}

      {/* MetaMask Popup Simulation */}
      {showMetaMaskSimulation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-0 shadow-lg">
            {/* MetaMask Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#F6851B] p-4">
              <div className="flex items-center">
                <div className="mr-2 h-8 w-8 rounded-full bg-white p-1">
                  <svg viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M32.9582 1L19.8241 10.7183L22.2665 5.09082L32.9582 1Z"
                      fill="#E17726"
                      stroke="#E17726"
                      strokeWidth="0.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.04183 1L15.0603 10.809L12.7336 5.09082L2.04183 1Z"
                      fill="#E27625"
                      stroke="#E27625"
                      strokeWidth="0.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M28.2292 23.5334L24.7545 28.8875L32.2655 30.9501L34.4071 23.6499L28.2292 23.5334Z"
                      fill="#E27625"
                      stroke="#E27625"
                      strokeWidth="0.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0.601562 23.6499L2.73268 30.9501L10.2436 28.8875L6.77894 23.5334L0.601562 23.6499Z"
                      fill="#E27625"
                      stroke="#E27625"
                      strokeWidth="0.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.86694 14.6421L7.77695 17.8003L15.2147 18.1323L14.9767 10.1245L9.86694 14.6421Z"
                      fill="#E27625"
                      stroke="#E27625"
                      strokeWidth="0.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M25.1331 14.6421L19.9423 10.0339L19.8241 18.1323L27.2618 17.8003L25.1331 14.6421Z"
                      fill="#E27625"
                      stroke="#E27625"
                      strokeWidth="0.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.2437 28.8875L14.7372 26.7151L10.8458 23.6978L10.2437 28.8875Z"
                      fill="#E27625"
                      stroke="#E27625"
                      strokeWidth="0.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.2627 26.7151L24.7545 28.8875L24.1541 23.6978L20.2627 26.7151Z"
                      fill="#E27625"
                      stroke="#E27625"
                      strokeWidth="0.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-lg font-bold text-white">MetaMask</span>
              </div>
              <button
                className="rounded-full bg-white/20 p-1 text-white hover:bg-white/30"
                onClick={() => {
                  setShowMetaMaskSimulation(false)
                  setIsConnecting(false)
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* MetaMask Content */}
            <div className="p-6">
              <h3 className="mb-4 text-center text-xl font-bold text-gray-800">Connect With MetaMask</h3>

              {simulationStep === 0 && (
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <AlertCircle className="h-16 w-16 text-[#F6851B]" />
                  </div>
                  <p className="mb-4 text-gray-600">This website is requesting access to view your current account</p>
                  <div className="mb-4 rounded-lg bg-gray-100 p-3">
                    <div className="flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-gray-500" />
                      <span className="text-sm text-gray-700">web3jobs.io</span>
                    </div>
                  </div>
                </div>
              )}

              {simulationStep === 1 && (
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-[#F6851B]"></div>
                  </div>
                  <p className="text-gray-600">Connecting to MetaMask...</p>
                </div>
              )}

              {simulationStep === 2 && (
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <Check className="h-16 w-16 text-green-500" />
                  </div>
                  <p className="text-gray-600">Successfully connected!</p>
                  <p className="mt-2 font-mono text-sm text-gray-500">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
                </div>
              )}

              {simulationStep === 3 && (
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <Check className="h-16 w-16 text-green-500" />
                  </div>
                  <p className="text-gray-600">Returning to application...</p>
                </div>
              )}

              {simulationStep < 2 && (
                <div className="mt-6 flex justify-between">
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setShowMetaMaskSimulation(false)
                      setIsConnecting(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-[#F6851B] text-white hover:bg-[#E17726]"
                    onClick={() => setSimulationStep(simulationStep + 1)}
                  >
                    Connect
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Simulation Notice */}
            <div className="rounded-b-lg bg-blue-100 p-2 text-center text-xs text-blue-800">
              This is a simulation of the MetaMask popup for demonstration purposes.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
