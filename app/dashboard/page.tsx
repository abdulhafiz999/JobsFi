"use client"

import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/hooks/use-web3"
import { Briefcase, Edit, Eye, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { ApplicationsModal } from "@/components/applications-modal"
import { useJobs } from "@/contexts/job-context"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDistanceToNow } from "date-fns"

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isConnected, connectWallet } = useWeb3()
  const { jobs, applications, deleteJob, getUserJobs, getUserApplications } = useJobs()
  const { user } = useAuth()
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [authRedirect, setAuthRedirect] = useState(false)
  const [activeTab, setActiveTab] = useState("posted-jobs")

  // Check URL parameters
  useEffect(() => {
    const view = searchParams.get("view")
    const jobId = searchParams.get("jobId")

    if (view === "applications" && jobId) {
      setSelectedJobId(Number.parseInt(jobId, 10))
      setIsModalOpen(true)
      setActiveTab("posted-jobs")
    }
  }, [searchParams])

  // Check if user is authenticated
  useEffect(() => {
    if (!user && !authRedirect) {
      setAuthRedirect(true)
      alert("Please sign in to access the dashboard")
      router.push("/login")
    }
  }, [user, router, authRedirect])

  // Get user's jobs and applications
  const userJobs = user ? getUserJobs(user.id) : []
  const userApplications = user ? getUserApplications(user.id) : []

  const handleDeleteJob = async (jobId: number) => {
    if (confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      try {
        // In a real app, you would call the contract here:
        // await contract.deleteJob(jobId)

        // Delete the job
        deleteJob(jobId)

        alert("Job deleted successfully!")
      } catch (error) {
        console.error("Error deleting job:", error)
        alert("Error deleting job. Please try again.")
      }
    }
  }

  const viewApplications = (jobId: number) => {
    setSelectedJobId(jobId)
    setIsModalOpen(true)
  }

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400">Accepted</span>
        )
      case "rejected":
        return <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs font-medium text-red-400">Rejected</span>
      default:
        return (
          <span className="rounded-full bg-yellow-500/20 px-2 py-1 text-xs font-medium text-yellow-400">Pending</span>
        )
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-6 text-3xl font-bold text-white">Sign In Required</h1>
          <p className="mb-8 text-gray-300">Please sign in to access your dashboard</p>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
        <Navbar />

        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-6 text-3xl font-bold text-white">Employer Dashboard</h1>
          <p className="mb-8 text-gray-300">Connect your wallet to access your dashboard</p>
          <Button
            onClick={connectWallet}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Connect Wallet
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-300">Manage your job postings and applications</p>
          </div>
          <Link href="/post-job">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              Post a New Job
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-800/50 border-gray-700">
            <TabsTrigger value="posted-jobs" className="data-[state=active]:bg-purple-900/50">
              Posted Jobs
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-purple-900/50">
              My Applications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posted-jobs" className="space-y-6">
            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-bold text-white">Your Posted Jobs</h2>

              {userJobs.length === 0 ? (
                <div className="rounded-lg bg-gray-700/50 p-8 text-center">
                  <p className="mb-4 text-gray-300">You haven't posted any jobs yet</p>
                  <Link href="/post-job">
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                      Post Your First Job
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="pb-3 text-left text-sm font-medium text-gray-400">Job Title</th>
                        <th className="pb-3 text-left text-sm font-medium text-gray-400">Posted On</th>
                        <th className="pb-3 text-left text-sm font-medium text-gray-400">Applications</th>
                        <th className="pb-3 text-left text-sm font-medium text-gray-400">Status</th>
                        <th className="pb-3 text-right text-sm font-medium text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userJobs.map((job) => {
                        const jobApplications = applications.filter((app) => app.jobId === job.id)
                        return (
                          <tr key={job.id} className="border-b border-gray-700">
                            <td className="py-4 text-white">
                              <Link href={`/jobs/${job.id}`} className="hover:text-purple-400">
                                {job.title}
                              </Link>
                            </td>
                            <td className="py-4 text-gray-300">{job.postedAt}</td>
                            <td className="py-4 text-gray-300">{jobApplications.length}</td>
                            <td className="py-4">
                              {job.isOpen ? (
                                <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400">
                                  Active
                                </span>
                              ) : (
                                <span className="rounded-full bg-gray-500/20 px-2 py-1 text-xs font-medium text-gray-400">
                                  Closed
                                </span>
                              )}
                            </td>
                            <td className="py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-purple-400 text-white hover:bg-purple-900/20"
                                  onClick={() => viewApplications(job.id)}
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only md:not-sr-only md:ml-2">Applications</span>
                                </Button>
                                <Link href={`/edit-job/${job.id}`}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-blue-400 text-white hover:bg-blue-900/20"
                                  >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                                  </Button>
                                </Link>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-400 text-white hover:bg-red-900/20"
                                  onClick={() => handleDeleteJob(job.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only md:not-sr-only md:ml-2">Delete</span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-bold text-white">Your Job Applications</h2>

              {userApplications.length === 0 ? (
                <div className="rounded-lg bg-gray-700/50 p-8 text-center">
                  <p className="mb-4 text-gray-300">You haven't applied to any jobs yet</p>
                  <Link href="/jobs">
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                      Browse Jobs
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="pb-3 text-left text-sm font-medium text-gray-400">Job Title</th>
                        <th className="pb-3 text-left text-sm font-medium text-gray-400">Company</th>
                        <th className="pb-3 text-left text-sm font-medium text-gray-400">Applied On</th>
                        <th className="pb-3 text-left text-sm font-medium text-gray-400">Status</th>
                        <th className="pb-3 text-right text-sm font-medium text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userApplications.map((application) => {
                        const job = jobs.find((j) => j.id === application.jobId)
                        if (!job) return null
                        return (
                          <tr key={application.id} className="border-b border-gray-700">
                            <td className="py-4 text-white">
                              <Link href={`/jobs/${job.id}`} className="hover:text-purple-400">
                                {job.title}
                              </Link>
                            </td>
                            <td className="py-4 text-gray-300">{job.company}</td>
                            <td className="py-4 text-gray-300">
                              {formatDistanceToNow(new Date(application.appliedAt), { addSuffix: true })}
                            </td>
                            <td className="py-4">{getStatusBadge(application.status)}</td>
                            <td className="py-4 text-right">
                              <Link href={`/jobs/${job.id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-purple-400 text-white hover:bg-purple-900/20"
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only md:not-sr-only md:ml-2">View Job</span>
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
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

      {isModalOpen && selectedJobId && (
        <ApplicationsModal jobId={selectedJobId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
