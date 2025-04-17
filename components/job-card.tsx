import { Button } from "@/components/ui/button"
import { Building2, DollarSign, MapPin } from "lucide-react"
import Link from "next/link"

interface JobCardProps {
  job: {
    id: number
    title: string
    company: string
    location: string
    salary: string
    description: string
    employer: string
    category: string
    isOpen: boolean
  }
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/70">
      <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-xl font-bold text-white">
            <Link href={`/jobs/${job.id}`} className="hover:text-purple-400">
              {job.title}
            </Link>
          </h2>
          <div className="mt-2 flex flex-wrap gap-4">
            <div className="flex items-center gap-1 text-sm text-gray-300">
              <Building2 className="h-4 w-4 text-purple-400" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-300">
              <MapPin className="h-4 w-4 text-purple-400" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-300">
              <DollarSign className="h-4 w-4 text-purple-400" />
              <span>{job.salary}</span>
            </div>
          </div>
        </div>
        <Link href={`/jobs/${job.id}`}>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
            Apply Now
          </Button>
        </Link>
      </div>
      <p className="line-clamp-2 text-gray-300">{job.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-400">
          {job.category}
        </div>
        <div className="text-xs text-gray-400">
          Employer:{" "}
          <span className="font-mono">
            {job.employer.substring(0, 6)}...{job.employer.substring(job.employer.length - 4)}
          </span>
        </div>
      </div>
    </div>
  )
}
