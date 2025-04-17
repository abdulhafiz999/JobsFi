import type { ReactNode } from "react"

interface StatsCardProps {
  icon: ReactNode
  title: string
  value: string
  description: string
}

export function StatsCard({ icon, title, value, description }: StatsCardProps) {
  return (
    <div className="rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/70">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-purple-900/30 p-3">{icon}</div>
        <div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <div className="mt-4 text-3xl font-bold text-white">{value}</div>
    </div>
  )
}
