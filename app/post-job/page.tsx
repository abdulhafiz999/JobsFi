"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useWeb3 } from "@/hooks/use-web3"
import { Briefcase, Upload, Wallet } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useJobs } from "@/contexts/job-context"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"

export default function PostJobPage() {
  const router = useRouter()
  const { isConnected, connectWallet, address } = useWeb3()
  const { addJob } = useJobs()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authRedirect, setAuthRedirect] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    ipfsHash: "",
    category: "Development", // Default category
  })

  // Check if user is authenticated
  useEffect(() => {
    if (!user && !authRedirect) {
      setAuthRedirect(true)
      alert("Please sign in to post a job")
      router.push("/login")
    }
  }, [user, router, authRedirect])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const uploadToIPFS = async () => {
    // Simulate IPFS upload
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return "Qm" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push("/login")
      return
    }

    if (!isConnected) {
      connectWallet()
      return
    }

    try {
      setIsSubmitting(true)

      // Validate form
      if (!formData.title || !formData.description || !formData.location || !formData.salary || !formData.company) {
        alert("Please fill in all required fields")
        setIsSubmitting(false)
        return
      }

      // Upload additional info to IPFS if needed
      let ipfsHash = formData.ipfsHash
      if (!ipfsHash) {
        ipfsHash = await uploadToIPFS()
      }

      // Add the job to our context
      addJob({
        title: formData.title,
        company: formData.company,
        location: formData.location,
        salary: formData.salary,
        description: formData.description,
        employer:
          address ||
          "0x" + Math.random().toString(36).substring(2, 10) + "..." + Math.random().toString(36).substring(2, 6),
        category: formData.category,
        ipfsHash,
      })

      // Call smart contract method (simulated)
      console.log("Posting job with data:", { ...formData, ipfsHash })

      // In a real app, you would call the contract here:
      // await contract.postJob(
      //   formData.title,
      //   formData.description,
      //   formData.location,
      //   parseFloat(formData.salary),
      //   ipfsHash
      // )

      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("Job posted successfully!")
      router.push("/jobs")
    } catch (error) {
      console.error("Error posting job:", error)
      alert("Error posting job. Please try again.")
      setIsSubmitting(false)
    }
  }

  const categories = [
    "Development",
    "Design",
    "Marketing",
    "Security",
    "Economics",
    "Management",
    "Research",
    "Community",
  ]

  // If not authenticated, don't render the form
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-6 text-3xl font-bold text-white">Sign In Required</h1>
          <p className="mb-8 text-gray-300">Please sign in to post a job</p>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-3xl font-bold text-white">Post a New Job</h1>

          {!isConnected ? (
            <div className="mb-6 rounded-lg bg-purple-900/30 p-6 text-center">
              <p className="mb-4 text-gray-300">Connect your wallet to post a job</p>
              <Button
                onClick={connectWallet}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            </div>
          ) : (
            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g. Senior Solidity Developer"
                      className="mt-1 bg-gray-700/50 border-gray-600"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="e.g. DeFi Protocol"
                      className="mt-1 bg-gray-700/50 border-gray-600"
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g. Remote, New York, etc."
                        className="mt-1 bg-gray-700/50 border-gray-600"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="salary">Salary Range (in USDC)</Label>
                      <Input
                        id="salary"
                        name="salary"
                        placeholder="e.g. 90,000 - 120,000"
                        className="mt-1 bg-gray-700/50 border-gray-600"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      className="mt-1 w-full rounded-md border border-gray-600 bg-gray-700/50 px-3 py-2 text-white"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the role, responsibilities, requirements, and benefits..."
                      className="mt-1 bg-gray-700/50 border-gray-600"
                      rows={10}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="ipfsHash">IPFS Hash (Optional)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="ipfsHash"
                        name="ipfsHash"
                        placeholder="e.g. QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco"
                        className="mt-1 bg-gray-700/50 border-gray-600"
                        value={formData.ipfsHash}
                        onChange={handleChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-1 border-purple-400 text-white hover:bg-purple-900/20"
                        onClick={async () => {
                          const hash = await uploadToIPFS()
                          setFormData((prev) => ({ ...prev, ipfsHash: hash }))
                        }}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Generate
                      </Button>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      Optional: Add an IPFS hash for additional job details or company information
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Post Job"}
                </Button>

                <p className="text-xs text-gray-400">
                  By posting a job, you agree to our{" "}
                  <Link href="/terms" className="text-purple-400 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-purple-400 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-purple-400" />
              <span className="text-lg font-bold text-white">Web3Jobs</span>
            </div>
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Web3Jobs. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/about" className="text-sm text-gray-400 hover:text-white">
                About
              </Link>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
