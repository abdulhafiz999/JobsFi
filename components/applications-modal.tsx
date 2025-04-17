"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, Download, ExternalLink, X } from "lucide-react"
import { useState } from "react"
import { useJobs } from "@/contexts/job-context"
import { formatDistanceToNow } from "date-fns"

interface ApplicationsModalProps {
  jobId: number
  isOpen: boolean
  onClose: () => void
}

export function ApplicationsModal({ jobId, isOpen, onClose }: ApplicationsModalProps) {
  const { getJobApplications, updateApplicationStatus } = useJobs()
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null)

  // Get applications for the selected job
  const applications = getJobApplications(jobId)

  // Get the selected application details
  const application = selectedApplication !== null ? applications.find((app) => app.id === selectedApplication) : null

  const handleStatusUpdate = (applicationId: number, status: "accepted" | "rejected") => {
    updateApplicationStatus(applicationId, status)
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

  const handleDownloadResume = (ipfsHash: string) => {
    // In a real app, this would fetch from IPFS
    // For demo purposes, we'll create a dummy PDF file
    const dummyPdfBlob = new Blob(["%PDF-1.5 dummy resume content"], { type: "application/pdf" })
    const url = URL.createObjectURL(dummyPdfBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = `resume-${ipfsHash.substring(0, 8)}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-gray-900 text-white">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle>Applications</DialogTitle>
            <DialogDescription className="text-gray-400">View applications for this job posting</DialogDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400">Applicants ({applications.length})</h3>
            <div className="max-h-[400px] space-y-2 overflow-y-auto pr-2">
              {applications.length === 0 ? (
                <div className="rounded-lg bg-gray-800/50 p-4 text-center text-sm text-gray-400">
                  No applications yet
                </div>
              ) : (
                applications.map((app) => (
                  <div
                    key={app.id}
                    className={`cursor-pointer rounded-lg p-3 transition-colors ${
                      selectedApplication === app.id ? "bg-purple-900/50" : "bg-gray-800/50 hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedApplication(app.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{app.applicantName}</span>
                      <div className="flex items-center gap-2">{getStatusBadge(app.status)}</div>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-400">{app.applicant}</span>
                      <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-lg bg-gray-800/50 p-4">
            {application ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Applicant</h3>
                  <p className="font-medium">{application.applicantName}</p>
                  <p className="font-mono text-sm">{application.applicant}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400">Status</h3>
                  <div className="mt-1">{getStatusBadge(application.status)}</div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400">Resume</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-400 text-white hover:bg-purple-900/20"
                      onClick={() => handleDownloadResume(application.resumeIpfs)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-400 text-white hover:bg-purple-900/20">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on IPFS
                    </Button>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    IPFS Hash: {application.resumeIpfs.substring(0, 10)}...
                    {application.resumeIpfs.substring(application.resumeIpfs.length - 6)}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400">Cover Letter</h3>
                  <p className="mt-1 whitespace-pre-line rounded-lg bg-gray-700/50 p-3 text-gray-300">
                    {application.message}
                  </p>
                </div>

                {application.status === "pending" && (
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      className="border-red-400 text-white hover:bg-red-900/20"
                      onClick={() => handleStatusUpdate(application.id, "rejected")}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      onClick={() => handleStatusUpdate(application.id, "accepted")}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Accept
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                Select an applicant to view details
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
