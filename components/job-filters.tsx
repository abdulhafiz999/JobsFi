"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react"

// Define the filter criteria type
export type FilterCriteria = {
  searchTerm: string
  categories: string[]
  locations: string[]
  salaryRange: number[]
}

interface JobFiltersProps {
  onFilterChange: (filters: FilterCriteria) => void
}

export function JobFilters({ onFilterChange = () => {} }: JobFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [salaryRange, setSalaryRange] = useState([50, 150])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [isInitialRender, setIsInitialRender] = useState(true)

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

  const locations = [
    "Remote",
    "New York, USA",
    "San Francisco, USA",
    "London, UK",
    "Berlin, Germany",
    "Singapore",
    "Tokyo, Japan",
  ]

  // Handle category checkbox changes
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  // Handle location checkbox changes
  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, location])
    } else {
      setSelectedLocations(selectedLocations.filter((l) => l !== location))
    }
  }

  // Apply filters when button is clicked
  const applyFilters = () => {
    const filters: FilterCriteria = {
      searchTerm,
      categories: selectedCategories,
      locations: selectedLocations,
      salaryRange,
    }
    onFilterChange(filters)

    // For demonstration purposes, show what's being filtered
    console.log("Applying filters:", filters)
    alert(
      `Filters applied!\n\nSearch: ${searchTerm}\nCategories: ${selectedCategories.join(", ") || "Any"}\nLocations: ${selectedLocations.join(", ") || "Any"}\nSalary: ${salaryRange[0]}K - ${salaryRange[1]}K`,
    )
  }

  // Apply initial filters on first render
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
      return
    }

    // This would apply filters automatically when any filter changes
    // Uncomment if you want filters to apply automatically without clicking the button
    // const filters: FilterCriteria = {
    //   searchTerm,
    //   categories: selectedCategories,
    //   locations: selectedLocations,
    //   salaryRange
    // }
    // onFilterChange(filters)
  }, [searchTerm, selectedCategories, selectedLocations, salaryRange, isInitialRender, onFilterChange])

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search jobs..."
          className="mt-1 bg-gray-700/50 border-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <Label>Categories</Label>
        <div className="mt-2 space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category}`}
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                checked={selectedCategories.includes(category)}
                onChange={(e) => handleCategoryChange(category, e.target.checked)}
              />
              <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-300">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Locations</Label>
        <div className="mt-2 space-y-2">
          {locations.map((location) => (
            <div key={location} className="flex items-center">
              <input
                type="checkbox"
                id={`location-${location}`}
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                checked={selectedLocations.includes(location)}
                onChange={(e) => handleLocationChange(location, e.target.checked)}
              />
              <label htmlFor={`location-${location}`} className="ml-2 text-sm text-gray-300">
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between">
          <Label>Salary Range (in USDC)</Label>
          <span className="text-sm text-gray-300">
            {salaryRange[0]}K - {salaryRange[1]}K
          </span>
        </div>
        <Slider
          defaultValue={salaryRange}
          min={0}
          max={300}
          step={10}
          onValueChange={(value) => setSalaryRange(value as number[])}
          className="mt-2"
        />
      </div>

      <Button
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        onClick={applyFilters}
      >
        Apply Filters
      </Button>
    </div>
  )
}
