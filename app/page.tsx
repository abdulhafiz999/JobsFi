import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, Users, Wallet } from "lucide-react"
import Link from "next/link"
import { StatsCard } from "@/components/stats-card"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Connect, Apply, and Get Hired{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                The Web3 Way
              </span>
            </h1>
            <p className="mb-8 text-lg text-gray-300">
              The decentralized job board connecting Web3 talent with innovative projects and companies. Powered by
              blockchain technology for transparency and security.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/post-job">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-6 text-lg font-semibold text-white hover:from-purple-600 hover:to-blue-600 sm:w-auto">
                  Post a Job
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/jobs">
                <Button
                  variant="outline"
                  className="w-full border-purple-400 px-8 py-6 text-lg font-semibold text-white hover:bg-purple-900/20 sm:w-auto"
                >
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            <StatsCard
              icon={<Briefcase className="h-8 w-8 text-purple-400" />}
              title="Total Jobs Posted"
              value="1,234"
              description="Jobs posted on our platform"
            />
            <StatsCard
              icon={<Users className="h-8 w-8 text-blue-400" />}
              title="Applications Made"
              value="5,678"
              description="Successful applications submitted"
            />
            <StatsCard
              icon={<Wallet className="h-8 w-8 text-purple-400" />}
              title="Connected Wallets"
              value="2,345"
              description="Unique wallets connected"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">Why Choose Web3Jobs?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/70">
              <div className="mb-4 rounded-full bg-purple-500/20 p-3 w-fit">
                <Wallet className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Wallet Integration</h3>
              <p className="text-gray-300">
                Connect your wallet and manage your job postings or applications securely.
              </p>
            </div>
            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/70">
              <div className="mb-4 rounded-full bg-blue-500/20 p-3 w-fit">
                <Briefcase className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Smart Contract Powered</h3>
              <p className="text-gray-300">All job postings and applications are secured by blockchain technology.</p>
            </div>
            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/70">
              <div className="mb-4 rounded-full bg-purple-500/20 p-3 w-fit">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Decentralized Storage</h3>
              <p className="text-gray-300">
                Resumes and job details are stored on IPFS for permanent, decentralized access.
              </p>
            </div>
          </div>
        </section>
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
