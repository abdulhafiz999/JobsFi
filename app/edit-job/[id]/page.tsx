"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useWeb3 } from "@/hooks/use-web3"
import { Briefcase, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useJobs } from "@/contexts/job-context"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"

export default function EditJobPage() {
  const params = useParams()
  const jobId = Number.parseInt(params.id as string, 10)
  const router = useRouter()
  const { isConnected, connectWallet } = useWeb3()
  const { jobs, updateJob } = useJobs()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Find the job
  const job = jobs.find((j) => j.id === jobId)

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    category: "",
  })

  // Load job data when component mounts
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        description: job.description,
        category: job.category,
      })
    }
  }, [job])

  // Check if user is authorized to edit this job
  useEffect(() => {
    if (job && user && job.createdBy !== user.id) {
      setError("You are not authorized to edit this job")
    }
  }, [job, user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
      setError(null)

      // Validate form
      if (!formData.title || !formData.description || !formData.location || !formData.salary || !formData.company) {
        setError("Please fill in all required fields")
        setIsSubmitting(false)
        return
      }

      // Update the job
      updateJob(jobId, {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        salary: formData.salary,
        description: formData.description,
        category: formData.category,
      })

      // In a real app, you would call the contract here:
      // await contract.updateJob(jobId, formData.title, formData.description, ...)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("Job updated successfully!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error updating job:", error)
      setError("Error updating job. Please try again.")
    } finally {
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

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-6 text-3xl font-bold text-white">Job Not Found</h1>
          <p className="mb-8 text-gray-300">The job you're trying to edit doesn't exist or has been removed.</p>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Back to Dashboard
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
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Edit Job</h1>
            <Link href="/dashboard">
              <Button variant="outline" className="border-purple-400 text-white hover:bg-purple-900/20">
                Cancel
              </Button>
            </Link>
          </div>

          {error && error === "You are not authorized to edit this job" ? (
            <div className="rounded-xl bg-red-900/30 p-6 text-center backdrop-blur-sm">
              <p className="mb-4 text-white">{error}</p>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  Back to Dashboard
                </Button>
              </Link>
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
                </div>

                {error && error !== "You are not authorized to edit this job" && (
                  <div className="rounded-md bg-red-900/30 p-3 text-sm text-red-200">{error}</div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Job"
                  )}
                </Button>
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
          </div>
        </div>
      </footer>
    </div>
  )
}
