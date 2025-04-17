"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useWeb3 } from "@/hooks/use-web3"
import { Briefcase, Building2, Clock, DollarSign, FileUp, Globe, MapPin, Upload, Wallet } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useJobs } from "@/contexts/job-context"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"

export default function JobDetailsPage() {
  const params = useParams()
  const jobId = Number.parseInt(params.id as string, 10)
  const { isConnected, connectWallet, address } = useWeb3()
  const { jobs, applyToJob } = useJobs()
  const { user } = useAuth()

  // Find the job from our data
  const job = jobs.find((j) => j.id === jobId)

  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ipfsHash, setIpfsHash] = useState("")
  const [applicationSuccess, setApplicationSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const uploadToIPFS = async () => {
    // Simulate IPFS upload
    setIsSubmitting(true)

    // In a real app, you would upload to IPFS here
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockIpfsHash =
      "Qm" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setIpfsHash(mockIpfsHash)
    setIsSubmitting(false)
    return mockIpfsHash
  }

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert("Please sign in to apply for jobs")
      return
    }

    if (!isConnected) {
      connectWallet()
      return
    }

    if (!resumeFile) {
      alert("Please upload your resume")
      return
    }

    try {
      setIsSubmitting(true)

      // 1. Upload resume to IPFS
      const hash = await uploadToIPFS()

      // 2. Submit application
      applyToJob({
        jobId,
        applicant: address || "0x0000",
        applicantId: user.id,
        applicantName: user.name,
        resumeIpfs: hash,
        message,
      })

      // In a real app, you would call the contract here:
      // await contract.applyToJob(jobId, hash, message)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      setApplicationSuccess(true)
      setMessage("")
      setResumeFile(null)
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error applying to job:", error)
      alert("Error applying to job. Please try again.")
      setIsSubmitting(false)
    }
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-6 text-3xl font-bold text-white">Job Not Found</h1>
          <p className="mb-8 text-gray-300">The job you're looking for doesn't exist or has been removed.</p>
          <Link href="/jobs">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Browse Jobs
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
        <div className="mb-6">
          <Link href="/jobs" className="text-purple-400 hover:text-purple-300">
            ← Back to Jobs
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              <h1 className="mb-4 text-3xl font-bold text-white">{job.title}</h1>

              <div className="mb-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Building2 className="h-4 w-4 text-purple-400" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <DollarSign className="h-4 w-4 text-purple-400" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span>Posted on {job.postedAt}</span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-line text-gray-300">{job.description}</div>
              </div>
            </div>

            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-bold text-white">About the Employer</h2>
              <div className="flex items-center gap-2 text-gray-300">
                <Wallet className="h-4 w-4 text-purple-400" />
                <span className="font-mono">{job.employer}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-gray-300">
                <Globe className="h-4 w-4 text-purple-400" />
                <span>{job.company}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-8 rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-bold text-white">Apply for this Position</h2>

              {!job.isOpen ? (
                <div className="mb-6 rounded-lg bg-red-900/30 p-4 text-center">
                  <p className="text-gray-300">This job posting is no longer accepting applications.</p>
                </div>
              ) : applicationSuccess ? (
                <div className="mb-6 rounded-lg bg-green-900/30 p-4 text-center">
                  <p className="mb-4 text-gray-300">Your application has been submitted successfully!</p>
                  <Link href="/jobs">
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                      Browse More Jobs
                    </Button>
                  </Link>
                </div>
              ) : !user ? (
                <div className="mb-6 rounded-lg bg-purple-900/30 p-4 text-center">
                  <p className="mb-4 text-gray-300">Sign in to apply for this job</p>
                  <Link href="/login">
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                      Sign In
                    </Button>
                  </Link>
                </div>
              ) : !isConnected ? (
                <div className="mb-6 rounded-lg bg-purple-900/30 p-4 text-center">
                  <p className="mb-4 text-gray-300">Connect your wallet to apply for this job</p>
                  <Button
                    onClick={connectWallet}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <Label htmlFor="resume">Upload Resume (PDF)</Label>
                    <div className="mt-1">
                      <Label
                        htmlFor="resume-upload"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-600 bg-gray-700/50 px-4 py-2 text-gray-300 hover:bg-gray-700"
                      >
                        <Upload className="h-4 w-4" />
                        {resumeFile ? resumeFile.name : "Choose file"}
                      </Label>
                      <Input
                        id="resume-upload"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                    {ipfsHash && (
                      <p className="mt-2 text-xs text-gray-400">
                        IPFS Hash: {ipfsHash.substring(0, 10)}...{ipfsHash.substring(ipfsHash.length - 6)}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Cover Letter</Label>
                    <Textarea
                      id="message"
                      placeholder="Introduce yourself and explain why you're a good fit for this position..."
                      className="mt-1 bg-gray-700/50 border-gray-600"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <FileUp className="mr-2 h-4 w-4" />
                        Submit Application
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-400">
                    By applying, you agree to our{" "}
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
              )}
            </div>
          </div>
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
