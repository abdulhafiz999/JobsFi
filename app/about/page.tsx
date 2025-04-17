import { Button } from "@/components/ui/button"
import { Briefcase, Code, Globe, Shield, Users, Wallet } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-white">About Web3Jobs</h1>

          {/* Mission Section */}
          <div className="mb-16 rounded-xl bg-gray-800/50 p-8 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-bold text-white">Our Mission</h2>
            <p className="mb-6 text-lg text-gray-300">
              Web3Jobs is on a mission to bridge the gap between talented professionals and innovative blockchain
              projects. We believe in the transformative power of decentralized technologies and aim to accelerate the
              adoption of Web3 by connecting the right people with the right opportunities.
            </p>
            <p className="text-lg text-gray-300">
              Founded in 2023, our platform leverages blockchain technology to create a transparent, secure, and
              efficient job marketplace specifically designed for the Web3 ecosystem.
            </p>
          </div>

          {/* Features Section */}
          <h2 className="mb-6 text-center text-2xl font-bold text-white">What Makes Us Different</h2>
          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-purple-500/20 p-3 w-fit">
                <Wallet className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Wallet Integration</h3>
              <p className="text-gray-300">
                Connect your Web3 wallet seamlessly to apply for jobs or post opportunities with a single click.
              </p>
            </div>

            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-blue-500/20 p-3 w-fit">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Blockchain Security</h3>
              <p className="text-gray-300">
                All job postings and applications are secured by smart contracts, ensuring transparency and trust.
              </p>
            </div>

            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-purple-500/20 p-3 w-fit">
                <Globe className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Decentralized Storage</h3>
              <p className="text-gray-300">
                Resumes and job details are stored on IPFS, providing permanent and censorship-resistant access.
              </p>
            </div>

            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-blue-500/20 p-3 w-fit">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Community-Driven</h3>
              <p className="text-gray-300">
                Our platform is built by and for the Web3 community, with features designed specifically for blockchain
                professionals.
              </p>
            </div>

            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-purple-500/20 p-3 w-fit">
                <Code className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Smart Notifications</h3>
              <p className="text-gray-300">
                Receive real-time updates on your applications and job postings through our integrated notification
                system.
              </p>
            </div>

            <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-blue-500/20 p-3 w-fit">
                <Briefcase className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Web3-Native</h3>
              <p className="text-gray-300">
                From crypto payments to on-chain verification, our platform is built from the ground up for the
                decentralized economy.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16 rounded-xl bg-gray-800/50 p-8 backdrop-blur-sm">
            <h2 className="mb-6 text-center text-2xl font-bold text-white">Our Team</h2>
            <p className="mb-8 text-center text-lg text-gray-300">
              We're a team of blockchain enthusiasts, developers, and industry veterans passionate about building the
              future of work in the decentralized economy.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-purple-900/50">
                  <div className="flex h-full items-center justify-center text-4xl font-bold text-purple-400">AJ</div>
                </div>
                <h3 className="text-xl font-bold text-white">Abdul Razak Kamil Nyaba</h3>
                <p className="text-purple-400">Founder & CEO</p>
                <p className="mt-2 text-gray-300">Full Stack Developer</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-blue-900/50">
                  <div className="flex h-full items-center justify-center text-4xl font-bold text-blue-400">SW</div>
                </div>
                <h3 className="text-xl font-bold text-white">Abdul Razak Abdul Hafiz</h3>
                <p className="text-purple-400">CTO</p>
                <p className="mt-2 text-gray-300">Smart contract Developer</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-blue-900/50">
                  <div className="flex h-full items-center justify-center text-4xl font-bold text-blue-400">AA</div>
                </div>
                <h3 className="text-xl font-bold text-white">Ibrahim Shahida</h3>
                 <p className="mt-2 text-gray-300">PRO</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-purple-900/50">
                  <div className="flex h-full items-center justify-center text-4xl font-bold text-purple-400">MR</div>
                </div>
                <h3 className="text-xl font-bold text-white">Mohammed Nabhan</h3>
              
                <p className="mt-2 text-gray-300">Marketing Strategist</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="rounded-xl bg-gradient-to-r from-purple-900/70 to-blue-900/70 p-8 text-center backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-bold text-white">Join the Web3 Revolution</h2>
            <p className="mb-6 text-lg text-gray-200">
              Whether you're looking for your next role in blockchain or searching for top talent to build your project,
              Web3Jobs is here to help you succeed.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/jobs">
                <Button className="w-full bg-white text-purple-900 hover:bg-gray-200 sm:w-auto">Browse Jobs</Button>
              </Link>
              <Link href="/post-job">
                <Button className="w-full bg-transparent border border-white text-white hover:bg-white/10 sm:w-auto">
                  Post a Job
                </Button>
              </Link>
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
              <Link href="/about" className="text-sm text-purple-400 hover:text-white">
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
